import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Box
} from '@mui/material';

const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fb923c', marginRight: '10px' }}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

export default function AlternativeModal({ open, onClose, conflictData, onSelectAlternative }) {
  const alternatives = conflictData?.alternativeResources || [];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'linear-gradient(135deg, #111b36 0%, #0b1329 100%)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
          p: 2
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          color: '#fb923c' // Amber/orange warning color
        }}
      >
        <WarningIcon />
        Resource Unavailable
      </DialogTitle>
      
      <DialogContent sx={{ mt: 1 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            fontFamily: "'Inter', sans-serif", 
            color: 'text.primary', 
            mb: 3, 
            opacity: 0.9 
          }}
        >
          {conflictData?.message || 'The requested resource is unavailable. Please choose one of the alternative options below.'}
        </Typography>

        {alternatives.length > 0 && (
          <>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontFamily: "'Outfit', sans-serif", 
                fontWeight: 600, 
                color: 'text.secondary', 
                mb: 2, 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em' 
              }}
            >
              Suggested Alternatives
            </Typography>

            <Grid container spacing={2}>
              {alternatives.map((resource) => (
                <Grid item xs={12} key={resource.id}>
                  <Card
                    sx={{
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: 'rgba(192, 132, 252, 0.25)',
                        background: 'rgba(255, 255, 255, 0.03)'
                      }
                    }}
                  >
                    <CardContent 
                      sx={{ 
                        p: 2.5, 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' }, 
                        alignItems: { xs: 'flex-start', sm: 'center' }, 
                        justifyContent: 'space-between',
                        gap: 2,
                        '&:last-child': { pb: 2.5 }
                      }}
                    >
                      <Box>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontFamily: "'Outfit', sans-serif", 
                            fontWeight: 700, 
                            color: '#fff', 
                            fontSize: '1.05rem', 
                            mb: 0.5 
                          }}
                        >
                          {resource.name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              fontFamily: "'Inter', sans-serif", 
                              color: 'primary.light', 
                              backgroundColor: 'rgba(192, 132, 252, 0.12)', 
                              px: 1, 
                              py: 0.2, 
                              borderRadius: '6px',
                              fontWeight: 600
                            }}
                          >
                            {resource.category}
                          </Typography>
                          {resource.capacity !== null && resource.capacity !== undefined && (
                            <Typography variant="body2" sx={{ fontFamily: "'Inter', sans-serif", color: 'text.secondary', fontSize: '0.82rem' }}>
                              Capacity: <strong>{resource.capacity} Students</strong>
                            </Typography>
                          )}
                          {resource.quantity !== null && resource.quantity !== undefined && (
                            <Typography variant="body2" sx={{ fontFamily: "'Inter', sans-serif", color: 'text.secondary', fontSize: '0.82rem' }}>
                              Quantity: <strong>{resource.quantity}</strong>
                            </Typography>
                          )}
                        </Box>
                      </Box>

                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          onSelectAlternative(resource.id);
                          onClose();
                        }}
                        sx={{
                          background: 'linear-gradient(135deg, #c084fc 0%, #6366f1 100%)',
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontWeight: 700,
                          px: 2,
                          py: 1,
                          alignSelf: { xs: 'stretch', sm: 'auto' },
                          '&:hover': {
                            opacity: 0.9
                          }
                        }}
                      >
                        Book This Instead
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button 
          onClick={onClose} 
          sx={{ 
            fontFamily: "'Inter', sans-serif", 
            color: 'text.secondary', 
            textTransform: 'none', 
            fontWeight: 600 
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
