import {Circle, Nightlight, Search, ShieldMoon, WbSunny} from "@mui/icons-material";
import {
    alpha,
    Box,
    Button,
    hexToRgb,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    useTheme
} from "@mui/material";
import React from "react";
import { FullTitleElement } from "./title";
import { Link, NavLink, Outlet } from "react-router-dom";
import {useTheme as useThemeMode} from "../theme";

// TOD0: Disappearing navbar
export default function LandingNavbar() {
  const theme = useTheme();
  const themeMode = useThemeMode();
  return (
      <Paper elevation={0} sx={{
        padding: "0 5px",
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: alpha(theme.palette.background.default, 0.8)}}
      >
      <Stack direction="row" justifyContent="space-between">
          <Link to="/" style={{textDecoration: "none"}}>
            <FullTitleElement isDark={true} fontSize={20} />
          </Link>
        {/* <Stack sx={{flexGrow: 1, mx: 2, maxWidth: 400}}>
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
        </Stack> */}
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
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={() => {
                themeMode.toggleTheme()
            }}>
                {
                    themeMode.isDarkMode
                        ? <WbSunny />
                        : <Nightlight />
                }
            </IconButton>
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
