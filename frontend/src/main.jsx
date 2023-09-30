// external import
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

// internal import
import HomeScreen from './screens/HomeScreen.jsx'
import Feeds from './screens/Feeds.jsx'
import ErrorPage from './screens/ErrorPage.jsx'
import Login from './screens/Login.jsx'
import Registration from './screens/Registration.jsx'
import Profile from './screens/Profile.jsx'
import ProtectedRoute from './screens/ProtectedRoute.jsx'
import HomeProtectedRoute from './screens/HomeProtectedRoute.jsx'
import store from './store.js'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorPage />}>

      {/* Protected Routes */}
      <Route path='/' element={<HomeProtectedRoute />}>
        <Route path='/' element={<HomeScreen />} />
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/registration' element={<Registration />} />

      {/* Protected Routes */}
      <Route path='' element={< ProtectedRoute redirect={'/login'} />}>
        <Route path='/feeds' element={<Feeds />} />
        <Route path='/profile' element={<Profile />} />
      </Route >

    </Route >
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </Provider>
)
