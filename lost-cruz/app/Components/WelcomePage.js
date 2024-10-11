import React from 'react';
import { Box, Typography, Button, Container, Avatar } from '@mui/material';

const WelcomePage = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '100px' }}>
      <Avatar sx={{ width: 150, height: 150, margin: '0 auto' }}>Logo</Avatar>
      <Typography variant="h4" sx={{ marginTop: '20px' }}>
        ABOUT US
      </Typography>
      <Typography variant="body1" sx={{ marginTop: '20px' }}>
        Description goes here...
      </Typography>
      <Button variant="contained" color="primary" sx={{ marginTop: '30px' }} href="/homepage">
        Login
      </Button>
    </Container>
  );
};

export default WelcomePage;
