import { Outlet } from 'react-router-dom'
import { Flex, Stack } from '@chakra-ui/react'
import Header from '@layout/components/Header'
import Sidebar from '@layout/components/Sidebar'
import { ErrorBoundary } from '@components'

const DefaultLayout = () => {
  return (
    <ErrorBoundary>
      <Flex>
        <Sidebar />
        <Stack w={{ base: '100%', xl: 'calc(100% - 254px)' }} px={6} paddingBottom={6} bgColor='brand.grey'>
          <Header />
          <Outlet />
        </Stack>
      </Flex>
    </ErrorBoundary>
  )
}

export default DefaultLayout
