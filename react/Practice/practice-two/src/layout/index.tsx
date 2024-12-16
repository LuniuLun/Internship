import { Outlet } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'
import Header from '@layout/components/Header'
import Sidebar from '@layout/components/Sidebar'

const DefaultLayout = () => {
  return (
    <Flex>
      <Sidebar />
      <Flex direction='column' w='100%' px={6} bgColor='brand.grey'>
        <Header />
        <Outlet />
      </Flex>
    </Flex>
  )
}
export default DefaultLayout
