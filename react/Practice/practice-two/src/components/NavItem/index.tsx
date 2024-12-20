import React from 'react'
import { Flex, Text, Box } from '@chakra-ui/react'
import colors from '@styles/variables/colors'
import { Link, LinkProps } from 'react-router-dom'

interface NavItemProps extends LinkProps {
  icon: React.ReactNode
  title: string
  isActive: boolean
}

const NavItem = ({ icon, title, isActive, to }: NavItemProps) => {
  return (
    <Link to={to}>
      <Flex
        align='center'
        borderRight={isActive ? `6px solid ${colors.brand.primary}` : 'none'}
        p={4}
        paddingLeft='32px'
        bg={'transparent'}
        cursor='pointer'
        _hover={{ bg: 'gray.50' }}
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
    </Link>
  )
}

export default NavItem
