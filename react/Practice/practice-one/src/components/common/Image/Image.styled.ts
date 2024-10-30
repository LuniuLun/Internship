import styled from 'styled-components'
import { IImageProps } from '.'

export const ImageStyled = styled.img<IImageProps>`
  width: ${({ size }) => (size === 'sm' ? '4px' : '127px')};
  max-width: 100%;
  border-radius: 50%;
  aspect-ratio: 1;
`
