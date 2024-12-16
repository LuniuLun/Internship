import { NotificationIcon } from '@assets/icons'
import { Box, Flex } from '@chakra-ui/react'
import { InfoGroup, UserCard } from '@components'

const Header = () => {
  return (
    <Flex alignItems='center' justifyContent='space-between' w='100%' padding='31px 0 22px 13px' bgColor='transparent'>
      <InfoGroup heading='Hello, Lekan' description='Have a nice day' size='md' />
      <Flex
        alignItems='center'
        gap={5}
        sx={{ '> *:not(:first-of-type)': { borderLeft: '1px solid #ccc', paddingLeft: 5 } }}
      >
        <Box height='100%'>
          <NotificationIcon />
        </Box>
        <UserCard name='Lekan Okeowo' role='Admin' avatar='' />
      </Flex>
    </Flex>
  )
}

export default Header
