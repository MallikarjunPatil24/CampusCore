import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, TextField, Button,
  InputAdornment, IconButton, Container, Avatar,
  CircularProgress, Link
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // 🌙 Persist Dark Mode Choice
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Refined CampusCore Theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#1976d2' },
      background: {
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      }
    },
    shape: { borderRadius: 16 } // Smoother corners for modern design
  });

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await API.post("/AdminLogin", { email, password });

   if (res.data.token) {
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("adminID", res.data.admin.id);

  // 🔥 FORCE App.js to re-evaluate auth
  window.location.replace("/admin/dashboard");
}

  } catch (err) {
    alert("Invalid credentials");
  } finally {
    setLoading(false);
  }
};

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          transition: 'background 0.3s ease',
          background: darkMode
            ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
            : 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        }}
      >
        <Container maxWidth="xs">
          <Paper 
            elevation={24} 
            sx={{ 
                p: 5, 
                borderRadius: 4, 
                position: 'relative',
                backdropFilter: darkMode ? 'blur(10px)' : 'none',
                backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.8)' : '#fff'
            }}
          >

            {/* 🌙 Mode Toggle with Color feedback */}
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                {darkMode ? <LightModeIcon sx={{ color: '#ffeb3b' }} /> : <DarkModeIcon />}
              </IconButton>
            </Box>

            <Avatar sx={{ mx: 'auto', bgcolor: 'primary.main', mb: 2, width: 64, height: 64 }}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>

            <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
              CampusCore
            </Typography>

            <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 4 }}>
              Admin Management Portal
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Admin Email"
                margin="normal"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                margin="normal"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                size="large"
                sx={{ 
                    mt: 4, 
                    py: 1.8, 
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    boxShadow: darkMode ? 'none' : '0 4px 14px 0 rgba(0,118,255,0.39)'
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={26} color="inherit" /> : "Login to CampusCore"}
              </Button>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  Don’t have an account?
                </Typography>
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => navigate('/register')}
                  sx={{ fontWeight: 'bold', textDecoration: 'none', color: 'primary.main' }}
                >
                  Register School
                </Link>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLogin;
