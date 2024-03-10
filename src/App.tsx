import React, { useState } from 'react';

import { RouterProvider } from 'react-router-dom';
import { CssBaseline, PaletteMode, ThemeProvider, createTheme } from '@mui/material';

import { router } from './router';

import { Header } from './components/Header';

const App: React.FC = () => {
    const [darkMode, setDarkmode] = useState<PaletteMode>("light")

    const toggleDarkMode = () => {
        setDarkmode((p) => p === 'light' ? 'dark' : 'light')
    }

    const darkTheme = createTheme({
        palette: {
            mode: darkMode,
        },
    });


    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
};

export default App;
