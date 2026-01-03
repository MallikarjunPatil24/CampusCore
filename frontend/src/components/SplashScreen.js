import React from 'react';
import { Box, Typography, keyframes } from '@mui/material';

// Custom pulse animation
const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.7; }
  50% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.7; }
`;

const SplashScreen = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#1976d2', // CampusCore primary blue
        color: 'white',
        position: 'fixed',
        zIndex: 9999,
        top: 0,
        left: 0,
      }}
    >
      <Box sx={{ animation: `${pulse} 2s infinite ease-in-out`, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', letterSpacing: 2 }}>
          CampusCore
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.8 }}>
          Advanced School Management
        </Typography>
      </Box>
    </Box>
  );
};

export default SplashScreen;