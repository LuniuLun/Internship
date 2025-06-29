import { InfoGroup } from '@components'
import { IUser, TransformedUser } from '@type/models'

const userSummaryTable = (users: IUser[]): TransformedUser[] => {
  return users.map((user) => {
    const { id, firstName, lastName, email, role, createdDate } = user

    const formattedDate = new Date(createdDate).toISOString().split('T')[0]

    return {
      id,
      name: <InfoGroup heading={`${firstName} ${lastName}`} description={email} size='sm' />,
      role,
      createdDate: formattedDate
    }
  })
}

export default userSummaryTable
