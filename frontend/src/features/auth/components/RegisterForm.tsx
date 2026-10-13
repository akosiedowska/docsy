import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from '@tanstack/react-router'
import { Anchor, Alert, Button, Center, Paper, Stack, Text, TextInput, Title } from '@mantine/core'
import { CircleAlert } from 'lucide-react'

import { useRegister } from '../hooks/useRegister'
import { signupSchema, type SignupFormValues } from '../schemas'
import type { RegisterPayload } from '../types'
import { useLogin } from '../hooks/useLogin'

const signupFields: readonly (keyof SignupFormValues)[] = [
  'firstName',
  'lastName',
  'email',
  'password',
  'confirmPassword',
]

const isSignupField = (field: string): field is keyof SignupFormValues => {
  return (signupFields as readonly string[]).includes(field)
}

export const RegisterForm = () => {
  const navigate = useNavigate()
  const { mutate: signup, isPending, error } = useRegister()
  const { mutate: login } = useLogin()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormValues>({ resolver: zodResolver(signupSchema) })

  const onSubmit = (values: SignupFormValues) => {
    const payload: RegisterPayload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    }
    signup(payload, {
      onSuccess: () => {
        login({ email: values.email, password: values.password })
        // navigate('/dashboard')
        navigate({ to: '/dashboard' })
      },
      onError: (err) => {
        const issues = err.response?.data?.issues ?? []
        issues.forEach((issue) => {
          const field = issue.instancePath.replace(/^\//, '')
          if (isSignupField(field)) {
            setError(field, { message: issue.message })
          }
        })
      },
    })
  }

  const hasFieldIssues = (error?.response?.data?.issues?.length ?? 0) > 0

  return (
    <Center flex={1}>
      <Paper p='xl' w='100%' maw={400} withBorder>
        <Title order={1} size={24} ta='center' fw='600' mb='12'>
          Sign up
        </Title>
        <Stack component='form' onSubmit={handleSubmit(onSubmit)}>
          {error && !hasFieldIssues && (
            <Alert variant='light' color='red' icon={<CircleAlert />}>
              {error.response?.data?.message ?? 'Could not create account. Please try again.'}
            </Alert>
          )}
          <TextInput
            placeholder='First name'
            size='md'
            error={errors.firstName?.message}
            {...register('firstName')}
          />
          <TextInput
            placeholder='Last name'
            size='md'
            error={errors.lastName?.message}
            {...register('lastName')}
          />
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
          <TextInput
            placeholder='Confirm password'
            size='md'
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
            type='password'
          />
          <Button type='submit' disabled={isPending} color='lime.4' c='lime.9'>
            {isPending ? 'Creating account...' : 'Sign up'}
          </Button>
          <Text ta='center'>
            Already have an account?{' '}
            <Anchor component={Link} to='/'>
              Log in
            </Anchor>
          </Text>
        </Stack>
      </Paper>
    </Center>
  )
}
