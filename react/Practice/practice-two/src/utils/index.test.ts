import * as utils from '.'

describe('utils Exports', () => {
  const expectedExports: (keyof typeof utils)[] = [
    'debounce',
    'userSummaryTable',
    'filterUsersByRole',
    'updateInfiniteCache',
    'updateCache',
    'updateItemInArray',
    'removeItemInArray'
  ]

  it('should export all utils correctly', () => {
    expectedExports.forEach((item) => {
      expect(utils[item]).toBeDefined()
    })
  })
})
