interface IFilterOptions {
  typeOfSort?: string
  value?: string
  limit?: number
}

class FilterRule {
  private typeOfSort: string
  private property: string
  private value: string
  private limit: number
  private static instance: FilterRule

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.typeOfSort = '' // The type of sorting to be applied (e.g., A to Z, Z to A)
    this.property = 'name' // The property to be filtered (default is 'name')
    this.value = '' // The value to filter by
    this.limit = 9 // The limit of items to be fetched
  }

  public static getInstance(): FilterRule {
    if (!this.instance) {
      this.instance = new this()
    }

    return this.instance
  }

  public setFilter({ typeOfSort, value, limit }: IFilterOptions): void {
    this.typeOfSort = typeOfSort || this.typeOfSort
    this.value = value || this.value
    this.limit = limit || this.limit
  }
}

export default FilterRule
