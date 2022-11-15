import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';


import Container from '@mui/material/Container';


// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Navbar = () => {

  return (
    <AppBar position="static">
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{
      width: "100%",
      mx: "auto",
      justifyContent: "display-flex",
      alignItems: "left"
    }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: "sans-serif", 
              fontWeight: 1000,
              letterSpacing: '.3rem',
              color: '#b2abf2',
              textDecoration: 'none',
              
            }}
          >
            Inventori Home
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;