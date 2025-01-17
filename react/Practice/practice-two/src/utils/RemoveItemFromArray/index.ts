const removeItemFromArray = <T extends { id: string }>(array: T[], idToRemove: string): T[] => {
  return array.filter((item) => item.id !== idToRemove)
}

export default removeItemFromArray
