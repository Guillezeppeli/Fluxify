import { ThemeProvider } from '../context/ThemeContext.js';
import { UserProvider } from '../context/UserContext.js';
import { useUserContext } from '../context/UserContext.js';
import '../styles/globals.css'
import { CssBaseline } from '@mui/material';
import { AdminDashboard } from '../components/AdminDashboard.js';

function MyApp({ Component, pageProps }) {
  const { user } = useUserContext();
  return (
    <UserProvider>
      <ThemeProvider>
          <CssBaseline /> {/* Add this line */}
          <Component {...pageProps} />
          {user && user.isAdmin ? <AdminDashboard /> : <p>You are not authorized to view this section.</p>}
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;

