import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { SidebarProvider } from '@layout/components/Sidebar/SidebarProvider'
import { useSidebar } from '@hooks'

describe('SidebarProvider', () => {
  it('should provide correct initial state', () => {
    const TestComponent = () => {
      const { isSidebarOpen } = useSidebar()
      return <div>{isSidebarOpen ? 'Open' : 'Closed'}</div>
    }

    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    )

    expect(screen.getByText('Closed')).toBeInTheDocument()
  })

  it('should toggle the sidebar open and closed', () => {
    const TestComponent = () => {
      const { isSidebarOpen, toggleSidebar } = useSidebar()

      return (
        <div>
          <div>{isSidebarOpen ? 'Open' : 'Closed'}</div>
          <button onClick={toggleSidebar} aria-label='toggle-sidebar'>
            Toggle Sidebar
          </button>
        </div>
      )
    }

    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    )

    expect(screen.getByText('Closed')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /toggle-sidebar/i }))
    expect(screen.getByText('Open')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /toggle-sidebar/i }))
    expect(screen.getByText('Closed')).toBeInTheDocument()
  })
  it('should close the sidebar when closeSidebar is called', () => {
    const TestComponent = () => {
      const { isSidebarOpen, closeSidebar, toggleSidebar } = useSidebar()

      return (
        <div>
          <div>{isSidebarOpen ? 'Open' : 'Closed'}</div>
          <button onClick={toggleSidebar} aria-label='toggle-sidebar'>
            Toggle
          </button>
          <button onClick={closeSidebar}>Close</button>
        </div>
      )
    }

    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    )

    // First open the sidebar
    fireEvent.click(screen.getByRole('button', { name: /toggle-sidebar/i }))
    expect(screen.getByText('Open')).toBeInTheDocument()

    // Then close it
    fireEvent.click(screen.getByText('Close'))
    expect(screen.getByText('Closed')).toBeInTheDocument()
  })
})
