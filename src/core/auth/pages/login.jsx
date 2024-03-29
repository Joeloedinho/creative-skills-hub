import { Box, Button, Divider, Link, Stack, TextField, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FullTitleElement, routePaths } from "../../../shared";
import { Google } from "@mui/icons-material";

const LoginForm = () => {
  return (
    <Stack className="auth-container" direction='column' spacing={0} alignItems='center' sx={{ maxWidth: 400, mx: "auto"}}>
        <Typography variant="h5" sx={{ fontWeight: 500, color: "#fff" }}>Log in to</Typography>
        <FullTitleElement />
        <Typography variant="h5" sx={{ fontWeight: 500, color: "#fff" }}>Account</Typography>
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
          setTimeout(() => {
            // Handle form submission, e.g., sending data to server
            console.log("Form values:", values);
            setSubmitting(false);
          }, 400);
        }}
      >
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
      </Formik>
        <Button fullWidth variant="contained" sx={{backgroundColor: '#fff', my: 2}}>Continue with <Google color='secondary'sx={{marginLeft: '2px'}}/>oogle</Button>
        <Link href="#" sx={{margin: '10px', alignSelf: 'start'}}>Forgot Password?</Link>
        <Divider sx={{width: '100%', color: '#fff', opacity: 1}}>Or</Divider>
        <Link href={routePaths.register} sx={{margin: '10px', alignSelf: 'start'}}>Create Account Instead</Link>
    </Stack>
  );
};

export default LoginForm;
