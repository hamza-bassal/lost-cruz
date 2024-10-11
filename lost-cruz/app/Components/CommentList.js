import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const CommentList = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h6">Comments</Typography>
      {[1, 2, 3].map((comment) => (
        <Box key={comment} sx={{ display: 'flex', marginBottom: '20px' }}>
          <Avatar sx={{ width: 40, height: 40 }}>U</Avatar>
          <Box sx={{ marginLeft: '10px' }}>
            <Typography variant="body1">Username</Typography>
            <Typography variant="body2">Comment text goes here...</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CommentList;
