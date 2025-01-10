import { ReactNode, useMemo } from 'react'
import InfoGroup from '@components/InfoGroup'
import { TableRow } from '@components/CustomTable'
import { IUser } from '@type/models'
import { addUser, deleteUser, editUser } from '@services/user'
import { useMutation, UseMutationResult, useQueryClient, InfiniteData } from '@tanstack/react-query'
import { IApiResponse } from '@type/apiResponse'
import { useFilterStore } from '@hooks'

interface TransformedUser extends Pick<IUser, 'id' | 'role'>, TableRow {
  name: ReactNode
  createdDate: string
}

interface UseUserReturn {
  superAdmin: IUser[]
  admin: IUser[]
  employee: IUser[]
  transformedUsers: TransformedUser[]
  transformAllUsers: TableRow[]
  addUserMutation: UseMutationResult<IApiResponse<IUser>, Error, IUser>
  editUserMutation: UseMutationResult<IApiResponse<IUser>, Error, IUser>
  deleteUserMutation: UseMutationResult<IApiResponse<IUser>, Error, IUser>
}

interface UserQueryData {
  data: IUser[]
  page: number
  limit: number
}

interface AllUsersQueryData {
  data: IUser[]
}

const useUser = (usersData: IUser[], allUsers: IUser[], currentPage: number): UseUserReturn => {
  const queryClient = useQueryClient()
  const { searchQuery, sortBy, itemsPerPage } = useFilterStore()

  const transformedUsers = useMemo(() => {
    if (!usersData) return []
    return usersData.map((user) => ({
      id: user.id,
      name: <InfoGroup heading={`${user.firstName} ${user.lastName}`} description={user.email} size='sm' />,
      role: user.role,
      createdDate: user.createdDate.toString().split('T')[0]
    }))
  }, [usersData])

  const transformAllUsers = useMemo((): TableRow[] => {
    if (!usersData) return []
    return usersData.map((user) => ({
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      phone: user.phone,
      username: user.username,
      password: user.password,
      role: user.role,
      createdDate: user.createdDate.toString().split('T')[0]
    }))
  }, [usersData])

  const { superAdmin, admin, employee } = useMemo(() => {
    const superAdminUsers = allUsers?.filter((user) => user.role === 'Super Admin') || []
    const adminUsers = allUsers?.filter((user) => user.role === 'Admin') || []
    const employeeUsers = allUsers?.filter((user) => user.role === 'Employee') || []
    return { superAdmin: superAdminUsers, admin: adminUsers, employee: employeeUsers }
  }, [allUsers])

  const updateAllUsersCache = (queryKey: (string | number)[], updateFn: (users: IUser[]) => IUser[]) => {
    const existingData = queryClient.getQueryData<AllUsersQueryData>(queryKey)

    if (!existingData) {
      queryClient.invalidateQueries({ queryKey })
      return
    }

    queryClient.setQueryData<AllUsersQueryData>(queryKey, (oldData) => {
      if (!oldData) return existingData

      const newData = updateFn(oldData.data)

      return {
        data: newData
      }
    })
  }

  const updateInfiniteUsersCache = (
    queryKey: (string | number)[],
    updateFn: (page: UserQueryData) => UserQueryData
  ) => {
    const existingData = queryClient.getQueryData<InfiniteData<UserQueryData>>(queryKey)

    if (!existingData || existingData.pages[currentPage].data.length <= 1) {
      queryClient.invalidateQueries({ queryKey })
      return
    }

    queryClient.setQueryData<InfiniteData<UserQueryData>>(queryKey, (oldData) => {
      if (!oldData) return existingData

      return {
        ...oldData,
        pages: oldData.pages.map((page, index) => (index === currentPage ? updateFn(page) : page))
      }
    })
  }

  const addUserMutation = useMutation<IApiResponse<IUser>, Error, IUser>({
    mutationFn: addUser,
    onSuccess: (response) => {
      if (!response.data) {
        queryClient.invalidateQueries({ queryKey: ['users', itemsPerPage, searchQuery, sortBy] })
        queryClient.invalidateQueries({ queryKey: ['allUsers', searchQuery] })
        return
      }

      updateInfiniteUsersCache(['users', itemsPerPage, searchQuery, sortBy], (page) => ({
        ...page,
        data: [response.data!, ...page.data]
      }))
      updateAllUsersCache(['allUsers', searchQuery], (data) => [response.data!, ...data])
    }
  })

  const editUserMutation = useMutation<IApiResponse<IUser>, Error, IUser>({
    mutationFn: editUser,
    onSuccess: (response) => {
      if (!response.data) {
        queryClient.invalidateQueries({ queryKey: ['users', itemsPerPage, searchQuery, sortBy] })
        queryClient.invalidateQueries({ queryKey: ['allUsers', searchQuery] })
        return
      }

      updateInfiniteUsersCache(['users', itemsPerPage, searchQuery, sortBy], (page) => ({
        ...page,
        data: page.data.map((user) => (user.id === response.data?.id ? response.data : user))
      }))
      updateAllUsersCache(['allUsers', searchQuery], (data) =>
        data.map((user) => (user.id === response.data?.id ? response.data : user))
      )
    }
  })

  const deleteUserMutation = useMutation<IApiResponse<IUser>, Error, IUser>({
    mutationFn: (variables: IUser) => deleteUser(variables.id),
    onSuccess: (response) => {
      if (!response.data) {
        queryClient.invalidateQueries({ queryKey: ['users', itemsPerPage, searchQuery, sortBy] })
        queryClient.invalidateQueries({ queryKey: ['allUsers', searchQuery] })
        return
      }

      updateInfiniteUsersCache(['users', itemsPerPage, searchQuery, sortBy], (page) => ({
        ...page,
        data: page.data.filter((user) => user.id !== response.data?.id)
      }))
      updateAllUsersCache(['allUsers', searchQuery], (data) => data.filter((user) => user.id !== response.data?.id))
    }
  })

  return {
    superAdmin,
    admin,
    employee,
    transformedUsers,
    transformAllUsers,
    addUserMutation,
    editUserMutation,
    deleteUserMutation
  }
}

export default useUser
