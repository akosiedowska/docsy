import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router";

import { useRegister } from "../hooks/useRegister";
import { signupSchema, type SignupFormValues } from "../schemas";
import type { RegisterPayload } from "../types";

export function RegisterForm() {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({ resolver: zodResolver(signupSchema) });

  const onSubmit = (values: SignupFormValues) => {
    const payload: RegisterPayload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };
    mutate(payload, { onSuccess: () => navigate("/") });
  };

  return (
    <Paper elevation={2} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Sign up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {error && <Alert severity="error">Could not create account. Please try again.</Alert>}
        <TextField
          label="First name"
          autoComplete="given-name"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          {...register("firstName")}
        />
        <TextField
          label="Last name"
          autoComplete="family-name"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          {...register("lastName")}
        />
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="new-password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
        />
        <TextField
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? "Creating account..." : "Sign up"}
        </Button>
        <Typography variant="body2">
          Already have an account? <Link component={RouterLink} to="/">Log in</Link>
        </Typography>
      </Box>
    </Paper>
  );
}
