import { RouterProvider } from '@tanstack/react-router'

import { AppProviders } from './app/providers'
import { router } from './app/router'

import '@fontsource-variable/inter/wght.css'
import './App.css'

const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}

export default App
