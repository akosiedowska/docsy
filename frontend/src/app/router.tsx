import { createBrowserRouter } from 'react-router'

import LoginPage from '../pages/auth/Loginpage'
import RegisterPage from '../pages/auth/RegisterPage'
import DashboardPage from '../pages/patient/DashboardPage'
import ErrorPage from '../pages/ErrorPage'
import AppLayout from '../layouts/AppLayout'
import { RequireAuth } from '../features/auth/components/RequireAuth'

const paths = {
  HOME: '/',
  LOGIN: 'login',
  REGISTER: 'register',
  DASHBOARD: 'dashboard',
}

export const router = createBrowserRouter([
  {
    path: paths.HOME,
    element: <AppLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          //   { path: paths.LOGIN, element: <LoginPage /> },
          { index: true, element: <LoginPage /> },
          { path: paths.REGISTER, element: <RegisterPage /> },
          {
            element: <RequireAuth />,
            children: [
              {
                path: paths.DASHBOARD,
                element: <DashboardPage />,
              },
            ],
          },
        ],
      },
    ],
  },
])
