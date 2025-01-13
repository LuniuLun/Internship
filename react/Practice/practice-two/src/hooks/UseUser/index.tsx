import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  InfiniteData,
  UseMutationResult,
  useQueryClient
} from '@tanstack/react-query'
import { useMemo } from 'react'
import { addUser, deleteUser, editUser, fetchUsers, fetchAllUsers } from '@services/user'
import { IUser } from '@type/models'
import { IApiResponse } from '@type/apiResponse'
import { filterStore } from '@stores'
import { TableRow } from '@components/CustomTable'
import { InfoGroup } from '@components'

interface TransformedUser extends Pick<IUser, 'id' | 'role'>, TableRow {
  name: React.ReactNode
  createdDate: string
}

interface UserQueryData {
  data: IUser[]
  page: number
  limit: number
}

interface AllUsersQueryData {
  data: IUser[]
}

interface UseUserReturn {
  superAdmin: IUser[] | undefined
  admin: IUser[] | undefined
  employee: IUser[] | undefined
  transformedUsers: TransformedUser[] | undefined
  transformAllUsers: IUser[] | undefined
  addUserMutation: UseMutationResult<IApiResponse<IUser>, Error, IUser>
  editUserMutation: UseMutationResult<IApiResponse<IUser>, Error, IUser>
  deleteUserMutation: UseMutationResult<IApiResponse<IUser>, Error, IUser>
  usersQuery: ReturnType<typeof useInfiniteQuery>
  allUsersQuery: ReturnType<typeof useQuery>
  lengthAllUsers: number
}

const useUser = (): UseUserReturn => {
  const { searchQuery, sortBy, itemsPerPage } = filterStore()
  const queryClient = useQueryClient()

  const usersQuery = useInfiniteQuery({
    queryKey: ['users', itemsPerPage, searchQuery, sortBy],
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchUsers({
        page: pageParam.toString(),
        limit: itemsPerPage.toString(),
        property: 'firstName',
        value: searchQuery,
        sortBy,
        order: 'asc'
      })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage.data || lastPage.data.length === 0) return undefined
      return lastPageParam + 1
    },

    refetchOnWindowFocus: false
  })

  const allUsersQuery = useQuery({
    queryKey: ['allUsers', searchQuery],
    queryFn: () => fetchAllUsers('firstName', searchQuery),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  })

  const lengthAllUsers = useMemo(() => {
    return allUsersQuery?.data?.data?.length || 0
  }, [allUsersQuery.data])

  const updateInfiniteUsersCache = (
    queryKey: (string | number)[],
    updateFn: (page: UserQueryData) => UserQueryData
  ) => {
    const existingData = queryClient.getQueryData<InfiniteData<UserQueryData>>(queryKey)
    if (!existingData) {
      queryClient.invalidateQueries({ queryKey })
      return
    }

    queryClient.setQueryData<InfiniteData<UserQueryData>>(queryKey, (oldData) => {
      if (!oldData) return existingData

      const updatedPages = oldData.pages.map((page) => ({
        ...page,
        data: updateFn(page).data
      }))

      return {
        ...oldData,
        pages: updatedPages,
        pageParams: oldData.pageParams
      }
    })
  }

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

  const transformedUsers = useMemo(() => {
    if (!usersQuery.data) return []

    return usersQuery.data.pages
      .flatMap((page) => {
        if (!page.data) return []

        return page.data.map((user) => {
          const { id, firstName, lastName, email, role, createdDate } = user

          return {
            id,
            name: <InfoGroup heading={`${firstName} ${lastName}`} description={email} size='sm' />,
            role,
            createdDate: new Date(createdDate).toISOString().split('T')[0]
          }
        })
      })
      .filter(Boolean) as TransformedUser[]
  }, [usersQuery.data])

  const transformAllUsers = useMemo(() => {
    if (!usersQuery.data) return []

    return usersQuery.data.pages
      .flatMap((page) => {
        if (!page.data) return []

        return page.data.map((user: IUser) => {
          return {
            ...user
          }
        })
      })
      .filter(Boolean) as IUser[]
  }, [usersQuery.data])

  const { superAdmin, admin, employee } = useMemo(() => {
    if (!allUsersQuery.data) return { superAdmin: [], admin: [], employee: [] }
    const superAdminUsers = allUsersQuery.data.data?.filter((user) => user.role === 'Super Admin')
    const adminUsers = allUsersQuery.data.data?.filter((user) => user.role === 'Admin')
    const employeeUsers = allUsersQuery.data.data?.filter((user) => user.role === 'Employee')
    return { superAdmin: superAdminUsers, admin: adminUsers, employee: employeeUsers }
  }, [allUsersQuery.data])

  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: (response) => {
      if (response.data) {
        updateAllUsersCache(['allUsers', searchQuery], (data) => [response.data!, ...data])
        updateInfiniteUsersCache(['users', itemsPerPage, searchQuery, sortBy], (page) => ({
          ...page,
          data: [response.data!, ...page.data]
        }))
        return
      }

      queryClient.invalidateQueries({ queryKey: ['allUsers', searchQuery] })
      queryClient.invalidateQueries({ queryKey: ['users', itemsPerPage, searchQuery, sortBy] })
    }
  })

  const editUserMutation = useMutation({
    mutationFn: editUser,
    onSuccess: (response) => {
      if (response.data) {
        updateAllUsersCache(['allUsers', searchQuery], (data) =>
          data.map((user) => (user.id === response.data?.id ? response.data : user))
        )
        updateInfiniteUsersCache(['users', itemsPerPage, searchQuery, sortBy], (page) => ({
          ...page,
          data: page.data.map((user: IUser) => (user.id === response.data?.id ? response.data : user))
        }))

        return
      }

      queryClient.invalidateQueries({ queryKey: ['allUsers', searchQuery] })
      queryClient.invalidateQueries({ queryKey: ['users', itemsPerPage, searchQuery, sortBy] })
    }
  })

  const deleteUserMutation = useMutation({
    mutationFn: (variables: IUser) => deleteUser(variables.id),
    onSuccess: (response) => {
      if (response.data) {
        updateAllUsersCache(['allUsers', searchQuery], (data) => data.filter((user) => user.id !== response.data?.id))
        updateInfiniteUsersCache(['users', itemsPerPage, searchQuery, sortBy], (page) => ({
          ...page,
          data: page.data.filter((user: IUser) => user.id !== response.data?.id)
        }))

        return
      }

      queryClient.invalidateQueries({ queryKey: ['allUsers', searchQuery] })
      queryClient.invalidateQueries({ queryKey: ['users', itemsPerPage, searchQuery, sortBy] })
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
    deleteUserMutation,
    usersQuery,
    allUsersQuery,
    lengthAllUsers
  }
}

export default useUser
