import { Circle, Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, Paper, Stack, TextField } from "@mui/material";
import React from "react";
import { FullTitleElement } from "../../shared/components/title";
import { Link, NavLink, Outlet } from "react-router-dom";
import LandingPage from "./landing";
import { Footer } from "../../shared";

export default function LandingNavbar() {
  return (
    <Stack sx={{height: '100vh'}}>
      <Paper elevation={2} sx={{ padding: "15px 30px" }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          <Circle sx={{ fontSize: 30 }} />
          <Link to="/" style={{textDecoration: "none"}}>
            <FullTitleElement isDark={true} fontSize={20} />
          </Link>
        </Stack>
        <Stack sx={{flexGrow: 1, mx: 2, maxWidth: 400}}>
          <TextField
            id="input-with-icon-textfield"
            fullWidth
            size='small'
            sx={{
              borderRadius: '50px',
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
          <NavLink to={"/about"}>
            <Button>About Us</Button>
          </NavLink>
          <NavLink to={"/auth/register/editor"}>
            <Button>Become an Editor</Button>
          </NavLink>
          <NavLink to={"/auth/register/client"}>
            <Button>Become a Client</Button>
          </NavLink>
          <NavLink to={"/auth/login"}>
            <Button variant="outlined">Login</Button>
          </NavLink>
          <NavLink to={"/auth/register"}>
            <Button variant="outlined">Register</Button>
          </NavLink>
        </Stack>
      </Stack>
    </Paper>
    <Box style={{flexGrow: 1}}>
      <Outlet />
    </Box>
    <Footer />
    </Stack>
  );
}
