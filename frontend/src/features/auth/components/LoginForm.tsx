import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link as RouterLink, type Location, useLocation, useNavigate } from "react-router";

import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginFormValues } from "../schemas";


export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = (location.state as { from?: Location } | null) ?? {};
  const [message, setMessage] = useState(() => {
    const msg = sessionStorage.getItem("authMessage");
    sessionStorage.removeItem("authMessage");
    return msg;
  });

  const { mutate, isPending, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (values: LoginFormValues) => {
    setMessage(null)
    mutate(values, {
      onSuccess: () => {
        const redirectTo = from ? `${from.pathname}${from.search}` : '/dashboard'
        navigate(redirectTo, { replace: true })
      },
    })
  }

  return (
    <Paper elevation={2} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Log in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {message && <Alert severity="info">{message}</Alert>}
        {error && (
          <Alert severity="error">
            {error.response?.data?.message ?? "Something went wrong. Please try again."}
          </Alert>
        )}
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
          autoComplete="current-password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? "Logging in..." : "Log in"}
        </Button>
        <Typography variant="body2">
          Don&apos;t have an account? <Link component={RouterLink} to="/register">Sign up</Link>
        </Typography>
      </Box>
    </Paper>
  );
}
