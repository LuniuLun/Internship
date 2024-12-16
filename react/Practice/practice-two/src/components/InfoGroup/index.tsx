import { memo } from 'react'
import { Text, Flex } from '@chakra-ui/react'
import { TSizeInfoGroup } from '@type/variant'
import colors from '@styles/variables/colors'

interface IInfoGroupProps {
  heading: string
  description: string
  size?: TSizeInfoGroup
}

const InfoGroup = ({ heading, description, size = 'sm' }: IInfoGroupProps) => {
  return (
    <Flex direction='column' align='center' alignItems={'start'}>
      <Text fontWeight='500' fontSize={size === 'sm' ? '0.875rem' : '1rem'} color={colors.brand.black}>
        {heading}
      </Text>
      <Text
        fontWeight='400'
        fontSize='0.75rem'
        color={size === 'sm' ? colors.brand.blackTextSecondary : colors.brand.blackTextTertiary}
      >
        {description}
      </Text>
    </Flex>
  )
}

export default memo(InfoGroup)
