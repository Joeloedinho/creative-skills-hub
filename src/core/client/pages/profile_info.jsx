import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Grid,
  IconButton,
  TextField,
  MenuItem,
  Button,
  Input,
  Table,
  TableRow,
  TableCell,
  Typography,
  Paper,
  TableBody,
  TableHead,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuthContext } from "../../auth/contexts/authContext";

const ProfileInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    "default_profile_pic.png"
  );
  const [studentInfo, setStudentInfo] = useState({
    name: "Mbah Lesky",
    businessType: "individual",
    email: "mbahlesky2@gmail.com",
    phone: "679682626",
    website: "www.lespa.com",
    dateJoined: (new Date()).toLocaleString(),
    address: "New Ohio",
    profilePic: "default_profile_pic.png",
  });
  // const [isFetching, setIsFetching] = useState(false);
  // const [error, setError] = useState(null);
  // const { userData } = useAuthContext();
  // const authToken = userData?.token;
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   sessionStorage.removeItem("authToken");
  //   navigate("/");
  // };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsFetching(true);
  //     try {
  //       const response = await fetch("http://localhost:4000/students/profile", {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${authToken}` },
  //       });
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setStudentInfo(data);
  //       setImagePreviewUrl(data.profilePic || "default_profile_pic.png");
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setIsFetching(false);
  //     }
  //   };

  //   fetchData();
  // }, [authToken]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // const handleIsEditingChange = (event) => {
  //   event.preventDefault();
  //   setIsEditing(!isEditing);
  // };

  // const handleSubmit = async (values, { setSubmitting }) => {
  //   console.log("Submit function called");
  //   const formData = new FormData();
  //   formData.append("fullname", values.fullname);
  //   formData.append("businessType", values.businessType);
  //   formData.append("phone", values.phone);
  //   formData.append("email", values.email);
  //   formData.append("dateJoined", values.dateJoined);
  //   if (file) {
  //     formData.append("profilePic", file);
  //   }

  //   try {
  //     const response = await fetch(
  //       "http://localhost:4000/students/updateProfile",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //         body: formData,
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const updatedData = await response.json();
  //     setStudentInfo(updatedData);
  //     setIsEditing(false);
  //     alert("Profile updated successfully!");
  //   } catch (error) {
  //     console.error("Error during the save operation:", error);
  //     alert("Failed to update profile.");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  // if (isFetching) return <div>Loading...</div>;
  // if (error) return <div>Error fetching data: {error}</div>;

  return (
    <Paper sx={{ padding: 2 }}>
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <IconButton color="primary" component="label">
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                />
                <Edit />
              </IconButton>
            }
          >
            <Avatar src={imagePreviewUrl} sx={{ width: 300, height: 300 }} />
          </Badge>
          <Button variant="outlined" sx={{ mt: 2 }} 
            // onClick={handleLogout}
          >
            Log Out
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Formik
            initialValues={studentInfo}
            enableReinitialize={true}
            onSubmit={(values, actions) => {
              if (!isEditing) {
                actions.setSubmitting(false);
                return;
              }

              // handleSubmit(values, actions);
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("Full name is required"),
              address: Yup.string(),
              phone: Yup.string().required("Phone number is required"),
              website: Yup.string(),
              businessType: Yup.string().required("Phone number is required"),
              years: Yup.number().required("Years are required").min(1, "Minimum of 1 year is required"),
              email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
              dateJoined: Yup.string().required("Date Joined is required"),
            })}
          >
            {({ isSubmitting }) => (
              <Form autoComplete="on" className="profile-form">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h5" fontWeight="bold">
                          Client's Profile
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography fontWeight="bold">Business Name</Typography>
                      </TableCell>
                      <TableCell>
                        <Field
                          name="name"
                          type="text"
                          as={Input}
                          fullWidth
                          id="name"
                          placeholder="Enter Name"
                          sx={{ margin: "10px 0" }}
                          helperText={<ErrorMessage name="name" />}
                          disabled={!isEditing}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography fontWeight="bold">Business Type</Typography>
                      </TableCell>
                      <TableCell>
                        <Field
                          name="businessType"
                          as={TextField}
                          select
                          fullWidth
                          id="businessType"
                          sx={{ margin: "10px 0" }}
                          helperText={<ErrorMessage name="businessType" />}
                          disabled={!isEditing}
                        >
                          <MenuItem value="individual">Individual</MenuItem>
                          <MenuItem value="organisation">Organisation</MenuItem>
                        </Field>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography fontWeight="bold">Address</Typography>
                      </TableCell>
                      <TableCell>
                        <Field
                          name="address"
                          as={Input}
                          fullWidth
                          id="address"
                          sx={{ margin: "10px 0" }}
                          helperText={<ErrorMessage name="address" />}
                          disabled={!isEditing}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography fontWeight="bold">Website</Typography>
                      </TableCell>
                      <TableCell>
                        <Field
                          name="website"
                          type="url"
                          as={Input}
                          fullWidth
                          id="website"
                          placeholder="Enter number of years of work"
                          sx={{ margin: "10px 0" }}
                          helperText={<ErrorMessage name="website" />}
                          disabled={!isEditing}
                        />
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
                          sx={{ margin: "10px 0" }}
                          helperText={<ErrorMessage name="email" />}
                          disabled={!isEditing}
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
                          disabled={!isEditing}
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
                          disabled
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                {isEditing ? (
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    type="button"
                    onClick={(event) => setIsEditing(true)}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Edit
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileInfo;