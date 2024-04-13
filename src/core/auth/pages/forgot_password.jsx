import React, { useState } from 'react';
import { Avatar, Badge, Button, Paper, Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AlertPopper, FullTitleElement } from '../../../shared';
import VerificationInput from 'react-verification-input';

import axios from 'axios';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [processResponse, setProcessResponse] = useState({
    show: false,
    type: "success",
    message: "",
  });


  return (
    <Stack
      className="auth-container verification-container"
      direction="column"
      spacing={3}
      alignItems="center"
      sx={{ maxWidth: 800, mx: 'auto', height: 'fit-content' }}
    >
      <FullTitleElement />
      <Stepper activeStep={index} alternativeLabel={{xs: true, md: false}}>
        {
          ['Enter Email', 'Select Account', 'Verify Email', 'Reset Password'].map(label => <Step>
            <StepLabel><Typography sx={{color: '#fff'}}>{label}</Typography></StepLabel>
          </Step>)
        }
      </Stepper>
      {[
        <EnterEmail key="enterEmail" setIndex={setIndex} setEmail={setEmail} setResponse={setProcessResponse}/>,
        <SelectAccount key="selectAccount" setIndex={setIndex} email={email} />,
        <VerifyEmail key="verifyEmail" setIndex={setIndex} email={email} />,
        <ResetPassword key="resetPassword" email={email} navigate={navigate} setResponse={setProcessResponse}/>,
      ][index]}
      <AlertPopper showAlert={processResponse.show} handleClose={() => setProcessResponse({...processResponse, show: false})} alertType={processResponse.type}>{processResponse.message}</AlertPopper>
    </Stack>
  );
};

const EnterEmail = ({ setIndex, setEmail, setResponse }) => { 
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
          setEmail(values.email); 
          axios.post('http://localhost:4000/auth/request_reset', { email: values.email })
            .then(response => {
              console.log(response.data.message);
              setIndex((prev) => prev + 1); 
            })
            .catch(error => {
              console.error('Error:', error.response.data.message);
              // alert('Error: ' + error.response.data.message); 
              setResponse({
                type: 'error',
                show: true,
                message: 'Error: ' + error.response.data.message,
              })
            })
            .finally(() => setSubmitting(false));
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
const SelectAccount = ({ setIndex, email }) => {
  return (
    <Stack sx={{width: '100%'}}>
      <Typography sx={{ color: '#fff', mb: 2 }}>Select the account</Typography>
      <Paper sx={{backgroundColor: 'rgba(12, 56, 198, 0.15) !important'}}>
        <Button onClick={() => setIndex((prev) => prev + 1)} fullWidth>
          <Stack>
            <Typography variant="body1" align="left">
              Selected Account
            </Typography>
            <Typography variant="caption" align="left">
              {email} {}
            </Typography>
          </Stack>
        </Button>
      </Paper>
    </Stack>
  );
};

const VerifyEmail = ({ setIndex, email }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  
  const handleChange = (value) => {
    setVerificationCode(value); 
    setErrorMessage(''); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!verificationCode) {
      setErrorMessage('Please enter the verification code');
      return;
    }
    axios.post('http://localhost:4000/auth/verify_reset_code', { email, verificationCode })
      .then(response => {
        console.log(response.data.message);
       
        localStorage.setItem('resetToken', response.data.token); 
        setIndex((prev) => prev + 1); 
      })
      .catch(error => {
        console.error('Verification failed:', error.response.data.message);
        setErrorMessage('Verification failed. Please try again.');
      });
  };

  return (
    <Stack spacing={2}>
      <Typography sx={{ color: '#fff' }}>Verify the email address you entered: {email}</Typography>
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

const ResetPassword = ({response, setResponse}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('resetToken');
  return (
    <Stack sx={{maxWidth: 400}}>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        onSubmit={(values, { setSubmitting }) => {
      
          axios.post('http://localhost:4000/auth/reset', { 
            token, 
            newPassword: values.password 
          })
          .then(response => {
            console.log(response.data.message);
            localStorage.removeItem('resetToken'); 
            // alert('password reset successful!! click ok to navigate to login page');
            setResponse({
              type: 'success',
              show: 'true',
              message: 'password reset successful',
            })
            setTimeout(() => {
              setResponse(prev => ({...prev, show: false}))
              navigate('/auth/login');
            }, 1000)
          })
          .catch(error => {
            console.error('Error resetting password:', error.response.data.message);
            setResponse({
              type: 'error',
              show: 'error',
              message: 'Error resetting password: ' + error.response.data.message,
            })
          })
          .finally(() => setSubmitting(false));
        }}
        >
        <Form className="auth-form" noValidate>
          <Field
            name="password"
            type="password"
            as={TextField}
            fullWidth
            id="password"
            size="small"
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
            size="small"
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