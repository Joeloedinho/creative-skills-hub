import {
    Button,
    MenuItem,
    TextField,
  } from "@mui/material";
  import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
  import * as Yup from "yup";

const StudentRegistrationForm = () => {
  const navigate = useNavigate();  

    return (
    <Formik
      initialValues={{
        fullname: "",
        gender: "",
        phone: "",
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        fullname: Yup.string().trim().required("Name is required"),
        phone: Yup.string().trim().required("Phone is required"),
        gender: Yup.string().trim().required("Gender is required"),
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
      <Form className="auth-form" id='student-form' autoComplete="off">
        <Field
          name="fullname"
          type="text"
          as={TextField}
          fullWidth
          id="fullname"
          size="small"
          label="Enter Full Name"
          variant="outlined"
          sx={{ margin: "10px 0" }}
          helperText={<ErrorMessage name="fullname" />}
        />
        <Field
          name="gender"
          type="text"
          as={TextField}
          select
          fullWidth
          id="gender"
          size="small"
          label="Select gender"
          variant="outlined"
          sx={{ margin: "10px 0" }}
          helperText={<ErrorMessage name="gender" />}
        >
          <MenuItem value="" disabled>Select gender</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Field>
  
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
          name="email"
          type="email"
          as={TextField}
          fullWidth
          id="email"
          label="Enter Email"
          size="small"
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
          label="Enter Password"
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

export default StudentRegistrationForm;