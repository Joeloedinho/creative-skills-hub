import {
    Button,
    MenuItem,
    TextField,
  } from "@mui/material";
  import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
  import * as Yup from "yup";

const ClientRegistrationForm = () => {
    const navigate = useNavigate()
    return (
      <Formik
      initialValues={{
        clientType: "",
        fullname: "",
        phone: "",
        address: "",
        website: "",
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        clientType: Yup.string().trim().required("Field is required"),
        fullname: Yup.string().trim().required("Name is required"),
        phone: Yup.string().trim().required("Phone is required"),
        email: Yup.string()
          .trim()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .trim()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // Handle form submission, e.g., sending data to server
          setSubmitting(false);
          navigate("/auth/verify-email");
        }, 400);
      }}
    >
      <Form className="auth-form" id="client-form">
        <Field 
          name="clientType"
          as={TextField}
          fullWidth
          id="clientType"
          label="Individual or Organisation"
          variant="outlined"
          select
          size="small"
          sx={{ margin: "10px 0" }}
          helperText={<ErrorMessage name="clientType" />}
        >
          <MenuItem value="" disabled>Individual or Organisation</MenuItem>
          <MenuItem value="beginner">Individual</MenuItem>
          <MenuItem value="amateur">Organisation</MenuItem>
        </Field>
        <Field
          name="fullname"
          type="text"
          as={TextField}
          fullWidth
          id="fullname"
          size="small"
          label="What is your (business) name?"
          variant="outlined"
          sx={{ margin: "10px 0" }}
          helperText={<ErrorMessage name="fullname" />}
        />
        <Field
          name="phone"
          type="tel"
          as={TextField}
          fullWidth
          id="phone"
          size="small"
          label="Enter Phone Number"
          variant="outlined"
          sx={{ margin: "10px 0" }}
          helperText={<ErrorMessage name="phone" />}
        />
        <Field
          name="address"
          type="text"
          as={TextField}
          fullWidth
          id="address"
          size="small"
          label="Enter address"
          variant="outlined"
          sx={{ margin: "10px 0" }}
        />
        <Field
          name="website"
          type="url"
          as={TextField}
          fullWidth
          id="website"
          size="small"
          label="Enter website url"
          variant="outlined"
          sx={{ margin: "10px 0" }}
        />
        <Field
          name="email"
          type="email"
          as={TextField}
          fullWidth
          id="email"
          size="small"
          label="Enter email"
          variant="outlined"
          sx={{ margin: "10px 0" }}
          helperText={<ErrorMessage name="email" />}
        />
        <Field
          name="password"
          type="password"
          as={TextField}
          fullWidth
          id="password"
          size="small"
          label="Enter password"
          variant="outlined"
          sx={{ margin: "10px 0" }}
          helperText={<ErrorMessage name="password" />}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </Form>
    </Formik>)
}

export default ClientRegistrationForm;