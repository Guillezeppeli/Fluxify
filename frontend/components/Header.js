import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button,
  Hidden,
  Box,
  IconButton
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useUserContext } from '../context/UserContext.js'
import { ThemeToggleButton } from '../components/ThemeToggleButton.js';
import { useRouter } from 'next/router';
import ToggleHiddenMenu from './ToggleHiddenMenu.js';
import Link from 'next/link';
import Categories from '../components/Categories.js';

const Header = () => {
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box display='flex' alignItems="center" flexGrow={1}>
            <Button
              style={{ color: 'white', marginRight: '15px' }}
              onClick={() => setIsDrawerVisible(true)}
              >
              Categories
            </Button>
            <Categories isOpen={isDrawerVisible} onClose={() => setIsDrawerVisible(false)} />

              <Hidden smDown>
                <Link href="/">
                  <Button style={{ color: 'white'}}>
                    Homepage
                  </Button>
                </Link>
              </Hidden>
            </Box>
          { user && user.isAdmin && (
        <Box display="flex" alignItems="center" flexGrow={1} justifyContent="start">
          <Link href="/admin/">Admin Dashboard</Link>
        </Box>
      )}
          <Box display="flex" alignItems="center">
            <ThemeToggleButton />
            { user ? (
              <>
                <span style={{ marginRight: '16px', color: 'white' }}>Hello, {user.name}</span>
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
                <Link href="/cart">
                  <IconButton color="inherit" edge="end">
                    <ShoppingCartIcon />
                  </IconButton>
                </Link>
              </>
            )}

            <Hidden mdUp>
              <ToggleHiddenMenu />
            </Hidden>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


export default Header;