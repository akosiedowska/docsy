import { Outlet } from 'react-router'
import Header from '../components/layout/Header'

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default AppLayout
