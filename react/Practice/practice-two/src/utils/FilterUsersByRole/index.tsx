import { IUser } from '@type/models'

const filterUsersByRole = (users: IUser[]) => {
  const superAdminUsers = users.filter((user) => user.role === 'Super Admin')
  const adminUsers = users.filter((user) => user.role === 'Admin')
  const employeeUsers = users.filter((user) => user.role === 'Employee')

  return { superAdmin: superAdminUsers, admin: adminUsers, employee: employeeUsers }
}

export default filterUsersByRole
