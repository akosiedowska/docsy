import { CircularProgress, Stack, Typography } from '@mui/material'

import SlotCard from './SlotCard'
import type { AvailableSlot } from '../../types'

interface SlotListProps {
  availableSlots?: AvailableSlot[]
  isFetching: boolean
  isError: boolean
  searchedSpecialization?: string
}

const SlotList = ({ availableSlots, isFetching, isError, searchedSpecialization }: SlotListProps) => {
  return (
    <>
      {isFetching && <CircularProgress sx={{ mt: 2 }} />}

      {isError && <Typography color='error'>Failed to load available slots.</Typography>}

      {!isFetching && searchedSpecialization && availableSlots?.length === 0 && (
        <Typography>No available slots found for {searchedSpecialization}.</Typography>
      )}
      <Stack sx={{ mt: 2, gap: 1 }}>
        {availableSlots?.map((slot) => (
          <SlotCard slot={slot} key={slot.id} />
        ))}
      </Stack>
    </>
  )
}

export default SlotList
