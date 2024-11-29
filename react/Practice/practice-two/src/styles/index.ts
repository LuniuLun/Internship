import { extendTheme } from '@chakra-ui/react'
import colors from './variables/colors'
import radii from './variables/radii'
import globalStyles from './globalStyles'
import { ButtonStyles as Button } from './components/ButtonStyles/ButtonStyles'

export const defaultTheme = extendTheme({
  colors,
  radii,
  styles: globalStyles.styles,
  config: globalStyles.config,
  components: { Button }
})
