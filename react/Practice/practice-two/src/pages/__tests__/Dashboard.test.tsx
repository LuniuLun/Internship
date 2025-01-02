import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import Dashboard from '@pages/Dashboard'

const createQueryClient = () => new QueryClient()

test('renders Dashboard correctly', () => {
  const queryClient = createQueryClient()

  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  )

  expect(container).toMatchSnapshot()
})
