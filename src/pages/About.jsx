import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import apiService from '../services/api';

const About = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const data = await apiService.getAboutUs();
        setContent(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar la información sobre nosotros');
        console.error('Error fetching about us:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUs();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Box>
      {/* Banner */}
      <Box
        sx={{
          width: '100vw',
          height: '40vh',
          backgroundImage: 'url(/images/lanas_2.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, width: '100%', px: { xs: 2, md: 8 } }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 6, color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
          >
            Sobre Nosotros
          </Typography>
        </Box>
      </Box>
      {/* Contenido */}
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="body1" paragraph>
              {content}
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About; 