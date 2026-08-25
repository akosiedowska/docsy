import { useAuthStore } from '../../stores/authStore'

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user)
  return (
    <div>
      <p>USER</p>
      <p>first name: {user?.firstName}</p>
      <p>last name: {user?.lastName}</p>
      <p>email: {user?.email}</p>
      <p>account created: {user && new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  )
}

export default ProfilePage
