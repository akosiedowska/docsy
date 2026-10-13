import { Stack, Text } from '@mantine/core'

import SlotCard from './SlotCard'
import type { AvailableSlot } from '../../types'
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner'

interface SlotListProps {
  availableSlots?: AvailableSlot[]
  isFetching: boolean
  isError: boolean
  searchedSpecialization?: string
}

const SlotList = ({
  availableSlots,
  isFetching,
  isError,
  searchedSpecialization,
}: SlotListProps) => {
  return (
    <>
      {isFetching && <LoadingSpinner />}

      {isError && <Text c='error'>Failed to load available slots.</Text>}

      {!isFetching && searchedSpecialization && availableSlots?.length === 0 && (
        <Text>No available slots found for {searchedSpecialization}.</Text>
      )}
      <Stack gap='md' mt='32'>
        {availableSlots?.map((slot) => (
          <SlotCard slot={slot} key={slot.id} />
        ))}
      </Stack>
    </>
  )
}

export default SlotList
