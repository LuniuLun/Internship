import { Routes, Route } from 'react-router-dom'
import DefaultLayout from '@layout'
import Dashboard from '@pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
