import { useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { Info, Plus } from 'lucide-react'

import type { AvailableSlot } from '../../types'
import { useBookAppointment } from '../../hooks/useBookAppointment'
import AlertDialog from '../../../../components/ui/AlertDialog'

const SlotCard = ({ slot }: { slot: AvailableSlot }) => {
  const { mutate: bookAppointment } = useBookAppointment()
  const [openAlertDialog, setOpenDialog] = useState(false)

  const handleCloseAlertDialog = () => setOpenDialog(false)

  return (
    <>
      <Stack
        direction='row'
        sx={{
          justifyContent: 'space-between',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 2,
        }}
      >
        <Box>
          <Typography>
            Dr. {slot.doctor.user.firstName} {slot.doctor.user.lastName} —{' '}
            {slot.doctor.specialization}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {new Date(slot.date).toLocaleString()} · {slot.address}
          </Typography>
        </Box>
        <Box>
          <Button
            variant='contained'
            startIcon={<Plus />}
            sx={{ color: 'white' }}
            onClick={() => setOpenDialog(true)}
          >
            Book
          </Button>
        </Box>
      </Stack>
      <AlertDialog
        content={`Confirm booking the visit: 
          ${slot.doctor.user.firstName} ${slot.doctor.user.lastName} 
          on ${new Date(slot.date).toLocaleString()}`}
        open={openAlertDialog}
        handleClose={handleCloseAlertDialog}
        confirmBtnText='Confirm'
        closeBtnText='Cancel'
        action={() => bookAppointment({ slotId: slot.id })}
        icon={<Info />}
      />
    </>
  )
}

export default SlotCard
