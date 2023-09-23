import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" passHref>
          <Button color="inherit">Homepage</Button>
        </Link>
        <Link href="/categories" passHref>
          <Button color="inherit">Categories</Button>
        </Link>
        <div style={{ marginLeft: 'auto' }}>
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
