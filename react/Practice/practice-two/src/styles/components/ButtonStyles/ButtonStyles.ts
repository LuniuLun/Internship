import { ComponentStyleConfig } from '@chakra-ui/react'

export const ButtonStyles: ComponentStyleConfig = {
  sizes: {
    sm: {
      borderRadius: 'md',
      fontSize: 'sm',
      px: 5,
      py: 15
    },
    md: {
      borderRadius: 'lg',
      fontSize: 'md',
      px: 18,
      py: 22
    }
  },
  variants: {
    primary: {
      bg: 'brand.primary',
      color: 'white',
      _hover: {
        border: 'none',
        bg: 'brand.hoverBtnColor',
        transform: 'scale(1.02)',
        boxShadow: 'md'
      }
    },
    secondary: {
      bg: 'brand.secondary',
      color: 'brand.blackTextSecondary',
      _hover: {
        border: 'none',
        bg: 'brand.hoverBtnColor',
        transform: 'scale(1.02)',
        color: 'brand.white',
        boxShadow: 'md'
      }
    }
  },
  defaultProps: {
    fontWeight: 'bold'
  }
}
