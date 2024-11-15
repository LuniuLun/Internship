import React from 'react'
import { ImageStyled } from './Image.styled'
import defaultImage from '../../../assets/images/default-image.svg'
import { TSizeVariant } from '../../../types/variant'

export interface IImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: TSizeVariant
}

const Image = ({ src, alt, size, ...props }: IImageProps) => {
  return (
    <ImageStyled
      src={src}
      alt={alt}
      size={size}
      onError={(e) => {
        ;(e.target as HTMLImageElement).src = defaultImage
      }}
      {...props}
    />
  )
}

export default Image
