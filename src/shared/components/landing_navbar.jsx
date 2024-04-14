import { Circle, Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, Paper, Stack, TextField } from "@mui/material";
import React from "react";
import { FullTitleElement } from "./title";
import { Link, NavLink, Outlet } from "react-router-dom";

// TOD0: Disappearing navbar
export default function LandingNavbar() {
  return (
      <Paper elevation={2} sx={{ padding: "5px 15px", position: 'sticky', top: 0, zIndex: 1 }}>
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
  );
}
