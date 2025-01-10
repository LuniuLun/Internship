import { ComponentStyleConfig } from '@chakra-ui/react'

const CheckboxStyles: ComponentStyleConfig = {
  baseStyle: {
    control: {
      border: '2px solid',
      borderColor: 'brand.black',
      _checked: {
        bg: 'brand.black',
        borderColor: 'brand.black'
      }
    },
    icon: {
      color: 'brand.white'
    }
  }
}

export default CheckboxStyles
