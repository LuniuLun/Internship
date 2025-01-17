import * as Components from './index'

describe('Component Exports', () => {
  const expectedExports: (keyof typeof Components)[] = [
    'InfoGroup',
    'TextField',
    'Select',
    'StatisticCard',
    'Logo',
    'NavItem',
    'UserCard',
    'CustomTable',
    'Pagination',
    'CustomModal',
    'CustomSelect',
    'UserModal',
    'WarningModal',
    'Filter',
    'ErrorBoundary'
  ]

  it('should export all components correctly', () => {
    expectedExports.forEach((component) => {
      expect(Components[component]).toBeDefined()
    })
  })
})
