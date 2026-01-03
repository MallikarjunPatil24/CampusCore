import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, MenuItem, Typography, Paper } from '@mui/material';
import API from '../../utils/api';

const SubjectPage = () => {
    const [classes, setClasses] = useState([]);
    const [formData, setFormData] = useState({ subName: '', subCode: '', sclassName: '' });

    useEffect(() => {
        const fetchClasses = async () => {
            const { data } = await API.get('/SclassList');
            setClasses(data);
        };
        fetchClasses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adminID = localStorage.getItem('adminID');
        await API.post('/SubjectCreate', { ...formData, adminID });
        alert("Subject Added!");
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>Add New Subject</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Subject Name" margin="normal" onChange={(e) => setFormData({...formData, subName: e.target.value})} />
                    <TextField fullWidth label="Subject Code" margin="normal" onChange={(e) => setFormData({...formData, subCode: e.target.value})} />
                    <TextField select fullWidth label="Select Class" margin="normal" onChange={(e) => setFormData({...formData, sclassName: e.target.value})}>
                        {classes.map(c => <MenuItem key={c._id} value={c._id}>{c.sclassName}</MenuItem>)}
                    </TextField>
                    <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>Create Subject</Button>
                </form>
            </Paper>
        </Container>
    );
};

export default SubjectPage;