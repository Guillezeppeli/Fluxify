import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '../context/ThemeContext.js';  // Adjust the path to your ThemeContext file

export const ThemeToggleButton = () => {
  const theme = useTheme();
  const { darkMode, toggleColorMode } = useThemeContext();

  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeToggleButton;

