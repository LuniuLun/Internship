import { Stack, Text } from '@chakra-ui/react'
import colors from '@styles/variables/colors'
import { Skeleton } from '@chakra-ui/react'

interface IStatisticsCardProps {
  label: string
  value: number
  isLoaded?: boolean
}

const StatisticsCard = ({ isLoaded = true, label, value }: IStatisticsCardProps) => {
  return (
    <Stack flex={1} p={4} borderWidth={1} borderRadius='md' bg='white' borderColor={colors.brand.secondary}>
      <Skeleton isLoaded={isLoaded} startColor='gray.100' endColor='gray.300'>
        <Text fontSize='sm' fontWeight='medium' color={colors.brand.blackTextSecondary}>
          {label}
        </Text>
      </Skeleton>
      <Skeleton isLoaded={isLoaded} startColor='gray.100' endColor='gray.300'>
        <Text fontSize='xl' fontWeight='semibold' color={colors.brand.blackTextPrimary}>
          {value}
        </Text>
      </Skeleton>
    </Stack>
  )
}

export default StatisticsCard
