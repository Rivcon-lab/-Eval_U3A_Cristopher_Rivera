import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';

const MainLayout = function(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = function() {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Inicio', path: '/' },
    { text: 'Quiénes Somos', path: '/about' },
    { text: 'Productos', path: '/products' },
    { text: 'Talleres', path: '/workshops' },
    { text: 'FAQ', path: '/faq' },
    { text: 'Contacto', path: '/contact' },
  ];

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            component={RouterLink}
            to={item.path}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#FF69B4', borderRadius: 0 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', mr: 2 }}>
            <img src="/images/logo.png" alt="Logo" style={{ height: 40, marginRight: 12 }} />
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'bold',
              }}
            >
              Tejelanas Vivi
            </Typography>
          </Box>
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={RouterLink}
                  to={item.path}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, py: 4, width: '100vw', px: 0 }}>
        {props.children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: '#FF69B4',
          color: 'white',
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body1" align="center">
              © 2024 Tejelanas Vivi - Laguna de Zapallar, Chile
            </Typography>
            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
              Instagram: <a href="https://www.instagram.com/teje_lanas.vivi" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline', fontWeight: 500 }}>@teje_lanas.vivi</a>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              href="https://instagram.com/teje_lanas.vivi"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ backgroundColor: '#E1306C', color: 'white', '&:hover': { backgroundColor: '#C13584' } }}
            >
              <InstagramIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout; 