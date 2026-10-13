import { useState } from 'react'
import { Box, Button, Card, Flex, Group, Text } from '@mantine/core'
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
      <Card padding='18' withBorder lh={1} orientation='horizontal'>
        <Card.Section bg='lime.1' px='8'>
          <Flex align='center' justify='center' w='100%' h='100%'>
            <Text c='lime.9' fw='600'>
              {new Date(slot.date).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </Text>
          </Flex>
        </Card.Section>
        <Card.Section inheritPadding px='18' flex={1}>
          <Group justify='space-between'>
            <Box>
              <Group gap='2'>
                <Text fw='600'>
                  Dr. {slot.doctor.user.firstName} {slot.doctor.user.lastName}
                </Text>
                {/* -<Text>{slot.doctor.specialization}</Text> */}
              </Group>
              <Text variant='body2' color='text.secondary'>
                {new Date(slot.date).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })}{' '}
                · {slot.address}
              </Text>
            </Box>
            <Box>
              <Button leftSection={<Plus />} onClick={() => setOpenDialog(true)} variant='light'>
                Book
              </Button>
            </Box>
          </Group>
        </Card.Section>
      </Card>
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
