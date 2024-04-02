import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerificationInput from "react-verification-input";
import { FullTitleElement } from "../../../shared";

function EmailVerification() {
    const navigate = useNavigate()
    const [verificationCode, setVerificationCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (value) => {
        console.log(value);
        setVerificationCode(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(verificationCode);
        if (verificationCode === ""){
          setErrorMessage("Please enter the verification code");
        } else {
          if (verificationCode === "123456") {
            navigate('/student');
            // navigate('/admin');
            // navigate('/editor');
            // navigate('/client');
          } else {
          setErrorMessage("Please enter the correct verification code");
          }
        }
    }   
  return (
    <Stack
      className="auth-container verification-container"
      direction="column"
      spacing={3}
      alignItems="center"
      sx={{ maxWidth: 800, mx: "auto", height: "fit-content" }}
    >
      <FullTitleElement />
      <Typography sx={{ color: "#fff" }}>
        Verify the email address you entered: johnmary@gmail.com
      </Typography>
        <form onSubmit={handleSubmit}>
        <VerificationInput 
            onChange={value => handleChange(value)}
            id='verification-code'
            length={6}
            validChars="0-9"
            container={{className: "characters"}}
            character={{
                className: "character",
                classNameInactive: "character--inactive",
                classNameSelected: "character--selected",
            }}
        />
        <Typography color='error' sx={{marginTop: '15px'}}>{errorMessage}</Typography>
      <Stack direction='row' justifyContent='space-between' marginY={3}>
      <Button size="large" variant="contained" onClick={() => navigate(-1)}>Back</Button>
      <Button size="large" type="submit" variant="contained">Verify</Button>
      </Stack>
        </form>
    </Stack>
  );
}

export default EmailVerification;
