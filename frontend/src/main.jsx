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
import ErrorPage from './screens/ErrorPage.jsx'
import Login from './screens/Login.jsx'
import Registration from './screens/Registration.jsx'
import Profile from './screens/Profile.jsx'
import store from './store.js'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorPage />}>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/login' element={<Login />} />
      <Route path='/registration' element={<Registration />} />
      <Route path='/profile' element={<Profile />} />
      <Route />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </Provider>
)
