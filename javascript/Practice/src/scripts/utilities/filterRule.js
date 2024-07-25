class FilterRule {
  constructor() {
    this.instance = this
    this.typeOfSort = ''
    this.property = 'name'
    this.value = ''
    this.limit = 9
  }

  static getInstance() {
    if (!FilterRule.instance) {
      FilterRule.instance = new FilterRule()
    }
    return FilterRule.instance
  }

  setFilter({ typeOfSort, value, limit }) {
    this.typeOfSort = typeOfSort || this.typeOfSort
    this.value = value
    this.limit = limit || this.limit
  }
}
export default FilterRule
