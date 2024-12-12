import { DownArrowIcon } from '@assets/icons'
import { Box, Text, Avatar, Flex, IconButton } from '@chakra-ui/react'

interface UserCardProps {
  name: string
  role: string
  avatar: string
}

const UserCard = ({ name, role, avatar }: UserCardProps) => {
  return (
    <Box display='flex' alignItems='center' p='4' backgroundColor='transparent' boxShadow='sm' maxWidth='260px'>
      <Avatar name={name} src={avatar} size='md' />
      <Flex direction='column' ml='4'>
        <Text fontWeight='bold'>{name}</Text>
        <Text fontSize='sm' color='gray.500'>
          {role}
        </Text>
      </Flex>
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
