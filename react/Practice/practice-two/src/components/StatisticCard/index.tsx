import { Box, Text } from '@chakra-ui/react'
import colors from '@styles/variables/colors'

interface IStatisticsCardProps {
  label: string
  value: number
}

const StatisticsCard = ({ label, value }: IStatisticsCardProps) => {
  return (
    <Box flex={1} p={4} borderWidth={1} borderRadius='md' display='flex' flexDirection='column' bg='white'>
      <Text fontSize='sm' fontWeight='medium' color={colors.brand.blackTextSecondary}>
        {label}
      </Text>
      <Text fontSize='xl' fontWeight='semibold' color={colors.brand.blackTextPrimary}>
        {value}
      </Text>
    </Box>
  )
}

export default StatisticsCard
