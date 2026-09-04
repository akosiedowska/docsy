import { createBrowserRouter } from 'react-router'

import LoginPage from '../pages/auth/Loginpage'
import RegisterPage from '../pages/auth/RegisterPage'
import DashboardPage from '../pages/patient/DashboardPage'
import ErrorPage from '../pages/ErrorPage'
import AppLayout from '../layouts/AppLayout'
import { AuthGuard } from '../features/auth/components/AuthGuard'
import ReservationPage from '../pages/patient/ReservationPage'
import ProfilePage from '../pages/patient/ProfilePage'
import NotFoundPage from '../pages/NotFoundPage'

export const paths = {
  HOME: '/',
  LOGIN: 'login',
  REGISTER: 'register',
  DASHBOARD: 'dashboard',
  RESERVATION: 'reservation',
  PROFILE: 'profile',
}

export const router = createBrowserRouter([
  {
    path: paths.HOME,
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            element: <AuthGuard mode='guest' />,
            children: [
              //   { path: paths.LOGIN, element: <LoginPage /> },
              { index: true, element: <LoginPage /> },
              { path: paths.REGISTER, element: <RegisterPage /> },
            ],
          },
          {
            element: <AuthGuard mode='protected' />,
            children: [
              {
                path: paths.DASHBOARD,
                element: <DashboardPage />,
              },
              {
                path: paths.RESERVATION,
                element: <ReservationPage />,
              },
              {
                path: paths.PROFILE,
                element: <ProfilePage />,
              },
            ],
          },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
])
