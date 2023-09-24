import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme();

export const content = [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {
    colors: {
      primary: muiTheme.palette.primary.main,
      secondary: muiTheme.palette.secondary.main,
      // Add other MUI colors as needed
    },
    screens: {
      xs: muiTheme.breakpoints.values.xs + 'px',
      sm: muiTheme.breakpoints.values.sm + 'px',
      md: muiTheme.breakpoints.values.md + 'px',
      lg: muiTheme.breakpoints.values.lg + 'px',
      xl: muiTheme.breakpoints.values.xl + 'px',
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
  },
};
export const plugins = [];
