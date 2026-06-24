import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box, Typography } from '@mui/material';
import Navbar from './components/Navbar';
import ResourceCatalog from './views/ResourceCatalog';
import EquipmentBooking from './views/EquipmentBooking';

// Create a premium custom MUI dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c084fc', // Vibrant Light Purple/Violet
      light: '#e9d5ff',
      dark: '#a855f7',
    },
    secondary: {
      main: '#6366f1', // Indigo
      light: '#818cf8',
      dark: '#4f46e5',
    },
    background: {
      default: '#0b1329', // Deep dark blue-slate
      paper: '#111b36',   // Dark blue-slate for panels
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'Outfit', sans-serif", fontWeight: 700 },
    h2: { fontFamily: "'Outfit', sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h4: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h5: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0b1329',
          backgroundImage: 'radial-gradient(circle at 50% -20%, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(11, 19, 41, 0) 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
  },
});

function App() {
  const [activeTab, setActiveTab] = useState(0);

  // Helper to render active views
  const renderViewContent = () => {
    switch (activeTab) {
      case 0:
        return <ResourceCatalog />;
      case 1:
        return <EquipmentBooking />;
      case 2:
        return (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              py: 16, 
              textAlign: 'center',
              borderRadius: '24px',
              border: '1px dashed rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
              mt: 4
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: "'Outfit', sans-serif", 
                fontWeight: 700, 
                mb: 1, 
                color: 'text.secondary' 
              }}
            >
              Location Batch Allocator
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', opacity: 0.6 }}>
              Module Loading...
            </Typography>
          </Box>
        );
      case 3:
        return (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              py: 16, 
              textAlign: 'center',
              borderRadius: '24px',
              border: '1px dashed rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
              mt: 4
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: "'Outfit', sans-serif", 
                fontWeight: 700, 
                mb: 1, 
                color: 'text.secondary' 
              }}
            >
              Master Calendar
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', opacity: 0.6 }}>
              Module Loading...
            </Typography>
          </Box>
        );
      default:
        return <ResourceCatalog />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
        <Container 
          maxWidth="lg" 
          component="main"
          sx={{ 
            flexGrow: 1, 
            px: { xs: 2, sm: 3 },
            pb: 6
          }}
        >
          {renderViewContent()}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
