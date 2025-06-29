import mockUsers from '@constants/mockUsers'
import removeItemFromArray from '.'

describe('removeItemFromArray', () => {
  it('should remove the item with the specified id', () => {
    const result = removeItemFromArray(mockUsers, '2')
    expect(result).toHaveLength(2)
  })

  it('should return the original array if no item is found with the specified id', () => {
    const result = removeItemFromArray(mockUsers, '4')

    expect(result).toEqual(mockUsers)
  })
})
