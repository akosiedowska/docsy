import { DataList, Paper } from '@mantine/core'

import { useAuthStore } from '../../../stores/authStore'

const ProfileDetails = () => {
  const user = useAuthStore((state) => state.user)

  return (
    <>
      <Paper p='xl' withBorder>
        <DataList orientation='horizontal' withDivider gap='16'>
          <DataList.Item>
            <DataList.ItemLabel>First name(s)</DataList.ItemLabel>
            <DataList.ItemValue>{user?.firstName}</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Last name</DataList.ItemLabel>
            <DataList.ItemValue>{user?.lastName}</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Email</DataList.ItemLabel>
            <DataList.ItemValue>{user?.email}</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Account created</DataList.ItemLabel>
            <DataList.ItemValue>
              {user && new Date(user.createdAt).toLocaleDateString()}
            </DataList.ItemValue>
          </DataList.Item>
        </DataList>
      </Paper>
    </>
  )
}

export default ProfileDetails
