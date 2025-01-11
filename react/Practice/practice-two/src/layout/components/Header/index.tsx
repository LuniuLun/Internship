import { Box, Flex, IconButton } from '@chakra-ui/react'
import { MenuIcon, NotificationIcon } from '@assets/icons'
import { InfoGroup, UserCard } from '@components'
import { useSidebar } from '@hooks'

const Header = () => {
  const { toggleSidebar } = useSidebar()

  return (
    <Flex alignItems='center' justifyContent='space-between' w='100%' padding='31px 0 22px 13px' bgColor='transparent'>
      <Flex gap={4}>
        <IconButton
          icon={<MenuIcon />}
          aria-label='toggle-sidebar'
          onClick={toggleSidebar}
          bgColor='brand.secondary'
          display={{ base: 'flex', xl: 'none' }}
        />
        <InfoGroup heading='Hello, Lekan' description='Have a nice day' size='md' />
      </Flex>
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
