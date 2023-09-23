import { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext({
  darkMode: false,
  setDarkMode: () => {},
  toggleColorMode: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
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