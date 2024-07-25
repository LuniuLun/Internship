class Sort {
  constructor() {
    this.instance = this
  }

  static getInstance() {
    if (!Sort.instance) {
      Sort.instance = new Sort()
    }
    return Sort.instance
  }

  static sortObjectsByPropertyAZ(array, property) {
    return array.sort((a, b) => {
      if (a[property] > b[property]) {
        return 1
      }
      if (a[property] < b[property]) {
        return -1
      }
      return 0
    })
  }
}

export default Sort
