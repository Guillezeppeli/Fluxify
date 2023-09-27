import { 
  AppBar, 
  Toolbar, 
  Button,
  Hidden,
  Box 
} from '@mui/material';
import { useUserContext } from '../context/UserContext.js'
import { ThemeToggleButton } from '../components/ThemeToggleButton.js';
import { useRouter } from 'next/router';
import ToggleHiddenMenu from './ToggleHiddenMenu.js';
import Link from 'next/link';


function Header() {
  const { user, setUser } = useUserContext();
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token
    localStorage.removeItem('token');
    // Set the user state to null or perform other state updates
    setUser(null);
    // Optionally redirect the user to the login page or homepage
    router.push('/');
  };

  console.log("User state in Header:", user);

  return (
    <Box sx={{ flexGrow: 1 }} className="font-roboto">
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex' }}>
            <Hidden smDown>
              <Link href="/" passHref>
                <Button style={{ color: 'white', marginRight: '15px' }}>Homepage</Button>
              </Link>
              <Link href="/categories" passHref>
                <Button style={{ color: 'white', marginRight: '15px' }}>Categories</Button>
              </Link>
            </Hidden>
          </div>
          { user && user.isAdmin && (
        <>
          <Link href="/admin/">Admin Dashboard</Link>
        </>
      )}
          <div className="flex">
            <ThemeToggleButton />

            { user ? (
              <>
                <span className="mr-4 text-white">Hello, {user.name}</span>
                <Button 
                  color="inherit"
                  onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/register" passHref>
                  <Button color="inherit"  style={{ marginLeft: '15px' }}>Sign Up</Button>
                </Link>
                <Link href="/login" passHref>
                  <Button color="inherit" style={{ marginLeft: '15px' }}>Login</Button>
                </Link>
              </>
            )}

            <Hidden mdUp>
              <ToggleHiddenMenu />
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


export default Header;