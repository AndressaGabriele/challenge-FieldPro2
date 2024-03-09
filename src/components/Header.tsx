// imports mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import { PaletteMode } from '@mui/material';

// imports react
import { useState } from 'react';
import { FaSun } from 'react-icons/fa';
import { FaMoon } from 'react-icons/fa';
import { GiAerialSignal } from "react-icons/gi";


interface IHeder {
    darkMode: PaletteMode,
    toggleDarkMode: () => void
}
export default function Header({darkMode, toggleDarkMode}: IHeder) {
    const [auth, setAuth] = useState(true);
    

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
                    {auth && (
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
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}