import { Routes, Route } from 'react-router-dom'
import DefaultLayout from '@layout'
import Dashboard from '@pages/Dashboard'
import Users from '@pages/Users'
import ProtectedRoute from './routes/ProtectedRoute'
import { authStore } from '@stores'

function App() {
  const { user } = authStore()

  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
        <Route
          element={<ProtectedRoute isAllowed={!!user} userRoles={user?.roles} requiredRole='admin' redirectPath='/' />}
        >
          <Route path='users' element={<Users />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
