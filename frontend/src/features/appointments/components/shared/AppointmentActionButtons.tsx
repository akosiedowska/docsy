import { useState } from 'react'
import { Button, Group } from '@mantine/core'
import { CircleAlert } from 'lucide-react'

import { useCancelAppointment } from '../../hooks/useCancelAppoinment'
import AlertDialog from '../../../../components/ui/AlertDialog'
import type { Appointment } from '../../types'

type AppointmentActionButtonsProps = { appointment: Appointment }

const AppointmentActionButtons = ({ appointment }: AppointmentActionButtonsProps) => {
  const { mutate: cancelAppointment } = useCancelAppointment()
  const [openAlertDialog, setOpenDialog] = useState(false)

  const handleCloseAlertDialog = () => setOpenDialog(false)
  return (
    <>
      <Group justify='end'>
        <Button onClick={() => setOpenDialog(true)} variant='default'>
          Cancel
        </Button>
        {/* to be implemented */}
        {/* <Button>Reschedule</Button> */}
      </Group>
      <AlertDialog
        content='Are you sure you want to cancel the visit?'
        open={openAlertDialog}
        handleClose={handleCloseAlertDialog}
        confirmBtnText='Yes'
        closeBtnText='No'
        action={() => cancelAppointment(appointment.id)}
        icon={<CircleAlert />}
      />
    </>
  )
}

export default AppointmentActionButtons
