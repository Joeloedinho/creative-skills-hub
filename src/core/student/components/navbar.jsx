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
import React from "react";

import { Link, NavLink, Outlet } from "react-router-dom";
import { Footer, FullTitleElement } from "../../../shared";

// TOD0: Disappearing navbar
export default function StudentNavbar() {
  const theme = useTheme()
  return (
    <Stack sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh'}}>
      <Paper
        elevation={2}
        sx={{ padding: "5px 15px", position: "sticky", top: 0, zIndex: 1 }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems='center'>
          <Stack direction="row" alignItems="center">
            <Circle sx={{ fontSize: 30 }} />
            <Link to="/" style={{ textDecoration: "none" }}>
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
            <IconButton>
              <Avatar>{'ML'}</Avatar>
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
