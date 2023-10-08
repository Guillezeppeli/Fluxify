import React from 'react';
import { useThemeContext } from '../context/ThemeContext';
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
    const { darkMode, toggleColorMode } = useThemeContext
        return (
            <SidebarContainer className='w-1/4 min-h-screen'>
                <ProfileContainer>
                    <StyledAvatar src="path-to-avatar.jpg" alt="Avatar" />
                    <Typography variant="h6" component="h2">
                        ByeWind
                    </Typography>
                </ProfileContainer>
                <Divider />
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
            </SidebarContainer>
    );
};

export default Sidebar;

