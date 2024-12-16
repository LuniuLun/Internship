import { InfoGroup } from '@components'
import { User } from '@type/models'
import React, { useMemo } from 'react'

interface TransformedUser extends Omit<User, 'name'> {
  name: React.ReactNode
}

export const useUser = (users: User[]): TransformedUser[] => {
  const transformedUsers = useMemo(() => {
    return users.map((user) => ({
      ...user,
      name: <InfoGroup heading={user.name} description={user.email} size='sm' />
    }))
  }, [users])

  return transformedUsers
}
