import React, { useMemo } from 'react'
import InfoGroup from '@components/InfoGroup'
import { User } from '@type/models'
import { TableRow } from '@components/CustomTable'

interface TransformedUser extends Omit<User, 'name' | 'email'>, TableRow {
  name: React.ReactNode
}

interface UseUserReturn {
  transformedUsers: TransformedUser[]
}

export const useUser = (users: User[]): UseUserReturn => {
  const transformedUsers = useMemo(() => {
    return users.map((user) => {
      const { email, ...rest } = user
      return {
        ...rest,
        name: <InfoGroup heading={user.name} description={email} size='sm' /> // Add 'name' as a React node
      }
    })
  }, [users])

  return {
    transformedUsers
  }
}
