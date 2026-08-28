import { Box, Typography } from '@mui/material'
import type { AvailableSlot } from '../../types'

const SlotCard = ({ slot }: { slot: AvailableSlot }) => {
  return (
    <Box key={slot.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
      <Typography>
        Dr. {slot.doctor.user.firstName} {slot.doctor.user.lastName} — {slot.doctor.specialization}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        {new Date(slot.date).toLocaleString()} · {slot.address}
      </Typography>
    </Box>
  )
}

export default SlotCard
