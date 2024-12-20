import { Routes, Route } from 'react-router-dom'
import DefaultLayout from '@layout'
import Dashboard from '@pages/Dashboard'
import Users from '@pages/Users'

function App() {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='users' element={<Users />} />
      </Route>
    </Routes>
  )
}

export default App
