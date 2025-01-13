import * as Stores from '.'

describe('Stores Exports', () => {
  const expectedExports: (keyof typeof Stores)[] = ['filterStore']

  it('should export all hooks correctly', () => {
    expectedExports.forEach((item) => {
      expect(Stores[item]).toBeDefined()
    })
  })
})
