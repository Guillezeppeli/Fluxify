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
import { useRouter } from 'next/router';
import { useState } from 'react';

function AdminDashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex' }}>
      {/* Toggle button */}
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
        variant="temporary" // Changed from 'permanent' to 'temporary' for toggle functionality
        open={open}
        onClose={() => setOpen(false)}
        anchor="left"
        style={{ width: '240px', flexShrink: 0 }}
      >
        <List>
          <Link href="/admin/create-product" passHref>
            <ListItem button component="a">
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Create Product" />
            </ListItem>
          </Link>

          <Link href="/admin/create-category" passHref>
            <ListItem button component="a">
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
  );
}

export default AdminDashboardLayout;

