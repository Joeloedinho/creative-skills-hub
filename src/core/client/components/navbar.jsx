import React, { useState, useEffect } from 'react';
import { Approval, Circle, Favorite, Search, SettingsApplications, ShoppingCart } from "@mui/icons-material";
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

export default function ClientNavbar() {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Stack sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh'}}>
            <Paper
                elevation={2}
                sx={{ padding: "5px 15px", position: "sticky", top: 0, zIndex: 1 }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems='center'>
                    <Stack direction="row" alignItems="center">
                        <Link to="/client" style={{ textDecoration: "none" }}>
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
                        <NavLink to={"./clients-projects"}>
                            <Button>My Projects</Button>
                        </NavLink>
                        <NavLink to={"./editors"}>
                            <Button>Editors</Button>
                        </NavLink>
                    </Stack>
                    <Stack direction='row'>
                        <IconButton>
                            <Approval />
                        </IconButton>
                        <IconButton onClick={() => navigate('./profile')}>
                            <Avatar src={"default_profile_pic.png"} />
                        </IconButton>
                    </Stack>
                </Stack>
            </Paper>
            <Box
                sx={{
                    flexGrow: 1,
                    width: { xs: "100%", lg: "95%" },
                    maxWidth: 1400,
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
