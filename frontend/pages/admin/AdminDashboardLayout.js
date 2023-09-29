import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  IconButton,
  Link 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CategoryIcon from '@mui/icons-material/Category';
import { useState } from 'react';
import Header from '../../components/Header.js';

function AdminDashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
    <Header />
      <div style={{ display: 'flex' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setOpen(!open)}
          >
          <MenuIcon />
        </IconButton>

        {/* Sidebar */}
        <Drawer
          variant="temporary"
          open={open}
          onClose={() => setOpen(false)}
          anchor="left"
          style={{ width: '240px', flexShrink: 0 }}
          >
          <List>
            <Link href="/admin/create-product">
            <ListItem button component={Link} href="/admin/create-product">
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Create Product" />
            </ListItem>
            </Link>

            <Link href="/admin/create-category">
              <ListItem button component={Link} href="/admin/create-category">
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Create Category" />
              </ListItem>
            </Link>
          </List>
        </Drawer>

        {/* Main content */}
        <main style={{ flexGrow: 1, padding: '16px' }}>
          {children}
        </main>
      </div>
    </>
  );
}

export default AdminDashboardLayout;

