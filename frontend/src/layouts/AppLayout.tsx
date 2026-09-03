import { Outlet } from 'react-router'
import Header from '../components/layout/Header'
import { Container } from '@mui/material'

const AppLayout = () => {
  return (
    <>
      <Header />
      <Container sx={{ p: 4 }}>
        <Outlet />
      </Container>
    </>
  )
}

export default AppLayout
