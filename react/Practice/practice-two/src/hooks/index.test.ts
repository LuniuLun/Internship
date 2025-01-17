import * as Hooks from '.'

describe('Hooks Exports', () => {
  const expectedExports: (keyof typeof Hooks)[] = [
    'useGetUser',
    'useEditUser',
    'useAddUser',
    'useDeleteUser',
    'useSidebar',
    'useCustomToast'
  ]

  it('should export all hooks correctly', () => {
    expectedExports.forEach((item) => {
      expect(Hooks[item]).toBeDefined()
    })
  })
})
