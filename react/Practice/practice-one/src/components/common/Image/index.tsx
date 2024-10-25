import { ImageStyled } from './Image.styled'
import defaultImage from '../../../assets/images/default-image.svg'

const Image = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <ImageStyled
      src={src}
      alt={alt}
      onError={(e) => {
        ;(e.target as HTMLImageElement).src = defaultImage
      }}
    />
  )
}

export default Image
