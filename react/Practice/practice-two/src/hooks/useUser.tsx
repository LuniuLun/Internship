import { ReactNode, useMemo } from 'react'
import InfoGroup from '@components/InfoGroup'
import { TableRow } from '@components/CustomTable'
import { IUser } from '@type/models'
import { addUser, deleteUser, editUser } from '@services/user'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { IApiResponse } from '@type/apiResponse'

interface TransformedUser extends Pick<IUser, 'id' | 'role'>, TableRow {
  name: ReactNode
  createDate: string
}

interface UseUserReturn {
  superAdmin: IUser[] | []
  admin: IUser[] | []
  employee: IUser[] | []
  transformedUsers: TransformedUser[] | []
  transformAllUsers: TableRow[] | []
  addUserMutation: UseMutationResult<IApiResponse<IUser>, Error, IUser>
  editUserMutation: UseMutationResult<IApiResponse<IUser>, Error, IUser>
  deleteUserMutation: UseMutationResult<IApiResponse<IUser>, Error, IUser>
}

export const useUser = (usersData?: IUser[], allUsers?: IUser[]): UseUserReturn => {
  const queryClient = useQueryClient()

  const transformedUsers = useMemo(() => {
    if (!usersData) return []
    return usersData?.map((user) => {
      return {
        id: user.id,
        name: <InfoGroup heading={`${user.firstName} ${user.lastName}`} description={user.email} size='sm' />,
        role: user.role,
        createDate: user.createDate.toString().split('T')[0]
      }
    })
  }, [usersData])

  const transformAllUsers = useMemo((): TableRow[] | [] => {
    if (!usersData) return []
    return usersData?.map((user) => ({
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      phone: user.phone,
      username: user.username,
      password: user.password,
      role: user.role,
      createDate: user.createDate.toString().split('T')[0]
    }))
  }, [usersData])

  const { superAdmin, admin, employee } = useMemo(() => {
    const superAdminUsers = allUsers?.filter((user) => user.role === 'Super Admin') || []
    const adminUsers = allUsers?.filter((user) => user.role === 'Admin') || []
    const employeeUsers = allUsers?.filter((user) => user.role === 'Employee') || []
    return { superAdmin: superAdminUsers, admin: adminUsers, employee: employeeUsers }
  }, [allUsers])

  const addUserMutation = useMutation<IApiResponse<IUser>, Error, IUser>({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['allUsers'] })
    }
  })

  const editUserMutation = useMutation<IApiResponse<IUser>, Error, IUser>({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['allUsers'] })
    }
  })

  const deleteUserMutation = useMutation<IApiResponse<IUser>, Error, IUser>({
    mutationFn: (variables: IUser) => deleteUser(variables.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['allUsers'] })
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
