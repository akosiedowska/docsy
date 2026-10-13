import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Group, Select } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

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
    clearErrors,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(specializationSchema),
    defaultValues: { specialization: '' },
    reValidateMode: 'onSubmit',
  })

  const { data: availableSlots, isFetching, isError } = useAvailableSlots(searchedSpecialization)

  const isMobile = useMediaQuery('(max-width: 692px)')

  const onSubmit = (values: ReservationFormValues) => {
    setSearchedSpecialization(values.specialization)
  }

  return (
    <>
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <Group align='end' justify='center' gap={isMobile ? 'sm' : 'xl'}>
          <Controller
            name='specialization'
            control={control}
            render={({ field }) => (
              <Select
                label='Specialization'
                placeholder='Select specialization'
                data={specializations ?? []}
                value={field.value || null}
                onChange={(value) => {
                  field.onChange(value ?? '')
                  clearErrors('specialization')
                  if (value !== searchedSpecialization) setSearchedSpecialization(undefined)
                }}
                onBlur={field.onBlur}
                error={errors.specialization?.message}
                nothingFoundMessage='No specializations found'
                w={isMobile ? '100%' : 500}
                autoSelectOnBlur
                allowDeselect={false}
                searchable
                clearable
              />
            )}
          />
          <Button type='submit' loading={isFetching} fullWidth={isMobile ? true : false}>
            Search
          </Button>
        </Group>
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
