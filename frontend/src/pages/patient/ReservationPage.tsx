import { zodResolver } from '@hookform/resolvers/zod'
import { Autocomplete, Box, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSpecializations } from '../../features/appointments/hooks/useSpecializations'
import { useEffect } from 'react'

const specializationSchema = z.object({
  specialization: z.string().min(1, 'Select a specialization'),
})

type ReservationFormValues = z.infer<typeof specializationSchema>

const ReservationPage = () => {
  const { data: specializations } = useSpecializations()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormValues>({ resolver: zodResolver(specializationSchema) })

  const onSubmit = (values: ReservationFormValues) => {
    return console.log('data', values)
  }

  useEffect(() => console.log('spec', specializations), [specializations])

  return (
    <>
      <div>ReservationPage</div>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              sx={{ minWidth: 240 }}
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
      </Box>
    </>
  )
}

export default ReservationPage
