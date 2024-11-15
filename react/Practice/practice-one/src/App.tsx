import { Routes, Route } from 'react-router-dom'
import DefaultLayout from './layouts'
import Home from './pages/Home'
import { ToastProvider } from '@components'

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </ToastProvider>
  )
}

export default App
