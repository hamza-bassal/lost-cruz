import React from 'react';
import { Box, Typography, Button, TextField, Avatar, Grid } from '@mui/material';

const SinglePost = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4">Title of the Post</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
        <Avatar sx={{ width: 40, height: 40 }}>P</Avatar>
        <Typography variant="body1" sx={{ marginLeft: '10px' }}>Posted by User</Typography>
      </Box>
      <Typography variant="body2">Description of the post goes here...</Typography>

      {/* Image Grid */}
      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        {[1, 2, 3].map((img) => (
          <Grid item xs={4} key={img}>
            <Box sx={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
              Image {img}
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Contact or Action Buttons */}
      <Box sx={{ marginTop: '20px' }}>
        <Button variant="outlined" color="primary" sx={{ marginRight: '10px' }}>
          Contact
        </Button>
        <Button variant="outlined" color="secondary">Report</Button>
      </Box>

      {/* Comment Section */}
      <Box sx={{ marginTop: '30px' }}>
        <Typography variant="h6">Comments</Typography>
        <TextField fullWidth multiline rows={3} placeholder="Write a comment..." sx={{ marginTop: '10px' }} />
        <Button variant="contained" color="primary" sx={{ marginTop: '10px' }}>Submit</Button>
      </Box>
    </Box>
  );
};

export default SinglePost;
