// ThemeProvider.js
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {darkTheme, lightTheme} from "./theme";

// Create a context for the theme
const ThemeContext = createContext();

const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState(() => {
        const savedThemeMode = localStorage.getItem('themeMode');
        return savedThemeMode ? savedThemeMode : 'light';
    });

    useEffect(() => {
        localStorage.setItem('themeMode', themeMode);
    }, [themeMode]);

    const toggleTheme = () => {
        setThemeMode((prevThemeMode) => (prevThemeMode === 'light' ? 'dark' : 'light'));
    };
    const appliedTheme = themeMode === 'light' ? lightTheme : darkTheme;

    const isDarkMode = themeMode === 'dark';

    const themeModeValue = useMemo(() => ({
        themeMode,
        appliedTheme,
        isDarkMode,
        toggleTheme,
    }), [themeMode]);

    return (
        <ThemeContext.Provider value={themeModeValue}>
            <MUIThemeProvider theme={appliedTheme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};

export {ThemeProvider, useTheme};
