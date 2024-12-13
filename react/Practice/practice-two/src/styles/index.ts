import { extendTheme } from '@chakra-ui/react'
import colors from './variables/colors'
import radii from './variables/radii'
import globalStyles from './globalStyles'
import { ButtonStyles as Button, HeadingStyles as Heading, InputStyles as Input } from './components'

export const defaultTheme = extendTheme({
  colors,
  radii,
  styles: globalStyles.styles,
  config: globalStyles.config,
  fonts: globalStyles.fonts,
  components: { Button, Heading, Input }
})
