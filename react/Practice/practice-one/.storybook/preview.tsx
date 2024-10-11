import React from 'react'
import { GlobalStyles } from '../src/components/index' // import đúng đường dẫn đến GlobalStyle

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
      <>
        <GlobalStyles />
        <Story />
      </>
    )
  ]
}

export default preview
