import React, { useState, useEffect } from 'react';
import { Container, TextField, MenuItem, Typography, Paper, Button, Box, CircularProgress } from '@mui/material';
import PageTemplate from '../../components/PageTemplate'; // Maintains your CampusCore branding
import API from '../../utils/api';

const MarksEntry = () => {
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // ✅ Matches backend: studentID (capital ID) and subName (as ID)
    const [formData, setFormData] = useState({ 
        studentID: '', 
        subName: '', 
        marksObtained: '' 
    });

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const { data } = await API.get('/SclassList');
                setClasses(data);
            } catch (err) {
                console.error("Error fetching classes:", err);
            }
        };
        fetchClasses();
    }, []);

    const handleClassChange = async (classId) => {
        setLoading(true);
        try {
            // Fetch students belonging to this class
            const studentRes = await API.get('/StudentList');
            setStudents(studentRes.data.filter(s => s.sclassName._id === classId));
            
            // Fetch subjects specifically for this class
            const subjectRes = await API.get(`/ClassSubjects/${classId}`);
            setSubjects(subjectRes.data);
        } catch (err) {
            console.error("Error loading class data:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sends marks to /UpdateMarks route
            await API.put('/UpdateMarks', formData);
            alert("Marks Added Successfully!");
            // Reset form for next entry
            setFormData({ ...formData, marksObtained: '' });
        } catch (err) {
            console.error("Submit Error:", err);
            alert(err.response?.data?.message || "Failed to save marks. Check backend.");
        }
    };

    return (
        <PageTemplate title="Marks Entry">
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h5" color="primary" gutterBottom fontWeight="bold">
                        Enter Exam Results
                    </Typography>
                    
                    <TextField 
                        select 
                        fullWidth 
                        label="Select Class" 
                        margin="normal" 
                        onChange={(e) => handleClassChange(e.target.value)}
                    >
                        {classes.map(c => (
                            <MenuItem key={c._id} value={c._id}>{c.sclassName}</MenuItem>
                        ))}
                    </TextField>

                    <form onSubmit={handleSubmit}>
                        <TextField 
                            select 
                            fullWidth 
                            label="Select Student" 
                            margin="normal" 
                            required
                            value={formData.studentID}
                            onChange={(e) => setFormData({...formData, studentID: e.target.value})}
                        >
                            {loading ? <MenuItem disabled><CircularProgress size={20} /></MenuItem> : 
                             students.map(s => <MenuItem key={s._id} value={s._id}>{s.name} ({s.rollNum})</MenuItem>)}
                        </TextField>

                        <TextField 
                            select 
                            fullWidth 
                            label="Select Subject" 
                            margin="normal" 
                            required
                            value={formData.subName}
                            onChange={(e) => setFormData({...formData, subName: e.target.value})}
                        >
                            {subjects.map(sub => (
                                <MenuItem key={sub._id} value={sub._id}>{sub.subName}</MenuItem>
                            ))}
                        </TextField>

                        <TextField 
                            fullWidth 
                            label="Marks Obtained" 
                            type="number" 
                            margin="normal" 
                            required
                            value={formData.marksObtained}
                            onChange={(e) => setFormData({...formData, marksObtained: e.target.value})} 
                        />

                        <Box sx={{ mt: 3 }}>
                            <Button 
                                fullWidth 
                                variant="contained" 
                                type="submit" 
                                size="large"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Save Result
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </PageTemplate>
    );
};

export default MarksEntry;