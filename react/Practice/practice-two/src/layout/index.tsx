import { Outlet } from 'react-router-dom'
import { Flex, Stack } from '@chakra-ui/react'
import Header from '@layout/components/Header'
import Sidebar from '@layout/components/Sidebar'

const DefaultLayout = () => {
  return (
    <Flex>
      <Sidebar />
      <Stack w='100%' px={6} bgColor='brand.grey'>
        <Header />
        <Outlet />
      </Stack>
    </Flex>
  )
}

export default DefaultLayout
