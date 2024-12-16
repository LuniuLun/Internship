import {
  DashboardIcon,
  DocumentIcon,
  GalleryIcon,
  HelpIcon,
  HierarchyIcon,
  LeaderboardIcon,
  LogoIcon,
  MessageIcon,
  SettingIcon
} from '@assets/icons'
import { Box, Stack } from '@chakra-ui/react'
import { Logo, NavItem } from '@components'

const Sidebar = () => {
  return (
    <Stack gap={10} maxW='254px' w='100%' height='100vh' padding='40px 0 40px'>
      <Box paddingLeft='32px'>
        <Logo icon={<LogoIcon />} src={'/'} />
      </Box>
      <Stack gap={2}>
        <NavItem icon={<DashboardIcon />} title='Dashboard' isActive={true} handleClick={() => {}} />
        <NavItem icon={<LeaderboardIcon />} title='Users' isActive={false} handleClick={() => {}} />
        <NavItem icon={<DocumentIcon />} title='Documents' isActive={false} handleClick={() => {}} />
        <NavItem icon={<GalleryIcon />} title='Photos' isActive={false} handleClick={() => {}} />
        <NavItem icon={<HierarchyIcon />} title='Hierarchy' isActive={false} handleClick={() => {}} />
        <NavItem icon={<MessageIcon />} title='Message' isActive={false} handleClick={() => {}} />
        <NavItem icon={<HelpIcon />} title='Help' isActive={false} handleClick={() => {}} />
        <NavItem icon={<SettingIcon />} title='Setting' isActive={false} handleClick={() => {}} />
      </Stack>
    </Stack>
  )
}

export default Sidebar
