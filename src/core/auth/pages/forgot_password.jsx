import React, { useState } from 'react';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FullTitleElement } from '../../../shared';
import VerificationInput from 'react-verification-input';

export default function ForgotPassword(){
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  return (
    <Stack
      className="auth-container verification-container"
      direction="column"
      spacing={3}
      alignItems="center"
      sx={{ maxWidth: 800, mx: 'auto', height: 'fit-content' }}
    >
      <FullTitleElement />
      {[
        <EnterEmail setIndex={setIndex} />,
        <SelectAccount setIndex={setIndex} />,
        <VerifyEmail setIndex={setIndex} />,
        <ResetPassword />,
      ][index]}
    </Stack>
  );
};

const EnterEmail = ({ setIndex }) => {
  return (
    <Stack>
      <Typography sx={{ color: '#fff' }}>Please enter the email your account is associated with</Typography>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string().trim().email('Invalid email address').required('Email is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            setIndex((prev) => prev + 1);
          }, 400);
        }}
      >
        <Form className="auth-form" id="client-form" noValidate>
          <Field
            name="email"
            type="email"
            as={TextField}
            fullWidth
            id="email"
            size="small"
            label="Enter email"
            variant="outlined"
            sx={{ margin: '10px 0' }}
            helperText={<ErrorMessage name="email" />}
          />
          <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Continue
          </Button>
        </Form>
      </Formik>
    </Stack>
  );
};

const SelectAccount = ({ setIndex }) => {
  return (
    <Stack sx={{width: '100%'}}>
      <Typography sx={{ color: '#fff', mb: 2 }}>Select the account</Typography>
      <Paper sx={{backgroundColor: 'rgba(12, 56, 198, 0.15) !important'}}>
        <Button onClick={() => setIndex((prev) => prev + 1)} fullWidth>
          <Stack>
            <Typography variant="body1" align="left">
              Mbah Lesky
            </Typography>
            <Typography variant="caption" align="left">
              mbahlesky2@gmail.com
            </Typography>
          </Stack>
        </Button>
      </Paper>
    </Stack>
  );
};

const VerifyEmail = ({ setIndex }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (value) => {
    console.log(value);
    setVerificationCode(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(verificationCode);
    if (verificationCode === '') {
      setErrorMessage('Please enter the verification code');
    } else {
      if (verificationCode === '123456') {
        setIndex((prev) => prev + 1);
        // Verification success
      } else {
        setErrorMessage('Please enter the correct verification code');
      }
    }
  };

  return (
    <Stack spacing={2}>
      <Typography sx={{ color: '#fff' }}>Verify the email address you entered: johnmary@gmail.com</Typography>
      <form onSubmit={handleSubmit}>
        <VerificationInput
          onChange={(value) => handleChange(value)}
          id="verification-code"
          length={6}
          validChars="0-9"
          container={{ className: 'characters' }}
          character={{
            className: 'character',
            classNameInactive: 'character--inactive',
            classNameSelected: 'character--selected',
          }}
        />
        <Typography color="error" sx={{ marginTop: '15px' }}>
          {errorMessage}
        </Typography>
        <Button size="large" type="submit" variant="contained" sx={{ mt: 2 }}>
          Verify
        </Button>
      </form>
    </Stack>
  );
};

const ResetPassword = () => {
  const navigate = useNavigate();
  return (
    <Stack>
      <Typography sx={{ color: '#fff' }}>Change Password</Typography>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object({
          password: Yup.string().trim().min(8, 'Minimum length of password is 8 characters').required('Password is required'),
          confirmPassword: Yup.string()
            .trim()
            .oneOf([Yup.ref('password'), null], "Password doesn't match")
            .required('Re-type your password'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            navigate('/');
          }, 400);
        }}
      >
        <Form className="auth-form" noValidate>
          <Field
            name="password"
            type="password"
            as={TextField}
            fullWidth
            id="password"
            size="password"
            label="Enter New Password"
            variant="outlined"
            sx={{ margin: '10px 0' }}
            helperText={<ErrorMessage name="password" />}
          />
          <Field
            name="confirmPassword"
            type="password"
            as={TextField}
            fullWidth
            id="confirmPassword"
            size="password"
            label="Retype Password"
          variant="outlined"
          sx={{ margin: "10px 0" }}
          helperText={<ErrorMessage name="confirmPassword" />}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Change Password
        </Button>
      </Form>
    </Formik>
  </Stack>
  )
}