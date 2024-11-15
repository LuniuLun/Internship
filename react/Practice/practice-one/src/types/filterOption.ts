export interface TFilterOptions<T> {
  typeOfSort?: 'AToZ' | 'ZToA' | ''
  property?: keyof T
  value?: string
  limit?: string
}
