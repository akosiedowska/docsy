// src/components/ui/UserAvatar.tsx
import { styled } from '@mui/material/styles'
import { Avatar, type AvatarProps } from '@mui/material'

export const UserAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  border: `2px solid ${theme.palette.primary.main}`,
}))
