import { ThemeProvider } from '../context/ThemeContext.js';
import { UserProvider } from '../context/UserContext.js';
import '../styles/globals.css'
import { CssBaseline } from '@mui/material';
import { CartProvider } from '../context/CartContext.js';


function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <CartProvider value={{ cart: [], setCart: () => {} }}>
          <CssBaseline />
          <Component {...pageProps} />
          </CartProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;

