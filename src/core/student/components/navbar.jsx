import React, { useState, useEffect } from 'react'; 
import { Circle, Favorite, Search, ShoppingCart } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { Footer, FullTitleElement } from "../../../shared";
import useFetch from '../../../hooks/useFetch'; 

export default function StudentNavbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const authToken = sessionStorage.getItem('authToken');
  const [studentData, setStudentData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error}</div>;
  return (
    <Stack sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh'}}>
      <Paper
        elevation={2}
        sx={{ padding: "5px 15px", position: "sticky", top: 0, zIndex: 1 }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems='center'>
          <Stack direction="row" alignItems="center">
            <Circle sx={{ fontSize: 30 }} />
            <Link to="/student" style={{ textDecoration: "none" }}>
              <FullTitleElement isDark={true} fontSize={20} />
            </Link>
          </Stack>
          <Stack sx={{ flexGrow: 1, mx: 2, maxWidth: 400 }}>
            <TextField
              id="input-with-icon-textfield"
              fullWidth
              size="small"
              sx={{
                borderRadius: "50px",
              }}
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Link to={"/student/my-courses"}>
              <Button>My Courses</Button>
            </Link>
            <Link to={""}>
              <Button>Contact Admin</Button>
            </Link>
          </Stack>
          <Stack direction='row'>
            <IconButton>
              <Favorite />
            </IconButton>
            <IconButton>
              <ShoppingCart />
            </IconButton>
            <IconButton onClick={() => navigate('/student/profile')}>
              <Avatar src={studentData?.profilePic || "default_profile_pic.png"} />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
      <Box
        sx={{
          flexGrow: 1,
          width: { xs: "100%", lg: "95%" },
          marginX: "auto",
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Stack>
  );
}
