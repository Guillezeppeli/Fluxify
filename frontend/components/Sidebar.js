import React from 'react';
import { Avatar, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';

const SidebarContainer = styled('div')({
    width: 250,
    padding: '16px',
});

const ProfileContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '16px',
});

const StyledAvatar = styled(Avatar)({
    width: '56px',
    height: '56px',
    marginBottom: '8px',
});

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
    fontWeight: active ? 'bold' : 'normal',
    cursor: 'pointer',
}));

const Sidebar = () => {
    return (
      <List component="nav">
          <StyledListItem button active>
              <ListItemText primary="Favorites" />
          </StyledListItem>
          <StyledListItem button>
              <ListItemText primary="Overview" />
          </StyledListItem>
          <StyledListItem button>
              <ListItemText primary="Projects" />
          </StyledListItem>
          <StyledListItem button>
              <ListItemText primary="Dashboards" />
          </StyledListItem>
      </List>
    );
};

export default Sidebar;

