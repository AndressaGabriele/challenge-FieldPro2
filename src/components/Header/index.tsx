import React from 'react';
import {Box, Toolbar, Typography, IconButton, FormGroup, AppBar, PaletteMode} from '@mui/material';
import { FaSun, FaMoon } from 'react-icons/fa';
import { GiAerialSignal } from "react-icons/gi";
import './styles.css'


interface IHeder {
    darkMode: PaletteMode,
    toggleDarkMode: () => void
}
export function Header({darkMode, toggleDarkMode}: IHeder) {
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <FormGroup>
            </FormGroup>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    <GiAerialSignal  />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        FieldPRO
                    </Typography>
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={toggleDarkMode}
                                color="inherit"
                            >
                                {darkMode === 'light' ? <FaSun /> : <FaMoon />}
                            </IconButton>
                        </div>
                    
                </Toolbar>
            </AppBar>
        </Box>
    );
}