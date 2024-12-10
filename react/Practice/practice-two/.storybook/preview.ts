import type { Preview } from '@storybook/react'
import { defaultTheme } from './../src/styles'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    chakra: {
      defaultTheme
    }
  }
}

export default preview
