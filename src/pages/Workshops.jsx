import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Paper,
  Button,
  Chip,
  Stack
} from '@mui/material';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';

const Workshops = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getProducts();
        console.log('API Response:', response);
        setServices(response.data.servicios || []);
        setError(null);
      } catch (err) {
        setError('Error al cargar los talleres');
        console.error('Error fetching workshops:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          width: '100vw',
          height: '40vh',
          backgroundImage: 'url(/images/talleres.webp)',
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Talleres
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              Aprende el arte del tejido con nosotros
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'white',
                mb: 2,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                fontSize: { xs: '1rem', md: '1.2rem' },
                maxWidth: 700,
                mx: 'auto',
                textAlign: 'center',
              }}
            >
              Además de comercializar productos, @teje_lanas.vivi organiza talleres de crochet en su espacio llamado TEJElANAS, ubicado en Laguna de Zapallar, fomentando la comunidad y el aprendizaje del tejido.
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* Workshops Grid */}
      <Box sx={{ width: '100vw', px: { xs: 2, md: 8 }, py: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            '& > *': {
              flex: {
                xs: '1 1 100%',
                sm: '1 1 calc(50% - 16px)',
              },
            },
          }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={service.imgs[0]}
                  alt={service.nombre}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {service.nombre}
                  </Typography>
                  
                  <Stack spacing={2} sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarTodayIcon color="primary" />
                      <Typography variant="body1">
                        {service.fecha}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon color="primary" />
                      <Typography variant="body1">
                        {service.ubicacion}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <GroupIcon color="primary" />
                      <Typography variant="body1">
                        Cupos disponibles: {service.cupos}
                      </Typography>
                    </Box>
                  </Stack>

                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      size="large"
                      onClick={() => window.location.href = 'https://wa.me/56976322314'}
                    >
                      Inscribirse
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Workshops; 