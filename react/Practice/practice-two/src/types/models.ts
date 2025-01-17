import { TableRow } from '@components/CustomTable'

export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  username: string
  password: string
  role: string
  createdDate: Date
}

export interface TransformedUser extends Pick<IUser, 'id' | 'role'>, TableRow {
  name: React.ReactNode
  createdDate: string
}
