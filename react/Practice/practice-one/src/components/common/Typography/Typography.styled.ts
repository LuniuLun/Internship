import styled from 'styled-components'
import { ITypographyProps } from '.'

export const TextStyled = styled.p<ITypographyProps>`
  margin: 0;
  font-size: ${({ variant }) => {
    switch (variant) {
      case 'normal-bold':
      case 'normal-medium':
      case 'normal-thin':
        return '0.875rem'
      case 'large-bold':
        return '1rem'
      default:
        return '0.875rem'
    }
  }};

  line-height: ${({ variant }) => {
    switch (variant) {
      case 'normal-bold':
      case 'normal-medium':
        return '1.1375rem'
      case 'normal-thin':
        return '1.225rem'
      case 'large-bold':
        return '1.4rem'
      default:
        return '1.1375rem'
    }
  }};

  font-weight: ${({ variant }) => {
    switch (variant) {
      case 'normal-bold':
      case 'large-bold':
        return 600
      case 'normal-medium':
        return 500
      case 'normal-thin':
        return 400
      default:
        return 500
    }
  }};

  color: ${({ variant }) => {
    switch (variant) {
      case 'normal-thin':
        return 'var(--white-text-3)'
      case 'error-message':
        return 'var(--orange-color-1)' /* Error message color */
      default:
        return 'inherit'
    }
  }};
`
