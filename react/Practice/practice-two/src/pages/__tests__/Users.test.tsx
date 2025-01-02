import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Users from '@pages/Users'

const createQueryClient = () => new QueryClient()

test('renders Dashboard correctly', () => {
  const queryClient = createQueryClient()

  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  )

  expect(container).toMatchSnapshot()
})
