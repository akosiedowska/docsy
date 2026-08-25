import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material'

export const Appointment = () => {
  return (
    <Card sx={{ width: 400 }}>
      <CardContent>
        <Stack
          direction='row'
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack>
            <Typography>Doctor type</Typography>
            <Typography>Doctor name</Typography>
            <Typography>Adress</Typography>
          </Stack>
          <Stack>
            <Typography>Hour</Typography>
            <Typography>Date</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'end' }}>
        <Button>Cancel</Button>
        <Button>Reschedule</Button>
      </CardActions>
    </Card>
  )
}
