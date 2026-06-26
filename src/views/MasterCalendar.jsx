import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    List,
    ListItem,
    Divider,
    Chip,
    CircularProgress,
    Alert
} from '@mui/material';
import { fetchCalendarEvents } from '../services/api';

const MasterCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                const data = await fetchCalendarEvents();
                setEvents(data);
            } catch (err) {
                setError('Failed to fetch calendar events.');
            } finally {
                setLoading(false);
            }
        };
        loadEvents();
    }, []);

    const formatDateTime = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    mb: 4,
                    background: 'linear-gradient(135deg, #c084fc 0%, #6366f1 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}
            >
                Master Resource Schedule
            </Typography>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
                    <CircularProgress color="primary" />
                </Box>
            )}

            {!loading && error && (
                <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>
            )}

            {!loading && !error && events.length === 0 && (
                <Alert severity="info" sx={{ borderRadius: '16px' }}>
                    No active allocations or bookings scheduled.
                </Alert>
            )}

            {!loading && !error && events.length > 0 && (
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        backgroundColor: 'background.paper',
                        overflow: 'hidden'
                    }}
                >
                    <List disablePadding>
                        {events.map((event, index) => (
                            <React.Fragment key={event.id || index}>
                                <ListItem
                                    sx={{
                                        py: 2.5,
                                        px: { xs: 2, sm: 4 },
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        alignItems: { xs: 'flex-start', sm: 'center' },
                                        justifyContent: 'space-between',
                                        gap: 2,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.02)'
                                        }
                                    }}
                                >
                                    <Box sx={{ flex: 1 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                color: 'text.primary',
                                                mb: 0.5
                                            }}
                                        >
                                            {event.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.8 }}>
                                            {formatDateTime(event.start)} – {formatDateTime(event.end)}
                                        </Typography>
                                    </Box>

                                    <Chip
                                        label={event.resourceType}
                                        sx={{
                                            backgroundColor: event.resourceType === 'LOCATION' ? '#2563eb' : '#7c3aed', // Blue vs Purple
                                            color: '#ffffff',
                                            fontWeight: 600,
                                            fontSize: '0.75rem',
                                            borderRadius: '8px',
                                            px: 1.5,
                                            textTransform: 'uppercase'
                                        }}
                                    />
                                </ListItem>
                                {index < events.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            )}
        </Container>
    );
};

export default MasterCalendar;
