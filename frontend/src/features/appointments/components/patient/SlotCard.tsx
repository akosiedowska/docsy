import { Box, Button, Stack, Typography } from '@mui/material'
import { Plus } from 'lucide-react'

import type { AvailableSlot } from '../../types'

const SlotCard = ({ slot }: { slot: AvailableSlot }) => {
  return (
    <Stack
      direction='row'
      sx={{ justifyContent: 'space-between', border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}
    >
      <Box>
        <Typography>
          Dr. {slot.doctor.user.firstName} {slot.doctor.user.lastName} — {slot.doctor.specialization}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {new Date(slot.date).toLocaleString()} · {slot.address}
        </Typography>
      </Box>
      <Box>
        <Button variant='contained' startIcon={<Plus />} sx={{ color: 'white' }}>
          Book
        </Button>
      </Box>
    </Stack>
  )
}

export default SlotCard
