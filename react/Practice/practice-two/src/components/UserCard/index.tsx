import { DownArrowIcon } from '@assets/icons'
import { Box, Avatar, IconButton } from '@chakra-ui/react'
import InfoGroup from '@components/InfoGroup'

interface UserCardProps {
  name: string
  role: string
  avatar: string
}

const UserCard = ({ name, role, avatar }: UserCardProps) => {
  return (
    <Box display='flex' gap={4} alignItems='center' backgroundColor='transparent' boxShadow='sm' maxWidth='260px'>
      <Avatar name={name} src={avatar} size='md' />
      <InfoGroup heading={name} description={role} size='md' />
      <IconButton
        h='24px'
        w='24px'
        bgColor={'transparent'}
        _hover={{ bgColor: 'blue.50' }}
        aria-label='dropdown'
        icon={<DownArrowIcon />}
      />
    </Box>
  )
}

export default UserCard
