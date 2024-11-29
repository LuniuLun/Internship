import { extendTheme } from '@chakra-ui/react'
import colors from './variables/colors'
import fontSizes from './variables/fontSizes'
import radii from './variables/radii'
import globalStyles from './globalStyles'

export const defaultTheme = extendTheme({
  colors,
  fontSizes,
  radii,
  styles: globalStyles.styles,
  config: globalStyles.config
})
