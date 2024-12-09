import { memo } from 'react'
import { Description, Heading, InfoGroupStyled } from './InfoGroup.styled'
import { TSizeInfoGroup } from '@type/variant'

interface IInfoGroupProps {
  heading: string
  description: string
  size: TSizeInfoGroup
}

const InfoGroup = ({ heading, description, size = 'sm' }: IInfoGroupProps) => {
  return (
    <InfoGroupStyled>
      <Heading $size={size}>{heading}</Heading>
      <Description $size={size}>{description}</Description>
    </InfoGroupStyled>
  )
}

export default memo(InfoGroup)
