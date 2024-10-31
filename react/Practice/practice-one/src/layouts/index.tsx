import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { Content, Wrapper } from './Layout.styled'

const DefaultLayout = () => {
  return (
    <Wrapper>
      <Content>
        <Header />
        <Outlet />
      </Content>
    </Wrapper>
  )
}
export default DefaultLayout
