import React, { useMemo, useState } from 'react'
import InfoGroup from '@components/InfoGroup'
import { TableRow } from '@components/CustomTable'
import { IUser } from '@type/models'
import { fetchAllUsers } from '@services/user'

interface TransformedUser extends Pick<IUser, 'id' | 'role' | 'createDate'>, TableRow {
  name: React.ReactNode
}

interface UseUserReturn {
  loading: boolean
  error: string
  userQuantity: number
  getUserQuantity: () => void
  transformedUsers: TransformedUser[]
}

export const useUser = (users: IUser[]): UseUserReturn => {
  const [userQuantity, setUserQuantity] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  const getUserQuantity = () => {
    const getAllUser = async () => {
      setLoading(true)
      const response = await fetchAllUsers()
      if (response.status === 'success' && response.data) {
        setUserQuantity(response.data.length)
      } else {
        setError(response.message)
      }
      setLoading(false)
    }
    getAllUser()
  }

  return {
    error,
    loading,
    userQuantity,
    transformedUsers,
    getUserQuantity
  }
}
