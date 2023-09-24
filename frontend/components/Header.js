import { 
  AppBar, 
  Toolbar, 
  Button,
  Hidden,
  Box 
} from '@mui/material';
import { ThemeToggleButton } from '../components/ThemeToggleButton.js';
import ToggleHiddenMenu from './ToggleHiddenMenu.js';
import Link from 'next/link';

function Header() {
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
                <Button className="text-white">Categories</Button>
              </Link>
            </Hidden>
          </div>

          <div className="flex">
            <ThemeToggleButton />
            <Link href="/registration" passHref>
              <Button color="inherit"  style={{ marginLeft: '15px' }}>Registration</Button>
            </Link>
            <Link href="/login" passHref>
              <Button color="inherit" style={{ marginLeft: '15px' }}>Login</Button>
            </Link>
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