import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/500.css'
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/700.css'
import { defaultTheme } from './styles'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FilterProvider } from '@components/Filter/FilterProvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={defaultTheme} resetCSS>
        <FilterProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </FilterProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)
