import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { ThemeToggleButton } from '../components/ThemeToggleButton.js';
import Link from 'next/link';

function Header() {
  return (
    <AppBar position="static" className="font-roboto">
        <Toolbar>
          <Link href="/" passHref>
            <Button style={{ color: 'white' }}>Homepage</Button>
          </Link>
          <Link href="/categories" passHref>
            <Button className="text-white">Categories</Button>
          </Link>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <ThemeToggleButton />
            <Link href="/registration" passHref>
              <Button color="inherit">Registration</Button>
            </Link>
            <Link href="/login" passHref>
              <Button color="inherit">Login</Button>
            </Link>
          </div>
        </Toolbar>
    </AppBar>
  );
}

export default Header;
