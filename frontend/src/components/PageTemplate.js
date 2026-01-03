import React from 'react';
import { Container, Paper, Box, Typography } from '@mui/material';

const PageTemplate = ({ title, children, action }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 10, md: 12 }, mb: 5 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          animation: 'fadeIn .5s ease-in-out',
        }}
      >
        {/* ===== Page Header ===== */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              borderLeft: (theme) =>
                `6px solid ${theme.palette.primary.main}`,
              pl: 2,
              fontWeight: 'bold',
              color: 'text.primary',
            }}
          >
            {title}
          </Typography>

          {/* Optional right-side action (button/search/filter) */}
          {action && <Box>{action}</Box>}
        </Box>

        {/* ===== Content Card ===== */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            width: '100%',
            borderRadius: 3,
            bgcolor: 'background.paper',
            boxShadow: '0 4px 30px rgba(0,0,0,0.07)',
            transition: '0.3s',
            '&:hover': {
              boxShadow: '0 6px 35px rgba(0,0,0,0.10)',
            },
          }}
        >
          {children}
        </Paper>
      </Box>

      {/* ===== Animation ===== */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Container>
  );
};

export default PageTemplate;

