import React, { useEffect, useState } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import { Logo, NavItem } from '@components'
import { useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '@constants/option'
import {
  DashboardIcon,
  LeaderboardIcon,
  DocumentIcon,
  GalleryIcon,
  HelpIcon,
  HierarchyIcon,
  MessageIcon,
  SettingIcon,
  LogoIcon
} from '@assets/icons'

const iconMap: Record<string, React.ElementType> = {
  dashboard: DashboardIcon,
  users: LeaderboardIcon,
  documents: DocumentIcon,
  photos: GalleryIcon,
  hierarchy: HierarchyIcon,
  message: MessageIcon,
  help: HelpIcon,
  setting: SettingIcon
}

const Sidebar = () => {
  const location = useLocation()
  const [activeNavItem, setActiveNavItem] = useState<string>('dashboard')

  useEffect(() => {
    const currentPath = location.pathname
    const normalizedCurrentPath = currentPath.replace(/\/$/, '')

    const matchedItem = NAV_ITEMS.find((item) => {
      return normalizedCurrentPath === item.path || normalizedCurrentPath.startsWith(item.path + '/')
    })

    setActiveNavItem(matchedItem ? matchedItem.id : 'dashboard')
  }, [location.pathname])

  return (
    <Stack gap={10} maxW='254px' w='100%' height='100vh' padding='40px 0 40px'>
      <Box paddingLeft='32px'>
        <Logo icon={<LogoIcon />} src='/' />
      </Box>
      <Stack gap={2}>
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.id] || DashboardIcon
          return (
            <NavItem
              key={item.id}
              icon={<Icon />}
              title={item.title}
              isActive={activeNavItem === item.id}
              to={item.path}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}

export default Sidebar
