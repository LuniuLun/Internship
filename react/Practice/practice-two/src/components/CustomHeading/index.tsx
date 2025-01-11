import { Heading, HeadingProps } from '@chakra-ui/react'
import { memo } from 'react'

const CustomHeading = memo(({ title, ...props }: HeadingProps) => {
  return <Heading {...props}>{title}</Heading>
})

export default CustomHeading
