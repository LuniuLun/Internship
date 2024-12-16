import { ComponentStyleConfig } from '@chakra-ui/react'

const InputStyles: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'md',
    width: '100%',
    fontSize: 'md',
    backgroundColor: 'brand.white',
    color: 'brand.blackTextPrimary'
  },
  sizes: {
    sm: {
      height: '34px'
    }
  },
  variants: {
    outline: {
      border: '1px solid',
      borderColor: 'brand.secondary'
    }
  },
  defaultProps: {
    size: 'sm',
    variant: 'outline'
  }
}

export default InputStyles
