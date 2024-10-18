import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout'
import Home from '../pages/Home'

const publicRoutes = [
  { path: '/', component: Home, layout: DefaultLayout },
  { path: '/:sort&&property&&q', component: Home, layout: DefaultLayout }
]
const privateRoutes = []

export { publicRoutes, privateRoutes }
