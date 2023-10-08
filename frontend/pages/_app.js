import { ThemeProvider } from '../context/ThemeContext.js';
import { UserProvider } from '../context/UserContext.js';
import '../styles/globals.css'
import { CssBaseline } from '@mui/material';
import { CartProvider } from '../context/CartContext.js';
import MainLayout from '../pages/MainLayout.js';
import Sidebar from '../components/Sidebar.js';
import Header from '../components/Header.js';


function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <Header />
          <MainLayout>
            <Sidebar />
              <div className='flex-grow'>
                <CartProvider value={{ cart: [], setCart: () => {} }}>
                  <CssBaseline />
                    <Component {...pageProps} />
                </CartProvider>
              </div>
            </MainLayout>
        </ThemeProvider>
      </UserProvider>
    );
  }

export default MyApp;