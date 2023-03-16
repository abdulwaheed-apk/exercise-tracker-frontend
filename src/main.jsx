import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './app/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Activities from './pages/Activities'
import Welcome from './pages/Welcome'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NotFound from './components/NotFound'
import ExerciseByType from './components/ExerciseByType'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      { index: true, element: <Welcome /> },

      {
        path: 'activities',
        element: <Activities />,
      },
      {
        path: 'running',
        element: <ExerciseByType />,
      },
      {
        path: 'bicycling',
        element: <ExerciseByType />,
      },
      {
        path: 'swimming',
        element: <ExerciseByType />,
      },
      {
        path: 'hiking',
        element: <ExerciseByType />,
      },
      {
        path: 'walking',
        element: <ExerciseByType />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
  // </React.StrictMode>
)
