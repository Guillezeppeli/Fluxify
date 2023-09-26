import { ThemeProvider } from '../context/ThemeContext.js';
import '../styles/globals.css'
import { CssBaseline } from '@mui/material';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CssBaseline /> {/* Add this line */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

