// Todo: Sorts an array of objects by a specified property in ascending order.
const SortObjectsByPropertyAZ = <T>(array: T[], property: keyof T): T[] => {
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

export default SortObjectsByPropertyAZ
