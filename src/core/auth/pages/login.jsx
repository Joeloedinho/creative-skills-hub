import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Link as MUILink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FullTitleElement } from "../../../shared";
import { Google, MusicNote } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AlertPopper } from "../../../shared";
import { useAuthContext } from "../contexts/authContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuthContext();

  return (
    <Stack
      className="auth-container"
      direction="column"
      spacing={0}
      alignItems="center"
      sx={{
        maxWidth: 400,
        margin: { xs: 0, md: 3 },
        height: { xs: "100vh", sm: "fit-content" },
        padding: 5,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 500, color: "#fff" }}>
        Log in to
      </Typography>
      <FullTitleElement />
      <Typography variant="h5" sx={{ fontWeight: 500, color: "#fff" }}>
        Account
      </Typography>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          login(values, setSubmitting);
        }}
      >
        {() => (
          <Form className="auth-form">
            <Field
              name="email"
              type="email"
              as={TextField}
              fullWidth
              id="email"
              label="Enter Email"
              variant="outlined"
              margin="normal"
              helperText={<ErrorMessage name="email" />}
            />

            <Field
              name="password"
              type="password"
              as={TextField}
              fullWidth
              id="password"
              label="Enter Password"
              variant="outlined"
              margin="normal"
              helperText={<ErrorMessage name="password" />}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
      <Button
        fullWidth
        variant="contained"
        sx={{ backgroundColor: "#fff", color: "#000", my: 2 }}
        startIcon={<Google color="error" />}
      >
        Continue with Google
      </Button>
      <MUILink
        component={Link}
        to="/auth/forgot-password"
        sx={{ margin: "10px", alignSelf: "start" }}
      >
        Forgot Password?
      </MUILink>
      <Divider sx={{ width: "100%", color: "#fff", opacity: 1, my: 2 }}>
        Or
      </Divider>
      <MUILink
        component={Link}
        to="/auth/register/student"
        sx={{ alignSelf: "center" }}
      >
        Create an account instead
      </MUILink>
    </Stack>
  );
};

export default LoginForm;