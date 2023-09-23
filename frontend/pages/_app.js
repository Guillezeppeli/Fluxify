import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '../context/ThemeContext.js';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CssBaseline /> {/* Add this line */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

