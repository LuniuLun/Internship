import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { SidebarProvider } from '../Sidebar/SidebarProvider'
import Header from '../Header'

test('renders Header correctly', () => {
  const { container } = render(
    <SidebarProvider>
      <Header />
    </SidebarProvider>
  )

  expect(container).toMatchSnapshot()
})
