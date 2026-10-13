// import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import { Box, Button, Group, Modal, Stack, Text } from '@mantine/core'
import { type ReactNode } from 'react'

interface AlertDialogProps {
  content: string
  confirmBtnText: string
  closeBtnText?: string
  action: () => void
  handleClose: () => void
  open: boolean
  icon?: ReactNode
}

const AlertDialog = ({
  content,
  confirmBtnText,
  closeBtnText,
  action,
  open,
  handleClose,
  icon,
}: AlertDialogProps) => {
  return (
    <Modal opened={open} onClose={handleClose} centered>
      <Stack gap='md' align='center'>
        <Group gap='xs' wrap='nowrap' align='center'>
          <Box w={30} style={{ flexShrink: 0 }}>{icon}</Box>
          <Text textWrap='wrap'>{content}</Text>
        </Group>
        <Group justify='center' gap='xl'>
          <Button onClick={handleClose}>{closeBtnText ? closeBtnText : 'Cancel'}</Button>
          <Button onClick={action} variant='outline'>
            {confirmBtnText}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}

export default AlertDialog
