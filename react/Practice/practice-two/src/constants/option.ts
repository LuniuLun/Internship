import { SelectOption } from '@components/CustomSelect'

export const SORT_OPTION: SelectOption<string>[] = [
  { value: 'firstName', label: 'Name' },
  { value: 'role', label: 'Role' },
  { value: 'createDate', label: 'Create date' }
]

export const ROLE_OPTION: SelectOption<string>[] = [
  { value: 'Super Admin', label: 'Super Admin' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Employee', label: 'Employee' }
]

export const MODULE_PERMISSION = [
  {
    modulePermission: 'Super Admin',
    read: true,
    write: true,
    delete: true
  },
  {
    modulePermission: 'Admin',
    read: true,
    write: false,
    delete: false
  },
  {
    modulePermission: 'Employee',
    read: true,
    write: false,
    delete: false
  }
]

export const ITEM_PER_PAGE = [5, 10, 15, 20, 50]
