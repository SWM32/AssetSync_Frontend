import React from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Container, Box, Button, Chip } from '@mui/material';

/**
 * Navbar component for the AssetSync application shell.
 * Provides a sticky glassmorphic navigation bar with tabs.
 * 
 * @param {Object} props
 * @param {number} props.activeTab - Currently active tab index (0-3)
 * @param {function} props.onTabChange - Callback invoked when a tab is selected
 * @param {string} props.userRole - The selected user role (LECTURER or STUDENT)
 * @param {function} props.onLogout - Callback to clear the active role
 */
const Navbar = ({ activeTab, onTabChange, userRole, onLogout }) => {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
        zIndex: 1100,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '64px', gap: 2 }}>
          <Typography 
            variant="h6" 
            noWrap 
            sx={{ 
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: '1.6rem',
              letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #c084fc 0%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mr: 2,
              userSelect: 'none',
              cursor: 'pointer',
            }}
            onClick={() => onTabChange(0)}
          >
            AssetSync
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'space-between' }}>
            <Tabs 
              value={activeTab} 
              onChange={(e, newValue) => onTabChange(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                '& .MuiTabs-indicator': {
                  background: 'linear-gradient(135deg, #c084fc 0%, #6366f1 100%)',
                  height: '3px',
                  borderRadius: '3px 3px 0 0',
                },
                '& .MuiTab-root': {
                  fontFamily: "'Inter', sans-serif",
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  minWidth: 'auto',
                  px: { xs: 1.5, sm: 3 },
                  color: 'text.secondary',
                  transition: 'all 0.2s ease',
                  '&.Mui-selected': {
                    color: 'primary.light',
                  },
                  '&:hover': {
                    color: 'primary.light',
                    opacity: 0.8,
                  }
                }
              }}
            >
              <Tab label="Catalog" />
              <Tab label="Book Equipment" />
              <Tab label="Location Batch Allocator" />
              <Tab label="Master Calendar" />
            </Tabs>

            {userRole && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, ml: 2 }}>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Role:
                  </Typography>
                  <Chip 
                    label={userRole === 'LECTURER' ? 'Lecturer' : 'Student'} 
                    size="small"
                    sx={{ 
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      background: userRole === 'LECTURER' 
                        ? 'linear-gradient(135deg, rgba(192, 132, 252, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)' 
                        : 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(79, 70, 229, 0.15) 100%)',
                      color: userRole === 'LECTURER' ? '#c084fc' : '#818cf8',
                      border: '1px solid',
                      borderColor: userRole === 'LECTURER' ? 'rgba(192, 132, 252, 0.3)' : 'rgba(99, 102, 241, 0.3)',
                      borderRadius: '6px'
                    }}
                  />
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={onLogout}
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    color: 'text.secondary',
                    borderRadius: '8px',
                    px: { xs: 1.2, sm: 2 },
                    py: 0.6,
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.25)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: 'primary.light'
                    }
                  }}
                >
                  Switch Role
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
