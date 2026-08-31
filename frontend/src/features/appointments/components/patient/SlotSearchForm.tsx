import { zodResolver } from '@hookform/resolvers/zod'
import { Autocomplete, Box, Button, Stack, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'

import { useSpecializations } from '../../hooks/useSpecializations'
import { useAvailableSlots } from '../../hooks/useAvailableSlots'
import SlotList from './SlotList'

const specializationSchema = z.object({
  specialization: z.string().min(1, 'Select a specialization'),
})

type ReservationFormValues = z.infer<typeof specializationSchema>

const SlotSearchForm = () => {
  const { data: specializations } = useSpecializations()
  const [searchedSpecialization, setSearchedSpecialization] = useState<string>()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormValues>({ resolver: zodResolver(specializationSchema) })

  const { data: availableSlots, isFetching, isError } = useAvailableSlots(searchedSpecialization)

  const onSubmit = (values: ReservationFormValues) => {
    setSearchedSpecialization(values.specialization)
  }

  return (
    <>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Stack direction='row' sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
          <Controller
            name='specialization'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Autocomplete
                options={specializations ?? []}
                value={field.value ?? null}
                onChange={(_, value) => field.onChange(value ?? '')}
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

      <SlotList
        availableSlots={availableSlots}
        isFetching={isFetching}
        isError={isError}
        searchedSpecialization={searchedSpecialization}
      />
    </>
  )
}

export default SlotSearchForm
