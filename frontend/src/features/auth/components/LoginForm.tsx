import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Anchor, Button, Center, Paper, Stack, Text, TextInput, Title } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { Info, CircleAlert } from 'lucide-react'

import { Route } from '../../../routes/index'
import { useLogin } from '../hooks/useLogin'
import { loginSchema, type LoginFormValues } from '../schemas'

export const LoginForm = () => {
  const navigate = useNavigate()
  const { redirect } = Route.useSearch()
  const { message } = useLocation().state

  const { mutate, isPending, error } = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = (values: LoginFormValues) => {
    mutate(values, {
      onSuccess: () => {
        navigate({ to: redirect ?? '/dashboard', replace: true })
      },
    })
  }

  return (
    <Center flex={1}>
      <Paper p='xl' w={400} withBorder>
        <Title order={1} size={24} ta='center' fw='600' mb='12'>
          Log in
        </Title>
        <Stack component='form' onSubmit={handleSubmit(onSubmit)}>
          {message && (
            <Alert variant='light' color='cyan' icon={<Info />}>
              {message}
            </Alert>
          )}
          {error && (
            <Alert variant='light' color='red' icon={<CircleAlert />}>
              {error.response?.data?.message ?? 'Something went wrong. Please try again.'}
            </Alert>
          )}
          <TextInput
            placeholder='Email'
            size='md'
            error={errors.email?.message}
            {...register('email')}
          />
          <TextInput
            placeholder='Password'
            size='md'
            error={errors.password?.message}
            {...register('password')}
            type='password'
          />
          <Button type='submit' disabled={isPending} color='lime.4' c='lime.9'>
            {isPending ? 'Logging in...' : 'Log in'}
          </Button>
          <Text ta='center'>
            Don&apos;t have an account?{' '}
            <Anchor component={Link} to='/register'>
              Sign up
            </Anchor>
          </Text>
        </Stack>
      </Paper>
    </Center>
  )
}
