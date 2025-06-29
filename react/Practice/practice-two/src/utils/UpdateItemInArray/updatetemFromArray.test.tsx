import mockUsers from '@constants/mockUsers'
import updateItemInArray from '.'

describe('updateItemInArray', () => {
  it('should update the item with the specified id', () => {
    const updatedUser = { id: '2', firstName: 'UpdatedName' }
    const result = updateItemInArray(mockUsers, updatedUser)

    expect(result).toHaveLength(3)
    expect(result[1].firstName).toBe('UpdatedName')
  })

  it('should not modify the array if the id does not exist', () => {
    const updatedUser = { id: '4', firstName: 'UpdatedName' }
    const result = updateItemInArray(mockUsers, updatedUser)

    expect(result).toEqual(mockUsers)
  })
})
