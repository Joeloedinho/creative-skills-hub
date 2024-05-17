import React from "react";
import { Circle } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton, Paper,
  Stack, useTheme
} from "@mui/material";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Footer, FullTitleElement } from "../../../shared";

export default function AdminNavbar() {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={2}
        sx={{ padding: "5px 15px", position: "sticky", top: 0, zIndex: 1 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center">
            <Circle sx={{ fontSize: 30 }} />
            <Link to="/admin" style={{ textDecoration: "none" }}>
              <FullTitleElement isDark={true} fontSize={20} />
            </Link>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <NavLink to={"./courses"}>
              <Button>Courses</Button>
            </NavLink>
            <NavLink to={"./students"}>
              <Button>Students</Button>
            </NavLink>
            <NavLink to={"./projects"}>
              <Button>Projects</Button>
            </NavLink>
            <NavLink to={"./editors"}>
              <Button>Editors</Button>
            </NavLink>
            <NavLink to={"./clients"}>
              <Button>Clients</Button>
            </NavLink>
          </Stack>
          <Stack direction="row">
            <IconButton>
              <Avatar src={"default_profile_pic.png"} />
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
