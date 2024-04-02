import {
    Button,
    MenuItem,
    TextField,
  } from "@mui/material";
  import { ErrorMessage, Field, Form, Formik } from "formik";
  import * as Yup from "yup";

const EditorRegistrationForm = () => {
    
    return (
        <Formik
        initialValues={{
          fullname: "",
          gender: "",
          phone: "",
          yearsOfExperience: 0,
          skillLevel: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          fullname: Yup.string().trim().required("Name is required"),
          phone: Yup.string().trim().required("Phone is required"),
          gender: Yup.string().trim().required("Gender is required"),
          yearsOfExperience: Yup.number()
            .min(1, "At least 1 year of experience is required")
            .max(60, "Years of experience cannot be greater than 60"),
          skillLevel: Yup.string().trim().required("Skill Level is required"),
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
            console.log("Form values:", values);
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="auth-form" id="editor-form">
          <Field
            name="fullname"
            type="text"
            as={TextField}
            fullWidth
            id="fullname"
            label="Enter Full Name"
            variant="outlined"
            size="small"
            sx={{ margin: "10px 0" }}
            helperText={<ErrorMessage name="fullname" />}
          />
    
          <Field
            name="skillLevel"
            type="text"
            as={TextField}
            select
            fullWidth
            id="skillLevel"
            label="Select Skill level"
            variant="outlined"
            size="small"
            sx={{ margin: "10px 0" }}
            helperText={<ErrorMessage name="skillLevel" />}
          >
            <MenuItem value="" selected>Select Skill level</MenuItem>
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="amateur">Amateur</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
          </Field>
          <Field
            name="yearsOfExperience"
            type="number"
            min={0}
            as={TextField}
            fullWidth
            id="yearsOfExperience"
            size="small"
            label="Years of Experience"
            variant="outlined"
            sx={{ margin: "10px 0" }}
            helperText={<ErrorMessage name="yearsOfExperience" />}
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

export default EditorRegistrationForm;