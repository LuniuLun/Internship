import React from 'react'
import type { Preview } from '@storybook/react'
import { ChakraProvider } from '@chakra-ui/react'
import { defaultTheme } from '../src/styles'

const preview: Preview = {
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
      <ChakraProvider theme={defaultTheme}>
        <Story />
      </ChakraProvider>
    )
  ]
}

export default preview
