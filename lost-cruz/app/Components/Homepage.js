'use client'

import React from 'react';
import { Box, Grid, Typography, Button, TextField, Avatar, Drawer, Checkbox, FormGroup, FormControlLabel } from '@mui/material';

const Homepage = () => {
  return (
    <Box>
      <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Lost @Cruz</Typography>
        <Avatar sx={{ width: 40, height: 40 }}>A</Avatar>
      </Box>

      <Box sx={{ padding: '20px' }}>
        <TextField fullWidth variant="outlined" placeholder="Search..." sx={{ marginBottom: '20px' }} />
        <Grid container spacing={2}>
          {/* Mock data for posts */}
          {[1, 2, 3].map((post) => (
            <Grid item xs={12} key={post}>
              <Box sx={{ border: '1px solid #ddd', padding: '10px' }}>
                <Typography variant="h6">Title</Typography>
                <Typography variant="body2">Description...</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Button variant="contained" color="primary" sx={{ marginTop: '20px' }}>
          Create New Post
        </Button>
      </Box>

      {/* Filter Drawer */}
      <Drawer anchor="right" open={false} onClose={() => {}}>
        <Box sx={{ width: 250, padding: '20px' }}>
          <Typography variant="h6">Filters</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Lost" />
            <FormControlLabel control={<Checkbox />} label="Found" />
            {/* Additional filters */}
          </FormGroup>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Homepage;
