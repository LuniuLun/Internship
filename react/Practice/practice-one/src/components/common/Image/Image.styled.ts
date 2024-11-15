import styled from 'styled-components'
import { IImageProps } from '.'

export const ImageStyled = styled.img<IImageProps>`
  width: ${({ size }) => {
    switch (size) {
      case 'tiny':
        return '4px'
      case 'sm':
        return '18px'
      default:
        return '127px'
    }
  }};
  max-width: 100%;
  border-radius: 50%;
  aspect-ratio: 1;
`
