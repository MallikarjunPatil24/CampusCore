import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        schoolName: '', name: '', email: '', password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/AdminReg', formData);
            alert("School Registered Successfully! Please Login.");
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #1976d2, #1565c0)' }}>
            <Container maxWidth="xs">
                <Paper elevation={10} sx={{ p: 5, borderRadius: 4 }}>
                    <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>CampusCore</Typography>
                    <Typography variant="body2" align="center" sx={{ mb: 3 }}>Register your School</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth label="School Name" margin="normal" required onChange={(e) => setFormData({...formData, schoolName: e.target.value})} />
                        <TextField fullWidth label="Admin Name" margin="normal" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        <TextField fullWidth label="Email" margin="normal" type="email" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
                        <TextField fullWidth label="Password" margin="normal" type="password" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
                        <Button fullWidth variant="contained" type="submit" size="large" sx={{ mt: 3, fontWeight: 'bold' }}>Register</Button>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default AdminRegister;