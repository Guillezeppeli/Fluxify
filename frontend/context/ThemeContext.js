import { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { blue } from '@mui/material/colors';

const ThemeContext = createContext({
  darkMode: false,
  setDarkMode: () => {},
  toggleColorMode: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3', // Blue color for button background in both modes', // White text for the button in both modes
      },
      background: {
        default: darkMode ? '#333' : '#fff',
      },
    },
  });
  

  const toggleColorMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleColorMode }}>
      <MUIThemeProvider theme={theme}>
      <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext); // Providing a hook for accessing the theme context