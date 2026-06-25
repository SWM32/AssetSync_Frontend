import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Stack,
  Chip,
  Autocomplete
} from '@mui/material';
import { bookEquipment, fetchResources } from '../services/api';

/**
 * EquipmentBooking component.
 * Renders a request form for real-time equipment checkout with error/success feedback.
 * 
 * @param {Object} props
 * @param {string} props.userRole - The active user role passed from root
 */
export default function EquipmentBooking({ userRole }) {
  const [formData, setFormData] = useState({
    resourceId: '',
    requesterName: '',
    requestedQuantity: '',
    startTime: '',
    endTime: ''
  });

  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [conflictError, setConflictError] = useState(null);
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const [startTimeFocused, setStartTimeFocused] = useState(false);
  const [endTimeFocused, setEndTimeFocused] = useState(false);

  // Fetch equipment list on mount
  useEffect(() => {
    const loadEquipment = async () => {
      try {
        const data = await fetchResources('EQUIPMENT');
        setEquipmentOptions(data || []);
      } catch (err) {
        console.error('Error fetching equipment options:', err);
        setFetchError('Could not retrieve equipment catalog suggestions from server.');
      }
    };
    loadEquipment();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setConflictError(null);

    // Prepare payload using the userRole prop
    const payload = {
      resourceId: Number(formData.resourceId),
      requesterName: formData.requesterName,
      userRole: userRole,
      requestedQuantity: Number(formData.requestedQuantity),
      startTime: formData.startTime,
      endTime: formData.endTime
    };

    try {
      const result = await bookEquipment(payload);

      if (typeof result === 'string') {
        // Backend returned 409 Conflict string
        setConflictError(result);
      } else if (result && result.status === 'ALLOCATED') {
        // Backend successfully allocated
        setSuccessOpen(true);
        setSelectedEquipment(null);
        setFormData({
          resourceId: '',
          requesterName: '',
          requestedQuantity: '',
          startTime: '',
          endTime: ''
        });
      } else {
        setConflictError('An unexpected response format was returned from the server.');
      }
    } catch (err) {
      console.error('Error submitting booking request:', err);
      const serverMessage = err.response?.data || err.message || 'An error occurred during booking. Please try again.';
      setConflictError(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      transition: 'all 0.2s',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
      },
      '&.Mui-focused': {
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
      }
    },
    '& .MuiInputLabel-root': {
      fontFamily: "'Inter', sans-serif",
    },
    '& .MuiOutlinedInput-input': {
      fontFamily: "'Inter', sans-serif",
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
      <Card
        sx={{
          width: '100%',
          maxWidth: '650px',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden'
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                background: 'linear-gradient(135deg, #c084fc 0%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Request Equipment Checkout
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.8 }}>
              Check out movable resources instantly with real-time validation.
            </Typography>
          </Box>

          {fetchError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px', fontFamily: "'Inter', sans-serif" }}>
              {fetchError}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Autocomplete
                options={equipmentOptions}
                getOptionLabel={(option) => `${option.name} (ID: ${option.id})`}
                value={selectedEquipment}
                onChange={(event, newValue) => {
                  setSelectedEquipment(newValue);
                  setFormData((prev) => ({
                    ...prev,
                    resourceId: newValue ? String(newValue.id) : ''
                  }));
                }}
                renderOption={(props, option) => {
                  const optionProps = { ...props };
                  delete optionProps.key;
                  return (
                    <Box 
                      key={option.id} 
                      component="li" 
                      {...optionProps}
                      sx={{
                        display: 'flex !important',
                        flexDirection: 'row !important',
                        justifyContent: 'space-between !important',
                        alignItems: 'center !important',
                        width: '100% !important',
                        py: '10px !important',
                        px: '16px !important',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        transition: 'background-color 0.2s',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.06) !important',
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontFamily: "'Outfit', sans-serif", 
                            fontWeight: 600, 
                            color: '#f8fafc' 
                          }}
                        >
                          {option.name}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: 'text.secondary', 
                            fontSize: '0.75rem' 
                          }}
                        >
                          Category: {option.category} • ID: {option.id}
                        </Typography>
                      </Box>
                      <Box sx={{ flexGrow: 1 }} />
                      <Chip
                        label={`${option.quantity} available`}
                        size="small"
                        sx={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          backgroundColor: 'rgba(168, 85, 247, 0.15)',
                          color: '#c084fc',
                          border: '1px solid rgba(168, 85, 247, 0.3)',
                          borderRadius: '8px',
                          ml: 2
                        }}
                      />
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Equipment..."
                    required
                    placeholder="Type to search equipment (e.g., Projector)..."
                    sx={inputStyles}
                  />
                )}
                slotProps={{
                  paper: {
                    sx: {
                      borderRadius: '16px',
                      backgroundColor: '#111b36',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      backgroundImage: 'none',
                      mt: 1,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                      '& .MuiAutocomplete-listbox': {
                        padding: 0,
                        maxHeight: '300px'
                      }
                    }
                  }
                }}
              />

              <TextField
                label="Requester Name"
                type="text"
                name="requesterName"
                value={formData.requesterName}
                onChange={handleChange}
                fullWidth
                required
                sx={inputStyles}
              />

              <TextField
                label="Requested Quantity"
                type="number"
                name="requestedQuantity"
                value={formData.requestedQuantity}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{ inputProps: { min: 1 } }}
                sx={inputStyles}
              />

              <TextField
                label="Start Time"
                type={startTimeFocused || formData.startTime ? "datetime-local" : "text"}
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                onFocus={() => setStartTimeFocused(true)}
                onBlur={() => setStartTimeFocused(false)}
                fullWidth
                required
                InputLabelProps={{ shrink: startTimeFocused || !!formData.startTime }}
                sx={inputStyles}
              />

              <TextField
                label="End Time"
                type={endTimeFocused || formData.endTime ? "datetime-local" : "text"}
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                onFocus={() => setEndTimeFocused(true)}
                onBlur={() => setEndTimeFocused(false)}
                fullWidth
                required
                InputLabelProps={{ shrink: endTimeFocused || !!formData.endTime }}
                sx={inputStyles}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  background: 'linear-gradient(135deg, #c084fc 0%, #6366f1 100%)',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(168, 85, 247, 0.25)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    opacity: 0.9,
                    boxShadow: '0 6px 16px rgba(168, 85, 247, 0.35)',
                    transform: 'translateY(-1px)'
                  },
                  '&:active': {
                    transform: 'translateY(1px)'
                  },
                  '&.Mui-disabled': {
                    background: 'rgba(255, 255, 255, 0.12)',
                    color: 'rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'primary.light' }} />
                ) : (
                  'Submit Request'
                )}
              </Button>
            </Stack>
          </form>

          {conflictError && (
            <Alert
              severity="error"
              variant="filled"
              sx={{
                mt: 4,
                borderRadius: '12px',
                fontFamily: "'Inter', sans-serif",
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#fca5a5',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                '& .MuiAlert-icon': {
                  color: '#ef4444'
                }
              }}
            >
              {conflictError}
            </Alert>
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={successOpen}
        autoHideDuration={5000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSuccessOpen(false)}
          severity="success"
          variant="filled"
          sx={{
            width: '100%',
            borderRadius: '12px',
            fontFamily: "'Inter', sans-serif",
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)'
          }}
        >
          Success: Equipment Allocated.
        </Alert>
      </Snackbar>
    </Container>
  );
}
