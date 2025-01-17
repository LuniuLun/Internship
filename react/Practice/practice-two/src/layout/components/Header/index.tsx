import { Box, Button, Flex, IconButton } from '@chakra-ui/react'
import { MenuIcon, NotificationIcon } from '@assets/icons'
import { InfoGroup, UserCard } from '@components'
import { useSidebar } from '@hooks'
import { authStore } from '@stores'
import colors from '@styles/variables/colors'

const Header = () => {
  const { toggleSidebar } = useSidebar()
  const { user, login, logout } = authStore()

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
        <InfoGroup heading={`Hello ${user?.name || ''}`} description='Have a nice day' size='md' />
      </Flex>
      <Flex
        alignItems='center'
        gap={5}
        sx={{ '> *:not(:first-of-type)': { borderLeft: '1px solid #ccc', paddingLeft: 5 } }}
      >
        {user ? (
          <Flex alignItems='center' gap={5}>
            <Box height='100%'>
              <NotificationIcon />
            </Box>
            <Box position='relative' cursor='pointer' _hover={{ div: { display: 'flex' } }}>
              <UserCard name={user?.name} role={user?.roles[0]} avatar='' />
              <Flex position='absolute' bottom='-70%' right='0' display='none' bgColor={colors.brand.white} w='100px'>
                <Box onClick={logout} px={2} py={1} textAlign='end' w='100%'>
                  Logout
                </Box>
              </Flex>
            </Box>
          </Flex>
        ) : (
          <Button onClick={login} colorScheme='brand' size='sm'>
            Login
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

export default Header
