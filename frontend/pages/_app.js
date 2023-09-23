import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '../context/ThemeContext.js';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CssBaseline /> {/* Add this line */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

