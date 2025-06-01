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
  Button,
  Stack
} from '@mui/material';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getProducts();
        console.log('API Response:', response);
        setProducts(response.data.productos || []);
        setServices(response.data.servicios || []);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error('Error fetching data:', err);
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
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          height: { xs: '50vh', md: '70vh' },
          minHeight: 320,
          maxHeight: 600,
          backgroundImage: 'url(/images/Banner.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.25)', // overlay más translúcido
            zIndex: 1,
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              sx={{
                color: 'white',
                fontWeight: 900,
                mb: 2,
                textShadow: '0 4px 24px rgba(0,0,0,0.7), 2px 2px 4px rgba(0,0,0,0.3)',
                fontSize: { xs: '2.2rem', md: '3.5rem', lg: '4.5rem' },
                textAlign: 'center',
                letterSpacing: 1,
              }}
            >
              Arte y tradición en cada tejido
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                mb: 4,
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                fontSize: { xs: '1.1rem', md: '1.7rem', lg: '2.2rem' },
                textAlign: 'center',
                fontWeight: 500,
              }}
            >
              Descubre la belleza del tejido artesanal
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/products"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  fontWeight: 700,
                  boxShadow: 3,
                }}
              >
                Ver Productos
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                component={RouterLink}
                to="/workshops"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  fontWeight: 700,
                  borderColor: 'white',
                  color: 'white',
                  boxShadow: 2,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                  },
                }}
              >
                Talleres
              </Button>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ mb: 6, textAlign: 'center' }}>
          Productos Destacados
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            '& > *': {
              flex: {
                xs: '1 1 100%',
                sm: '1 1 calc(50% - 16px)',
                md: '1 1 calc(33.33% - 22px)',
              },
            },
          }}
        >
          {products.slice(0, 3).map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imgs[0]}
                  alt={product.nombre}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {product.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.descripcion}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.precio.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>

      {/* Featured Services Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: 6, textAlign: 'center' }}>
            Próximos Talleres
          </Typography>
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
            {services.slice(0, 2).map((service) => (
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
                    <Typography variant="body1" paragraph>
                      {service.fecha}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {service.ubicacion}
                    </Typography>
                    <Typography variant="body1">
                      Cupos disponibles: {service.cupos}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 