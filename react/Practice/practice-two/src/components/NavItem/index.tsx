import React from 'react'
import { Flex, Text, Box } from '@chakra-ui/react'
import colors from '@styles/variables/colors'

interface NavItemProps {
  icon: React.ReactNode
  title: string
  isActive: boolean
  handleClick: (title: string) => void
}

const NavItem: React.FC<NavItemProps> = ({ icon, title, isActive, handleClick }) => {
  const onClick = () => handleClick(title)

  return (
    <Flex
      align='center'
      borderRight={isActive ? `6px solid ${colors.brand.primary}` : 'none'}
      p={4}
      paddingLeft='32px'
      bg={'transparent'}
      cursor='pointer'
      _hover={{ bg: 'gray.50' }}
      onClick={onClick}
    >
      <Box>
        {React.cloneElement(icon as React.ReactElement, {
          fill: isActive ? colors.brand.primary : colors.brand.blackTextTertiary
        })}
      </Box>
      <Text
        ml={3}
        fontWeight={isActive ? 'bold' : 'normal'}
        color={isActive ? colors.brand.primary : colors.brand.blackTextTertiary}
      >
        {title}
      </Text>
    </Flex>
  )
}

export default NavItem
