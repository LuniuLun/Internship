import { ComponentStyleConfig } from '@chakra-ui/react'

const InputStyles: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'md',
    width: '100%',
    height: 'unset',
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
    primary: {
      bg: 'brand.white',
      color: 'brand.blackTextPrimary',
      border: '1px solid',
      borderColor: 'brand.secondary'
    }
  },
  defaultProps: {
    size: 'sm',
    variant: 'primary'
  }
}

export default InputStyles
