import { Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface LogoProps {
  srcLogo: string
  src: string
  alt?: string
  width?: string | number
  height?: string | number
}

const Logo = ({ src, srcLogo, alt = 'Logo', width = '100px', height = 'auto' }: LogoProps) => {
  return (
    <Link to={src}>
      <Image src={srcLogo} alt={alt} width={width} height={height} borderRadius='50%' />
    </Link>
  )
}

export default Logo
