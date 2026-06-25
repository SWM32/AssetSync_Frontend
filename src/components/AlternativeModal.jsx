import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  useTheme
} from '@mui/material';

// Inline simple SVG icons to avoid external dependencies
const WarningIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const BoxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
    <polygon points="12 22.08 12 12 3 6.92 3 17.08 12 22.08"></polygon>
    <polygon points="12 12 21 6.92 21 17.08 12 22.08"></polygon>
    <polygon points="12 2 21 6.92 12 12 3 6.92 12 2"></polygon>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

/**
 * AlternativeModal component.
 * Displays suggestion cards for alternative resources/times when a conflict occurs.
 */
export default function AlternativeModal({ open, onClose, conflictData, onSelectAlternative }) {
  const theme = useTheme();

  const message = conflictData?.message || 'Requested resource is currently unavailable.';
  const alternativeResources = conflictData?.alternativeResources || [];
  const alternativeTimes = conflictData?.alternativeTimes || [];

  const handleSelect = (resourceId) => {
    if (onSelectAlternative) {
      onSelectAlternative(resourceId);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)'
          }
        }
      }}
      PaperProps={{
        sx: {
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(135deg, #111b36 0%, #0b1126 100%)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          p: 1
        }
      }}
    >
      {/* Title */}
      <DialogTitle 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          pb: 1,
          pt: 3,
          px: 4
        }}
      >
        <WarningIcon />
        <Typography 
          variant="h5" 
          sx={{ 
            fontFamily: "'Outfit', sans-serif", 
            fontWeight: 800, 
            color: '#f97316' 
          }}
        >
          Resource Unavailable
        </Typography>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ px: 4, py: 2 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            fontFamily: "'Inter', sans-serif", 
            color: 'text.secondary', 
            mb: 4, 
            lineHeight: 1.6 
          }}
        >
          {message}
        </Typography>

        {/* Alternative Resources Section */}
        {alternativeResources.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontFamily: "'Outfit', sans-serif", 
                fontWeight: 700, 
                color: '#94a3b8', 
                textTransform: 'uppercase', 
                letterSpacing: '1px',
                mb: 2 
              }}
            >
              Suggested Alternatives
            </Typography>

            <Grid container spacing={2}>
              {alternativeResources.map((resource) => {
                const isLocation = resource.resourceType === 'LOCATION';
                return (
                  <Grid item xs={12} sm={6} md={4} key={resource.id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        background: 'rgba(255, 255, 255, 0.02)',
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          borderColor: 'rgba(168, 85, 247, 0.3)',
                          background: 'rgba(255, 255, 255, 0.04)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontFamily: "'Outfit', sans-serif",
                              fontWeight: 700,
                              color: '#ffffff',
                              lineHeight: 1.3,
                              fontSize: '1rem'
                            }}
                          >
                            {resource.name}
                          </Typography>
                        </Box>

                        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                          <Chip
                            label={resource.category}
                            size="small"
                            sx={{
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 600,
                              fontSize: '0.65rem',
                              backgroundColor: isLocation ? 'rgba(99, 102, 241, 0.12)' : 'rgba(168, 85, 247, 0.12)',
                              color: isLocation ? '#818cf8' : '#c084fc',
                              border: '1px solid rgba(255,255,255,0.05)'
                            }}
                          />
                        </Stack>

                        <Stack spacing={1} sx={{ mb: 3, flexGrow: 1 }}>
                          {isLocation && resource.capacity && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <UsersIcon />
                              <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: "'Inter', sans-serif" }}>
                                Capacity: <strong>{resource.capacity} students</strong>
                              </Typography>
                            </Box>
                          )}
                          {!isLocation && resource.quantity !== undefined && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <BoxIcon />
                              <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: "'Inter', sans-serif" }}>
                                Available: <strong>{resource.quantity} units</strong>
                              </Typography>
                            </Box>
                          )}
                        </Stack>

                        <Button
                          variant="contained"
                          fullWidth
                          size="small"
                          onClick={() => handleSelect(resource.id)}
                          sx={{
                            background: 'linear-gradient(135deg, #c084fc 0%, #6366f1 100%)',
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: 700,
                            py: 1,
                            transition: 'all 0.2s',
                            '&:hover': {
                              opacity: 0.9,
                              transform: 'scale(1.02)'
                            }
                          }}
                        >
                          Book This Instead
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}

        {/* Alternative Times Section (for location bookings) */}
        {alternativeTimes.length > 0 && (
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                mb: 2
              }}
            >
              Suggested Alternative Times
            </Typography>
            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ gap: 1.5 }}>
              {alternativeTimes.map((time, idx) => (
                <Chip
                  key={idx}
                  label={time}
                  icon={<CalendarIcon />}
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    color: '#f1f5f9',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    px: 1.5,
                    py: 2,
                    '& svg': {
                      stroke: '#c084fc !important'
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ px: 4, pb: 4, pt: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            textTransform: 'none',
            color: '#cbd5e1',
            px: 3,
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)'
            }
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
