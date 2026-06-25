
import { Box, Card, CardContent, Typography, Button, Grid, Container } from '@mui/material';

// Nice custom SVG icons to avoid external package dependencies
const LecturerIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    <line x1="12" y1="6" x2="12" y2="12"></line>
    <line x1="9" y1="9" x2="15" y2="9"></line>
  </svg>
);

const StudentIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
  </svg>
);

/**
 * Login landing page component.
 * Prompts user to select a role (Lecturer or Student) to proceed.
 */
export default function Login({ onSelectRole }) {
  return (
    <Container maxWidth="sm" sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
      <Card
        sx={{
          width: '100%',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.45) 0%, rgba(15, 23, 42, 0.65) 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden',
          p: { xs: 2, sm: 4 }
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                letterSpacing: '-1.5px',
                background: 'linear-gradient(135deg, #c084fc 0%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              AssetSync
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, opacity: 0.8, px: 2 }}>
              Select a demo role below to access the University Resource Management portal.
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mt: 1, alignItems: 'stretch' }}>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', width: '100%' }}>
              <Button
                fullWidth
                onClick={() => onSelectRole('LECTURER')}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  flexGrow: 1,
                  gap: 2,
                  p: 4,
                  borderRadius: '20px',
                  border: '1px solid rgba(192, 132, 252, 0.15)',
                  background: 'linear-gradient(135deg, rgba(192, 132, 252, 0.02) 0%, rgba(168, 85, 247, 0.05) 100%)',
                  color: '#fff',
                  textTransform: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    borderColor: 'rgba(192, 132, 252, 0.5)',
                    background: 'linear-gradient(135deg, rgba(192, 132, 252, 0.08) 0%, rgba(168, 85, 247, 0.12) 100%)',
                    boxShadow: '0 12px 24px -8px rgba(168, 85, 247, 0.35)',
                    '& .icon-wrapper': {
                      transform: 'scale(1.1)',
                      color: '#c084fc',
                      background: 'rgba(192, 132, 252, 0.2)',
                      boxShadow: '0 0 15px rgba(192, 132, 252, 0.3)'
                    }
                  }
                }}
              >
                <Box
                  className="icon-wrapper"
                  sx={{
                    p: 2,
                    borderRadius: '16px',
                    color: 'text.secondary',
                    background: 'rgba(255, 255, 255, 0.03)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1
                  }}
                >
                  <LecturerIcon />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, mb: 0.5 }}>
                    Lecturer
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.4, display: 'block' }}>
                    Access elevated booking parameters and view full schedule
                  </Typography>
                </Box>
              </Button>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ display: 'flex', width: '100%' }}>
              <Button
                fullWidth
                onClick={() => onSelectRole('STUDENT')}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  flexGrow: 1,
                  gap: 2,
                  p: 4,
                  borderRadius: '20px',
                  border: '1px solid rgba(99, 102, 241, 0.15)',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(79, 70, 229, 0.05) 100%)',
                  color: '#fff',
                  textTransform: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    borderColor: 'rgba(99, 102, 241, 0.5)',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(79, 70, 229, 0.12) 100%)',
                    boxShadow: '0 12px 24px -8px rgba(99, 102, 241, 0.35)',
                    '& .icon-wrapper': {
                      transform: 'scale(1.1)',
                      color: '#818cf8',
                      background: 'rgba(99, 102, 241, 0.2)',
                      boxShadow: '0 0 15px rgba(99, 102, 241, 0.3)'
                    }
                  }
                }}
              >
                <Box
                  className="icon-wrapper"
                  sx={{
                    p: 2,
                    borderRadius: '16px',
                    color: 'text.secondary',
                    background: 'rgba(255, 255, 255, 0.03)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1
                  }}
                >
                  <StudentIcon />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, mb: 0.5 }}>
                    Student
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.4, display: 'block' }}>
                    Request standard resource allocation & checkouts
                  </Typography>
                </Box>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
