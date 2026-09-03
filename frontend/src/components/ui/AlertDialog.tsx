import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material'
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
    <Dialog open={open} onClose={handleClose} role='alertdialog'>
      <DialogContent sx={{ display: 'flex', gap: 1 }}>
        {icon}
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleClose}>{closeBtnText ? closeBtnText : 'Cancel'}</Button>
        <Button onClick={action} autoFocus>
          {confirmBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog
