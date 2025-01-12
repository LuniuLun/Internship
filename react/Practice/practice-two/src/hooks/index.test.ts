import * as Hooks from '.'

describe('Hooks Exports', () => {
  const expectedExports: (keyof typeof Hooks)[] = ['useUser', 'useSidebar', 'useCustomToast', 'useFilterStore']

  it('should export all hooks correctly', () => {
    expectedExports.forEach((item) => {
      expect(Hooks[item]).toBeDefined()
    })
  })
})
