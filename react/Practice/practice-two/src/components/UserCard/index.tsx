import { DownArrowIcon } from '@assets/icons'
import { Avatar, IconButton, Flex } from '@chakra-ui/react'
import InfoGroup from '@components/InfoGroup'
import { memo } from 'react'

interface UserCardProps {
  name: string
  role: string
  avatar?: string
}

const UserCard = memo(({ name, role, avatar }: UserCardProps) => {
  return (
    <Flex gap={4} alignItems='center' backgroundColor='transparent' boxShadow='sm' maxWidth='260px'>
      <Avatar name={name} src={avatar} size='md' />
      <Flex gap={4} display={{ base: 'none', md: 'flex' }}>
        <InfoGroup heading={name} description={role} size='md' />
        <IconButton
          h='24px'
          w='24px'
          bgColor={'transparent'}
          _hover={{ bgColor: 'blue.50' }}
          aria-label='dropdown'
          icon={<DownArrowIcon />}
        />
      </Flex>
    </Flex>
  )
})

export default UserCard
