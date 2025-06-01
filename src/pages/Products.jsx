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
  Grid,
  Chip,
  Stack
} from '@mui/material';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getProducts();
        console.log('API Response:', response);
        setProducts(response.data.productos || []);
        setError(null);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error('Error fetching products:', err);
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
      {/* Banner */}
      <Box
        sx={{
          width: '100vw',
          height: '40vh',
          backgroundImage: 'url(/images/portada2.webp)',
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
            Productos
          </Typography>
        </Box>
      </Box>

      {/* Products Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
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
          {products.map((product) => (
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
                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    ${product.precio.toLocaleString()}
                  </Typography>
                  {product.tallas.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Tallas disponibles:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {product.tallas.map((talla) => (
                          <Chip key={talla} label={talla} size="small" />
                        ))}
                      </Stack>
                    </Box>
                  )}
                  {product.colores.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Colores disponibles:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {product.colores.map((color) => (
                          <Chip 
                            key={color} 
                            label={color} 
                            size="small"
                            sx={{ 
                              backgroundColor: color.toLowerCase(),
                              color: ['blanco', 'crema', 'beige'].includes(color.toLowerCase()) ? 'black' : 'white'
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Products; 