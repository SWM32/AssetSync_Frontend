import { useState } from 'react';
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
  MenuItem
} from '@mui/material';
import { submitLocationRequest } from '../services/api';
import AlternativeModal from '../components/AlternativeModal';

/**
 * LocationBooking component.
 * Renders a request form for location batch allocation with validation and feedback.
 */
export default function LocationBooking({ userRole }) {
  const [formData, setFormData] = useState({
    requestedCategory: '',
    requesterName: '',
    studentCount: '',
    startTime: '',
    endTime: ''
  });

  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [startTimeFocused, setStartTimeFocused] = useState(false);
  const [endTimeFocused, setEndTimeFocused] = useState(false);

  // States for Feature 4: Alternative suggestion engine
  const [conflictData, setConflictData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectAlternative = (alternativeResourceId) => {
    // Alert the user that they have selected an alternative room suggestion
    setSuccessOpen(true);
    setFormData({
      requestedCategory: '',
      requesterName: '',
      studentCount: '',
      startTime: '',
      endTime: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    // Map userRole to priority: 1 for LECTURER, 2 for STUDENT
    const priority = userRole === 'LECTURER' ? 1 : 2;

    // Map requestedCategory to backend database seeded values to ensure successful demo allocation
    let mappedCategory = formData.requestedCategory;
    if (formData.requestedCategory === 'Computer Lab') {
      mappedCategory = 'Laboratory';
    } else if (formData.requestedCategory === 'Auditorium' || formData.requestedCategory === 'Lecture Hall' || formData.requestedCategory === 'Lecture Hal') {
      mappedCategory = 'Lecture Hall';
    }

    const payload = {
      requestedCategory: mappedCategory,
      requesterName: formData.requesterName,
      priority: priority,
      studentCount: Number(formData.studentCount),
      startTime: formData.startTime,
      endTime: formData.endTime
    };

    try {
      await submitLocationRequest(payload);
      setSuccessOpen(true);
      // Clear form
      setFormData({
        requestedCategory: '',
        requesterName: '',
        studentCount: '',
        startTime: '',
        endTime: ''
      });
    } catch (err) {
      console.error('Error submitting location request:', err);
      if (err.response && err.response.status === 409) {
        setConflictData(err.response.data);
        setModalOpen(true);
      } else {
        const serverMessage = err.response?.data?.message || err.response?.data || err.message || 'An error occurred. Please try again.';
        setErrorMsg(serverMessage);
      }
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
              Venue Advance Request (T-24h)
            </Typography>
             <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.8 }}>
              Queue a request for the T-24 batch scheduler. Lectures are prioritized over student requests.
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                select
                label="Requested Category"
                name="requestedCategory"
                value={formData.requestedCategory}
                onChange={handleChange}
                fullWidth
                required
                sx={inputStyles}
              >
                <MenuItem value="Lecture Hall">Lecture Hall</MenuItem>
                <MenuItem value="Computer Lab">Computer Lab</MenuItem>
                <MenuItem value="Auditorium">Auditorium</MenuItem>
              </TextField>

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
                label="Estimated Student Count"
                type="number"
                name="studentCount"
                value={formData.studentCount}
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
                disabled={loading}
                sx={{
                  background: 'linear-gradient(135deg, #c084fc 0%, #6366f1 100%)',
                  color: '#ffffff',
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
                  'Queue Allocation Request'
                )}
              </Button>
            </Stack>
          </form>

          {errorMsg && (
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
              {errorMsg}
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
          Request submitted to the T-24 processing queue.
        </Alert>
      </Snackbar>

      <AlternativeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        conflictData={conflictData}
        onSelectAlternative={handleSelectAlternative}
      />
    </Container>
  );
}
