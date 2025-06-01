import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import apiService from '../services/api';

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await apiService.getFaqs();
        setFaqs(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar las preguntas frecuentes');
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const categories = ['all', ...new Set(faqs.map(faq => faq.category))];

  const filteredFaqs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

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
          backgroundImage: 'url(/images/lanas.webp)',
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
            Preguntas Frecuentes
          </Typography>
        </Box>
      </Box>

      {/* FAQ Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, mb: 4 }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4 }}
          >
            {categories.map((category) => (
              <Tab
                key={category}
                label={category === 'all' ? 'Todas' : category}
                value={category}
              />
            ))}
          </Tabs>

          <Box sx={{ mt: 4 }}>
            {filteredFaqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: faq.id * 0.1 }}
              >
                <Accordion
                  sx={{
                    mb: 2,
                    '&:before': {
                      display: 'none',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      backgroundColor: 'background.default',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      {faq.titulo}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">{faq.respuesta}</Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))}
          </Box>
        </Paper>

        {/* Contact Section */}
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            ¿No encuentras lo que buscas?
          </Typography>
          <Typography variant="body1" paragraph>
            Contáctanos a través de Instagram o WhatsApp y con gusto te ayudaremos.
          </Typography>
          <Typography variant="body1" color="primary">
            Instagram: @teje_lanas.vivi
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default FAQPage; 