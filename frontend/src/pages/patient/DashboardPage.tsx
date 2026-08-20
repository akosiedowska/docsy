import { useAuthStore } from '../../stores/authStore'

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user)
  return (
    <div>
      <p>DashboardPage</p>
      <p>USER</p>
      <p>first name: {user?.firstName}</p>
      <p>last name: {user?.lastName}</p>
      <p>email: {user?.email}</p>
      <p>account created: {user?.createdAt}</p>
    </div>
  )
}

export default DashboardPage
