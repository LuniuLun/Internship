import React from 'react'
import { GlobalStyles } from '../src/components/index' // import đúng đường dẫn đến GlobalStyle
import { MemoryRouter } from 'react-router-dom'
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <GlobalStyles />
        <Story />
      </MemoryRouter>
    )
  ]
}

export default preview
