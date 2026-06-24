import React from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Container } from '@mui/material';

/**
 * Navbar component for the AssetSync application shell.
 * Provides a sticky glassmorphic navigation bar with tabs.
 * 
 * @param {Object} props
 * @param {number} props.activeTab - Currently active tab index (0-3)
 * @param {function} props.onTabChange - Callback invoked when a tab is selected
 */
const Navbar = ({ activeTab, onTabChange }) => {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '64px' }}>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
