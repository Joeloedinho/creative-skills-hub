import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, InputAdornment, Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {PaymentModal} from "../../../shared";

const PaymentPage = ({data, setData, goBack}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    return (
        <Box sx={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}>
            <Stack direction={'row'} justifyContent={'center'}>
                <Button variant='contained' onClick={() => setIsOpen(true)}>Deposit Payment</Button>
            </Stack>
            <PaymentModal isSending={true} isOpen={isOpen} handleClose={() => setIsOpen(false)} title="Deposit Project Budget" amount={data.price}/>
        </Box>
    );
};

export default PaymentPage;
