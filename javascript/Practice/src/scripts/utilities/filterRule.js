class FilterRule {
  constructor() {
    this.instance = this
    this.typeOfSort = '' // The type of sorting to be applied (e.g., A to Z, Z to A)
    this.property = 'name' // The property to be filtered (default is 'name')
    this.value = '' // The value to filter by
    this.limit = 9 // The limit of items to be fetched
  }

  /**
   * Singleton pattern to ensure only one instance of FilterRule exists.
   * @returns {FilterRule} The instance of the FilterRule class.
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new FilterRule()
    }
    return this.instance
  }

  /**
   * Sets the filter criteria for the instance.
   * @param {Object} filter - The filter criteria.
   * @param {string} filter.typeOfSort - The type of sorting.
   * @param {string} filter.value - The value to filter by.
   * @param {number} filter.limit - The limit of items to fetch.
   */
  setFilter({ typeOfSort, value, limit }) {
    this.typeOfSort = typeOfSort || this.typeOfSort
    this.value = value
    this.limit = limit || this.limit
  }
}

export default FilterRule
