import { Box } from '@chakra-ui/react'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'

interface LogoProps {
  icon: React.ReactNode
  src: string
  width?: string
  height?: string
}

const Logo = ({ src, icon, width = '100px', height = '100px' }: LogoProps) => {
  return (
    <Link to={src}>
      <Box borderRadius='50%'>{React.cloneElement(icon as React.ReactElement, { width, height })}</Box>
    </Link>
  )
}

export default memo(Logo)
