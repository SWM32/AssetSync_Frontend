import { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  TextField, 
  ToggleButtonGroup, 
  ToggleButton, 
  CircularProgress, 
  Alert, 
  InputAdornment 
} from '@mui/material';
import { fetchResources } from '../services/api';

// Simple self-contained SVG icons to avoid extra package dependencies
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', opacity: 0.8 }}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const BoxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', opacity: 0.8 }}>
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
    <polygon points="12 22.08 12 12 3 6.92 3 17.08 12 22.08"></polygon>
    <polygon points="12 12 21 6.92 21 17.08 12 22.08"></polygon>
    <polygon points="12 2 21 6.92 12 12 3 6.92 12 2"></polygon>
  </svg>
);

/**
 * ResourceCatalog component.
 * Displays University resources (Equipment & Locations) in a responsive grid.
 */
export default function ResourceCatalog() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL'); // 'ALL', 'LOCATION', 'EQUIPMENT'

  // Fetch resources on load or when filterType changes
  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      setError(null);
      try {
        // Map UI filter to API parameter (ALL translates to null)
        const apiParam = filterType === 'ALL' ? null : filterType;
        const data = await fetchResources(apiParam);
        setResources(data || []);
      } catch {
        setError('Could not retrieve resources from server. Please verify database connection.');
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, [filterType]);

  // Handle filter changes
  const handleFilterChange = (event, newFilter) => {
    // Prevent deselecting (MUI toggle button returns null if clicked again)
    if (newFilter !== null) {
      setFilterType(newFilter);
    }
  };

  // Client-side search filtration (by name or category)
  const filteredResources = resources.filter(res => {
    const query = searchQuery.toLowerCase();
    const nameMatch = res.name?.toLowerCase().includes(query);
    const catMatch = res.category?.toLowerCase().includes(query);
    return nameMatch || catMatch;
  });

  // Get color representing qualityStatus
  const getQualityColor = (status) => {
    if (!status) return 'transparent';
    const s = status.toUpperCase();
    if (s === 'GOOD' || s === 'NEW') {
      return '#10b981'; // Vibrant Green
    }
    if (s === 'MAINTENANCE' || s === 'NEEDS_INSPECTION') {
      return '#f97316'; // Vibrant Orange
    }
    return '#f97316'; // Default fallback
  };

  // Human-readable quality status label formatting
  const getQualityLabel = (status) => {
    if (!status) return 'Unknown';
    const s = status.toUpperCase();
    if (s === 'GOOD') return 'Good Condition';
    if (s === 'NEW') return 'Brand New';
    if (s === 'MAINTENANCE') return 'Maintenance';
    if (s === 'NEEDS_INSPECTION') return 'Needs Inspection';
    return status;
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Top Filter and Search Control Bar */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'stretch', md: 'center' }, 
          gap: 2, 
          mb: 4 
        }}
      >
        <TextField
          placeholder="Search by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          size="medium"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: 1 }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
            maxWidth: { md: '450px' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              fontFamily: "'Inter', sans-serif",
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
              '&.Mui-focused': {
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }
            }
          }}
        />

        <ToggleButtonGroup
          value={filterType}
          exclusive
          onChange={handleFilterChange}
          aria-label="resource type filter"
          sx={{
            alignSelf: { xs: 'center', md: 'auto' },
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '12px',
            p: '4px',
            '& .MuiToggleButtonGroup-middleButton, & .MuiToggleButtonGroup-firstButton, & .MuiToggleButtonGroup-lastButton': {
              borderRadius: '8px !important',
              border: 'none',
              mx: '2px',
            },
            '& .MuiToggleButton-root': {
              textTransform: 'none',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.875rem',
              color: 'text.secondary',
              px: { xs: 2, sm: 3 },
              py: '8px',
              '&.Mui-selected': {
                color: '#fff',
                background: 'linear-gradient(135deg, #c084fc 0%, #6366f1 100%)',
                '&:hover': {
                  opacity: 0.9,
                }
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              }
            }
          }}
        >
          <ToggleButton value="ALL">All Assets</ToggleButton>
          <ToggleButton value="LOCATION">Locations</ToggleButton>
          <ToggleButton value="EQUIPMENT">Equipment</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Main Content Area */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
          <CircularProgress 
            size={50} 
            thickness={4} 
            sx={{
              color: '#c084fc',
            }} 
          />
        </Box>
      ) : error ? (
        <Alert severity="error" variant="filled" sx={{ borderRadius: '12px', fontFamily: "'Inter', sans-serif" }}>
          {error}
        </Alert>
      ) : filteredResources.length === 0 ? (
        <Alert severity="info" variant="outlined" sx={{ borderRadius: '12px', fontFamily: "'Inter', sans-serif', borderColor: 'divider'" }}>
          No resources found in the database.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {filteredResources.map((item) => {
            const isLocation = item.resourceType === 'LOCATION';
            const isEquipment = item.resourceType === 'EQUIPMENT';

            return (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.3) 0%, rgba(15, 23, 42, 0.5) 100%)',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: 'rgba(192, 132, 252, 0.35)',
                      boxShadow: '0 12px 24px -10px rgba(168, 85, 247, 0.25)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography 
                        variant="h6" 
                        component="h2"
                        sx={{ 
                          fontFamily: "'Outfit', sans-serif", 
                          fontWeight: 700, 
                          color: '#f8fafc',
                          fontSize: '1.2rem',
                          lineHeight: 1.3,
                          mr: 1
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Chip 
                        label={item.category} 
                        size="small" 
                        sx={{ 
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                          fontSize: '0.72rem',
                          backgroundColor: isLocation ? 'rgba(99, 102, 241, 0.15)' : 'rgba(168, 85, 247, 0.15)',
                          color: isLocation ? '#818cf8' : '#c084fc',
                          border: '1px solid',
                          borderColor: isLocation ? 'rgba(99, 102, 241, 0.3)' : 'rgba(168, 85, 247, 0.3)',
                          borderRadius: '8px'
                        }}
                      />
                    </Box>

                    {/* Divider line */}
                    <Box sx={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.06)', my: 2 }} />

                    {/* Body Info */}
                    <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {isLocation && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <UsersIcon />
                          <Typography 
                            variant="body2" 
                            sx={{ fontFamily: "'Inter', sans-serif", color: 'text.secondary' }}
                          >
                            Capacity:{' '}
                            <Box component="span" sx={{ color: '#f1f5f9', fontWeight: 600 }}>
                              {item.capacity} Students
                            </Box>
                          </Typography>
                        </Box>
                      )}

                      {isEquipment && (
                        <>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <BoxIcon />
                            <Typography 
                              variant="body2" 
                              sx={{ fontFamily: "'Inter', sans-serif", color: 'text.secondary' }}
                            >
                              In Stock:{' '}
                              <Box component="span" sx={{ color: '#f1f5f9', fontWeight: 600 }}>
                                {item.quantity} units
                              </Box>
                            </Typography>
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            {/* Quality Status Colored Dot */}
                            <Box 
                              sx={{ 
                                width: 10, 
                                height: 10, 
                                borderRadius: '50%', 
                                backgroundColor: getQualityColor(item.qualityStatus),
                                mr: '10px',
                                boxShadow: `0 0 10px ${getQualityColor(item.qualityStatus)}`
                              }} 
                            />
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontFamily: "'Inter', sans-serif", 
                                color: 'text.secondary',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              Condition:{' '}
                              <Box component="span" sx={{ ml: 0.5, color: '#f1f5f9', fontWeight: 600 }}>
                                {getQualityLabel(item.qualityStatus)}
                              </Box>
                            </Typography>
                          </Box>
                        </>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
