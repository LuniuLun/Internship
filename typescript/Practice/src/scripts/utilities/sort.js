import BaseInstance from './baseInstance'

class Sort extends BaseInstance {
  /**
   * Sorts an array of objects by a specified property in ascending order.
   * @param {Array<Object>} array - The array of objects to sort.
   * @param {string} property - The property to sort by.
   * @returns {Array<Object>} The sorted array.
   */
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
