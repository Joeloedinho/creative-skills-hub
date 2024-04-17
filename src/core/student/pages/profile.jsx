import { Edit, Phone } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  Paper,
  useTheme,
  TextField,
  MenuItem,
  Button,
  Input,
  Table,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  TableHead,
  Stack,
  Tab,
  Tabs,
  AppBar
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';

//TODO : Fix validation errors not displaying

const ProfilePage = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary;
  const [isEditing, setIsEditing] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, number) => {
    setTabValue(number);
  };

  const handleChangeIndex = (number) => {
    setTabValue(number);
  };
  const studentInfo = {
    name: "Jake Blean",
    gender: "female",
    email: "jake@lean.com",
    phone: "123-456-7890",
    dateJoined: "2022-01-01",
  };

  const handleIsEditingChange = () => { 
    setIsEditing(prev => !prev);
  }

  const displayImage = () => {
    // TODO: Display image
  }

  const uploadImage = (event) => {
      // TODO: Upload image
  }

  const handleLogout = () => {

  }

  return (
    <Paper sx={{ padding: 3, height: "100%" }}>
      <Stack spacing={2}>
        <Typography variant='h4' fontWeight='900'>Profile and Settings</Typography>
        <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
      <AppBar position="static">
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabValue}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={tabValue} index={0} dir={theme.direction}>
          Item One
        </TabPanel>
        <TabPanel value={tabValue} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={tabValue} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>
    </Box>
        <Tabs value={tabValue}>
            <Tab label='Profile'>
            <Grid container>
        <Grid item xs={12} md={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <IconButton
                variant="primary"
                sx={{ backgroundColor: primaryColor.light }}
                onClick={uploadImage}
              >
                <Edit />
              </IconButton>
            }
          >
            <IconButton onClick={() => displayImage}>
              <Avatar src={"profile-pic"} sx={{ width: 300, height: 300 }} />
            </IconButton>
          </Badge>
          <Button variant='outlined' onClick={() => handleLogout()}>Log Out</Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Formik
            initialValues={{
              fullname: studentInfo.name,
              gender: studentInfo.gender,
              phone: studentInfo.phone,
              email: studentInfo.email,
              dateJoined: studentInfo.dateJoined,
            }}
            validationSchema={Yup.object({
              fullname: Yup.string().trim().required("Name is required"),
              gender: Yup.string().trim().required("Gender is required"),
              phone: Yup.string().trim().required("Phone is required"),
              email: Yup.string()
                .trim()
                .email("Invalid email address")
                .required("Email is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Form values:", values);
              setSubmitting(false);
            }}
          >
            {() => (
              <Form autoComplete="on" className="profile-form">
                <Table size='small'>
                    <TableHead>
                        <TableRow><TableCell><Typography variant='h5' fontWeight='bold'>Student's Profile</Typography></TableCell></TableRow>
                    </TableHead>
                 <TableBody>
                 <TableRow>
                    <TableCell>
                      <Typography fontWeight="bold">Full Name</Typography>
                    </TableCell>
                    <TableCell>
                      <Field
                        name="fullname"
                        type="text"
                        as={Input}
                        fullWidth
                        id="fullname"
                        placeholder="Enter Full Name"
                        sx={{ margin: "10px 0" }}
                        helperText={<ErrorMessage name="fullname" />}
                        readOnly={!isEditing}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight="bold">Gender</Typography>
                    </TableCell>
                    <TableCell>
                      <Field
                        name="gender"
                        as={isEditing ? TextField : Input}
                        select={isEditing}
                        fullWidth
                        id="gender"
                        placeholder="Select gender"
                        sx={{ margin: "10px 0" }}
                        helperText={<ErrorMessage name="gender" />}
                        readOnly={!isEditing}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Field>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight="bold">Email</Typography>
                    </TableCell>
                    <TableCell>
                      <Field
                        name="email"
                        type="text"
                        as={Input}
                        fullWidth
                        id="email"
                        placeholder="Enter Email"
                        helperText={<ErrorMessage name="email" />}
                        readOnly={!isEditing}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight="bold">Phone Number</Typography>
                    </TableCell>
                    <TableCell>
                      <Field
                        name="phone"
                        type="text"
                        as={Input}
                        fullWidth
                        id="phone"
                        placeholder="Enter Phone Number"
                        sx={{ margin: "10px 0" }}
                        helperText={<ErrorMessage name="phone" />}
                        readOnly={!isEditing}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight="bold">Date Joined</Typography>
                    </TableCell>
                    <TableCell>
                      <Field
                        name="dateJoined"
                        type="text"
                        as={Input}
                        fullWidth
                        id="dateJoined"
                        placeholder="Enter Date Joined"
                        sx={{ margin: "10px 0" }}
                        helperText={<ErrorMessage name="dateJoined" />}
                        readOnly                      
                        />
                    </TableCell>
                  </TableRow>
                 </TableBody>
                </Table>
                {isEditing ? <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Save
                </Button> : 
                <Button
                fullWidth
                type="button"
                onClick={handleIsEditingChange}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Edit
              </Button>
                }
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
            </Tab>
        </Tabs>
      </Stack>
    </Paper>
  );
};

function TabPanel({ children, value, index, ...other }) {

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


export default ProfilePage;