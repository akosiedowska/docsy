import { zodResolver } from '@hookform/resolvers/zod'
import { Autocomplete, Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { useSpecializations } from '../../features/appointments/hooks/useSpecializations'
import { useAvailableSlots } from '../../features/appointments/hooks/useGetAvailableSlots'

const specializationSchema = z.object({
  specialization: z.string().min(1, 'Select a specialization'),
})

type ReservationFormValues = z.infer<typeof specializationSchema>

const ReservationPage = () => {
  const { data: specializations } = useSpecializations()
  const [searchedSpecialization, setSearchedSpecialization] = useState<string>()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormValues>({ resolver: zodResolver(specializationSchema) })

  const {
    data: availableSlots,
    isFetching,
    isError,
  } = useAvailableSlots(searchedSpecialization)

  const onSubmit = (values: ReservationFormValues) => {
    setSearchedSpecialization(values.specialization)
  }

  return (
    <>
      <div>ReservationPage</div>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Stack direction='row' sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
          <Controller
            name='specialization'
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <Autocomplete
                options={specializations ?? []}
                value={field.value ?? null}
                onChange={(_, value) => field.onChange(value)}
                onBlur={field.onBlur}
                sx={{ minWidth: 500 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Specialization'
                    error={!!errors.specialization}
                    helperText={errors.specialization?.message}
                  />
                )}
              />
            )}
          />
          <Button type='submit' variant='contained'>
            Search
          </Button>
        </Stack>
      </Box>

      {isFetching && <CircularProgress sx={{ mt: 2 }} />}

      {isError && <Typography color='error'>Failed to load available slots.</Typography>}

      {!isFetching && searchedSpecialization && availableSlots?.length === 0 && (
        <Typography>No available slots found for {searchedSpecialization}.</Typography>
      )}

      <Stack sx={{ mt: 2, gap: 1 }}>
        {availableSlots?.map((slot) => (
          <Box key={slot.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
            <Typography>
              Dr. {slot.doctor.user.firstName} {slot.doctor.user.lastName} — {slot.doctor.specialization}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {new Date(slot.date).toLocaleString()} · {slot.address}
            </Typography>
          </Box>
        ))}
      </Stack>
    </>
  )
}

export default ReservationPage
