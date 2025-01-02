import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { SidebarProvider } from '../Sidebar/SidebarProvider'
import Sidebar from '../Sidebar'
import { NAV_ITEMS } from '@constants/option'
import * as hooks from '@chakra-ui/react'

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useBreakpointValue: jest.fn()
}))

describe('Sidebar', () => {
  const renderSidebar = () => {
    return render(
      <BrowserRouter>
        <ChakraProvider>
          <SidebarProvider>
            <Sidebar />
          </SidebarProvider>
        </ChakraProvider>
      </BrowserRouter>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('handles mobile view correctly when sidebar is closed', () => {
    ;(hooks.useBreakpointValue as jest.Mock).mockReturnValue(true)

    const { container } = renderSidebar()

    const sidebar = container.firstChild as HTMLElement
    expect(sidebar).toHaveStyle('transform: translateX(-100%)')
  })

  it('closes sidebar on clicking outside in mobile view', () => {
    ;(hooks.useBreakpointValue as jest.Mock).mockReturnValue(true)

    const { container } = renderSidebar()

    fireEvent.mouseDown(document.body)

    const sidebar = container.firstChild as HTMLElement
    expect(sidebar).toHaveStyle('transform: translateX(-100%)')
  })

  it('closes sidebar when clicking a nav item in mobile view', () => {
    ;(hooks.useBreakpointValue as jest.Mock).mockReturnValue(true)

    const { container } = renderSidebar()

    const navItem = screen.getByText(NAV_ITEMS[1].title)
    fireEvent.click(navItem)

    const sidebar = container.firstChild as HTMLElement
    expect(sidebar).toHaveStyle('transform: translateX(-100%)')
  })

  it('matches snapshot', () => {
    const { container } = renderSidebar()
    expect(container).toMatchSnapshot()
  })
})
