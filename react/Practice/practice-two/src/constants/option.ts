import { SelectOption } from '@components/CustomSelect'

export const sortOptions: SelectOption<string>[] = [
  { value: 'firstName', label: 'Name' },
  { value: 'role', label: 'Role' },
  { value: 'createDate', label: 'Create date' }
]

export const itemsPerPageOptions = [5, 10, 15, 20, 50]
