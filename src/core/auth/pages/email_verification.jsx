import { Button, Stack, Typography, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import VerificationInput from "react-verification-input";
import { FullTitleElement } from "../../../shared";
import axios from 'axios';
import { useAuthContext } from "../contexts/authContext";

function EmailVerification() {
    const navigate = useNavigate();
    const location = useLocation();
    const { verifyEmail } = useAuthContext()
    const [verificationCode, setVerificationCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false); // State for Snackbar visibility

    console.log("Verification page state:", location.state);
    const { email: userEmail, userType } = location.state; // Retrieve the user's email passed from the previous page

    const handleChange = (value) => {
        setVerificationCode(value);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSuccess = () => {
        setOpen(true);
        setTimeout(() => {
            navigate(`/auth/login`);
        }, 2000); // Navigate after 2 seconds
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await verifyEmail(setLoading, userType, userEmail, verificationCode, handleSuccess, setErrorMessage);
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
                We sent a verification code to {userEmail ? userEmail : "your email address"}.
            </Typography>
            <form onSubmit={handleSubmit}>
                <VerificationInput 
                    onChange={handleChange}
                    id='verification-code'
                    length={6}
                    validChars="0-9"
                    container={{ className: "characters" }}
                    character={{
                        className: "character",
                        classNameInactive: "character--inactive",
                        classNameSelected: "character--selected",
                    }}
                />
                <Typography color='error' sx={{ marginTop: '15px' }}>{errorMessage}</Typography>
                <Stack direction='row' justifyContent='space-between' marginY={3}>
                    <Button size="large" variant="contained" onClick={() => navigate(-1)}>Back</Button>
                    <Button size="large" type="submit" variant="contained" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify'}
                    </Button>
                </Stack>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                message="Registration successful! Please login to continue."
            />
        </Stack>
    );
}

export default EmailVerification;