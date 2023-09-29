import { useState } from 'react';
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
import Categories from '../components/Categories.js';


function Header() {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);


  const handleLogout = () => {
    // Remove the token
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Set the user state to null or perform other state updates
    setUser(null);
    // Optionally redirect the user to the login page or homepage
    router.push('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="font-roboto">
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'inline-flex', justifyContent: 'start'}}>
            <Button
              style={{ color: 'white', marginRight: '15px' }}
              onMouseEnter={() => setIsDrawerVisible(true)}
              >
              Categories
            </Button>
            <Categories isOpen={isDrawerVisible} onClose={() => setIsDrawerVisible(false)} />

            <div style={{ display: 'flex', justifyContent: 'start' }}>
              <Hidden smDown>
                <Link href="/">
                  <Button style={{ color: 'white', marginRight: '15px' }}>Homepage</Button>
                </Link>
              </Hidden>
            </div>
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
                <Link href="/register">
                  <Button color="inherit"  style={{ marginLeft: '15px' }}>Sign Up</Button>
                </Link>
                <Link href="/login">
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