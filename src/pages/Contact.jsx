import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Alert,
  Stack
} from '@mui/material';
import { motion } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { config } from '../config';
import { useLocation } from 'react-router-dom';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  phone: Yup.string()
    .matches(/^[0-9]{9}$/, 'El teléfono debe tener 9 dígitos')
    .required('El teléfono es requerido'),
  subject: Yup.string().required('El asunto es requerido'),
  message: Yup.string()
    .required('El mensaje es requerido')
    .min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

const Contact = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const producto = params.get('producto') || '';

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    subject: producto ? `Consulta sobre: ${producto}` : '',
    message: '',
    honeypot: '',
  };

  const subjects = [
    'Consulta sobre productos',
    'Información de talleres',
    'Soporte técnico',
    'Otro',
  ];

  const handleSubmit = async (values, { resetForm }) => {
    if (values.honeypot) {
      return;
    }
    try {
      // Aquí iría la lógica para enviar el formulario a la API
      console.log('Formulario enviado:', values);
      resetForm();
      alert('Mensaje enviado con éxito');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Error al enviar el mensaje');
    }
  };

  return (
    <Box>
      {/* Banner */}
      <Box
        sx={{
          width: '100vw',
          height: '40vh',
          backgroundImage: 'url(/images/contacto.webp)',
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
            sx={{ mb: 2, color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
          >
            Contacto
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              href="https://wa.me/56976322314"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontWeight: 700,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                boxShadow: 3,
                textTransform: 'none',
              }}
            >
              Escribir por WhatsApp
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Contact Information */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33.33%' } }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper sx={{ p: 4, height: '100%' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Información de Contacto
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Ubicación:</strong> {config.contactInfo.location}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Instagram:</strong> {config.contactInfo.instagram}
                </Typography>
                <Box sx={{ my: 2 }}>
                  <Button
                    variant="contained"
                    color="success"
                    href="https://wa.me/56976322314"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      fontWeight: 700,
                      px: 3,
                      py: 1,
                      fontSize: '1rem',
                      textTransform: 'none',
                    }}
                  >
                    WhatsApp directo
                  </Button>
                </Box>
                <Typography variant="body1" paragraph>
                  <strong>Horario de Atención:</strong>
                  <br />
                  Lunes a Viernes: {config.contactInfo.businessHours.weekdays}
                  <br />
                  Sábados: {config.contactInfo.businessHours.saturday}
                </Typography>
                <Typography variant="body1">
                  <strong>Envíos:</strong> {config.contactInfo.shipping}
                </Typography>
              </Paper>
            </motion.div>
          </Box>

          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 66.66%' } }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Envíanos un Mensaje
                </Typography>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                          <Box sx={{ flex: '1 1 50%' }}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="name"
                              label="Nombre"
                              error={touched.name && Boolean(errors.name)}
                              helperText={touched.name && errors.name}
                            />
                          </Box>
                          <Box sx={{ flex: '1 1 50%' }}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="email"
                              label="Email"
                              error={touched.email && Boolean(errors.email)}
                              helperText={touched.email && errors.email}
                            />
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                          <Box sx={{ flex: '1 1 50%' }}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="phone"
                              label="Teléfono"
                              error={touched.phone && Boolean(errors.phone)}
                              helperText={touched.phone && errors.phone}
                            />
                          </Box>
                          <Box sx={{ flex: '1 1 50%' }}>
                            <Field
                              as={TextField}
                              fullWidth
                              select
                              name="subject"
                              label="Asunto"
                              error={touched.subject && Boolean(errors.subject)}
                              helperText={touched.subject && errors.subject}
                            >
                              {subjects.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Field>
                          </Box>
                        </Box>
                        <Box>
                          <Field
                            as={TextField}
                            fullWidth
                            multiline
                            rows={4}
                            name="message"
                            label="Mensaje"
                            error={touched.message && Boolean(errors.message)}
                            helperText={touched.message && errors.message}
                          />
                        </Box>
                        <Box>
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                              mt: 2,
                              py: 1.5,
                              backgroundColor: 'primary.main',
                              '&:hover': {
                                backgroundColor: 'primary.dark',
                              },
                            }}
                          >
                            Enviar Mensaje
                          </Button>
                        </Box>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Paper>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact; 