import { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Stack
} from '@mui/material';
import { triggerBatchProcess } from '../services/api';

/**
 * BatchProcessor component.
 * Renders an administrative panel to manually trigger the batch allocation algorithm.
 */
export default function BatchProcessor() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleTrigger = async () => {
    setLoading(true);
    setSuccess(false);
    setErrorMsg(null);

    try {
      // Trigger the batch process backend API
      await triggerBatchProcess();
      
      // Simulate a small processing delay for visualization (e.g., 1 second)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSuccess(true);
    } catch (err) {
      console.error('Error triggering batch process:', err);
      const serverMessage = err.response?.data || err.message || 'An error occurred during algorithm execution.';
      setErrorMsg(serverMessage);
    } finally {
      setLoading(false);
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
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Box>
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
                System Admin: Batch Allocator
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.8, maxW: '500px', mx: 'auto', mt: 2 }}>
                In production, this process runs automatically at 00:00. For demonstration purposes, trigger the algorithm manually below.
              </Typography>
            </Box>

            <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', py: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                disabled={loading}
                onClick={handleTrigger}
                sx={{
                  width: '100%',
                  maxWidth: '400px',
                  py: 2.5,
                  borderRadius: '16px',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  letterSpacing: '0.5px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
                    boxShadow: '0 12px 32px rgba(99, 102, 241, 0.45)',
                    transform: 'translateY(-2px)'
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
                  <CircularProgress size={28} sx={{ color: 'secondary.light' }} />
                ) : (
                  'Run T-24 Allocation Algorithm'
                )}
              </Button>
            </Box>

            {success && (
              <Alert
                severity="success"
                variant="filled"
                sx={{
                  width: '100%',
                  maxWidth: '500px',
                  borderRadius: '12px',
                  fontFamily: "'Inter', sans-serif",
                  textAlign: 'left',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)',
                  '& .MuiAlert-icon': {
                    fontSize: '24px'
                  }
                }}
              >
                Algorithm execution complete. Check Master Calendar for assignments or conflicts.
              </Alert>
            )}

            {errorMsg && (
              <Alert
                severity="error"
                variant="filled"
                sx={{
                  width: '100%',
                  maxWidth: '500px',
                  borderRadius: '12px',
                  fontFamily: "'Inter', sans-serif",
                  textAlign: 'left',
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
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
