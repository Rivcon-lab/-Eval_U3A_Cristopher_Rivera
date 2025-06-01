import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f191ac', // rosa fuerte
      light: '#f6a6bb', // rosa medio
      dark: '#222', // negro para contraste fuerte
      contrastText: '#fff', // texto blanco sobre rosa fuerte
    },
    secondary: {
      main: '#fae6e7', // rosa muy claro
      light: '#f7eeed', // casi blanco
      dark: '#111', // negro profundo
      contrastText: '#222', // texto negro
    },
    background: {
      default: '#f7eeed', // fondo general
      paper: '#fae6e7', // tarjetas y papeles
    },
    info: {
      main: '#fde4cf', // durazno claro
    },
    success: {
      main: '#b9fbc0', // verde pastel para acentos
    },
    warning: {
      main: '#ffcfd2', // rosa claro
    },
    error: {
      main: '#f191ac', // rosa fuerte
    },
    text: {
      primary: '#111', // negro profundo para excelente contraste
      secondary: '#444', // gris oscuro
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '3.5rem', lineHeight: 1.2 },
    h2: { fontWeight: 700, fontSize: '2.75rem', lineHeight: 1.2 },
    h3: { fontWeight: 600, fontSize: '2.25rem', lineHeight: 1.2 },
    h4: { fontWeight: 600, fontSize: '1.75rem', lineHeight: 1.2 },
    h5: { fontWeight: 500, fontSize: '1.5rem', lineHeight: 1.2 },
    h6: { fontWeight: 500, fontSize: '1.25rem', lineHeight: 1.2 },
    body1: { fontSize: '1rem', lineHeight: 1.5 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
  },
  // Puedes agregar aquí los overrides de componentes si los necesitas
});

export default theme; 