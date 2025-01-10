import { render } from '@testing-library/react'
import useSidebar from '.'

test('useSidebar throws error when not wrapped in SidebarProvider', () => {
  const TestComponent = () => {
    useSidebar()
    return <div>Test Component</div>
  }

  expect(() => render(<TestComponent />)).toThrow('useSidebar must be used within a SidebarProvider')
})
