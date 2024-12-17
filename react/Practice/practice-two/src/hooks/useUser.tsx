import React, { useMemo } from 'react'
import InfoGroup from '@components/InfoGroup'
import { TableRow } from '@components/CustomTable'
import { IUser } from '@type/models'

interface TransformedUser extends Pick<IUser, 'role' | 'createDate'>, TableRow {
  name: React.ReactNode
}

interface UseUserReturn {
  transformedUsers: TransformedUser[]
}

export const useUser = (users: IUser[]): UseUserReturn => {
  const transformedUsers = useMemo(() => {
    return users.map((user) => {
      return {
        name: <InfoGroup heading={`${user.firstName} ${user.lastName}`} description={user.email} size='sm' />,
        role: user.role,
        createDate: user.createDate.split('T')[0]
      }
    })
  }, [users])

  return {
    transformedUsers
  }
}
