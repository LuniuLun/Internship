import React, { useMemo, useState } from 'react'
import InfoGroup from '@components/InfoGroup'
import { TableRow } from '@components/CustomTable'
import { IUser } from '@type/models'
import { addUser, deleteUser, editUser, fetchAllUsers } from '@services/user'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { IApiResponse } from '@type/apiResponse'

interface TransformedUser extends Pick<IUser, 'id' | 'role' | 'createDate'>, TableRow {
  name: React.ReactNode
}

interface UseUserReturn {
  loading: boolean
  error: string
  allUsers: IUser[]
  superAdmin: IUser[]
  admin: IUser[]
  employee: IUser[]
  getAllUser: () => void
  transformedUsers: TransformedUser[]
  transformFullUsers: TableRow[]
  addUserMutation: UseMutationResult<IApiResponse<IUser>, Error, IUser>
  editUserMutation: UseMutationResult<IApiResponse<IUser>, Error, IUser>
  deleteUserMutation: UseMutationResult<IApiResponse<IUser>, Error, IUser>
}

export const useUser = (users: IUser[]): UseUserReturn => {
  const [allUsers, setAllUsers] = useState<IUser[]>([])
  const [superAdmin, setSuperAdmin] = useState<IUser[]>([])
  const [admin, setAdmin] = useState<IUser[]>([])
  const [employee, setEmployee] = useState<IUser[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const queryClient = useQueryClient()

  const transformedUsers = useMemo(() => {
    return users.map((user) => {
      return {
        id: user.id,
        name: <InfoGroup heading={`${user.firstName} ${user.lastName}`} description={user.email} size='sm' />,
        role: user.role,
        createDate: user.createDate.split('T')[0]
      }
    })
  }, [users])

  const transformFullUsers = useMemo((): TableRow[] => {
    return users.map((user) => ({
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      phone: user.phone,
      username: user.username,
      password: user.password,
      role: user.role,
      createDate: user.createDate.split('T')[0]
    }))
  }, [users])

  const getAllUser = () => {
    const getAllUser = async () => {
      setLoading(true)
      const response = await fetchAllUsers()

      if (response.status === 'success' && response.data) {
        setAllUsers(response.data)
        setSuperAdmin(response.data.filter((user) => user.role === 'Super Admin'))
        setAdmin(response.data.filter((user) => user.role === 'Admin'))
        setEmployee(response.data.filter((user) => user.role === 'Employee'))
      } else {
        setError(response.message)
      }

      setLoading(false)
    }

    getAllUser()
  }

  const addUserMutation = useMutation<IApiResponse<IUser>, Error, IUser>({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  const editUserMutation = useMutation<IApiResponse<IUser>, Error, IUser>({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  const deleteUserMutation = useMutation<IApiResponse<IUser>, Error, IUser>({
    mutationFn: (variables: IUser) => deleteUser(variables.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  return {
    error,
    loading,
    allUsers,
    superAdmin,
    admin,
    employee,
    transformedUsers,
    transformFullUsers,
    getAllUser,
    addUserMutation,
    editUserMutation,
    deleteUserMutation
  }
}
