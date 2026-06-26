import { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Navbar from './components/Navbar';
import ResourceCatalog from './views/ResourceCatalog';
import EquipmentBooking from './views/EquipmentBooking';
import Login from './views/Login';
import LocationBooking from './views/LocationBooking';
import BatchProcessor from './views/BatchProcessor';
import MasterCalendar from './views/MasterCalendar';

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
  const [allocatorSubTab, setAllocatorSubTab] = useState('request');
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('demoUserRole') || null;
  });

  const handleSelectRole = (role) => {
    setUserRole(role);
    localStorage.setItem('demoUserRole', role);
  };

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('demoUserRole');
  };

  // Helper to render active views
  const renderViewContent = () => {
    switch (activeTab) {
      case 0:
        return <ResourceCatalog />;
      case 1:
        return <EquipmentBooking userRole={userRole} />;
      case 2:
        return (
          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <ToggleButtonGroup
                value={allocatorSubTab}
                exclusive
                onChange={(e, value) => { if (value) setAllocatorSubTab(value); }}
                aria-label="allocator mode"
                sx={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  p: 0.5,
                  '& .MuiToggleButtonGroup-grouped': {
                    border: 0,
                    borderRadius: '12px !important',
                    mx: 0.5,
                    px: { xs: 2, sm: 3 },
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    color: 'text.secondary',
                    transition: 'all 0.2s',
                    '&.Mui-selected': {
                      background: 'linear-gradient(135deg, #c084fc 0%, #6366f1 100%)',
                      color: '#ffffff',
                      boxShadow: '0 4px 12px rgba(168, 85, 247, 0.15)',
                    },
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'primary.light',
                      '&.Mui-selected': {
                        background: 'linear-gradient(135deg, #c084fc 0%, #6366f1 100%)',
                        color: '#ffffff',
                      }
                    }
                  }
                }}
              >
                <ToggleButton value="request">Venue Request Form</ToggleButton>
                <ToggleButton value="admin">Batch Processor Admin</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            {allocatorSubTab === 'request' ? <LocationBooking userRole={userRole} /> : <BatchProcessor />}
          </Box>
        );
      case 3:
        return <MasterCalendar />;
      default:
        return <ResourceCatalog />;
    }
  };

  if (!userRole) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <Login onSelectRole={handleSelectRole} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userRole={userRole}
          onLogout={handleLogout}
        />
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
