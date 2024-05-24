import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, InputAdornment, Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PriceForm = ({data, setData, goBack}) => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      price: '',
    },
    validationSchema: Yup.object({
      price: Yup.string().required('Price is required'),
    }),
    onSubmit: (values) => {
        setData({...data, price: values.price});
        
        // TODO: Handle course upload
        // Course data
        /*
            title: text
            description: text
            level: text
            categories list of text
            imageFile: file
            overview: text 
            price: text
            lessons: list of lessons
            lessons: {
                title: text
                description: text
                videoUpload: file
                videoLink: text
                videoType: text (link or upload)
                attachmentLink: text
                duration: text
            }
        */

        // for price, its preferable you use values.price rather than data.price
        navigate('/admin/courses')
    },
  });

  const formatPrice = (value) => {
    const formattedValue = value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    formik.setFieldValue('price', formattedValue);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}>
        <Typography variant="h4" gutterBottom>
          Add Price and Upload
        </Typography>
        <form onSubmit={formik.handleSubmit}>
      <TextField
        name="price"
        label="Price"
        fullWidth
        value={formik.values.price}
        onChange={(e) => formatPrice(e.target.value)}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
        InputProps={{
          endAdornment: <InputAdornment position="end">FCFA</InputAdornment>,
        }}
      />
      <Stack sx={{marginTop: 10}} direction="row" justifyContent='space-between'>
        <Button variant="text" onClick={goBack}>
          Back
        </Button>
        <Button type="submit" variant="contained">
          Upload Course
        </Button>
      </Stack>
    </form>
    </Box>
  );
};

export default PriceForm;
