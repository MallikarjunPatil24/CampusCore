import React, { useState, useEffect } from 'react';
import { 
    Container, Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Typography, Button, Dialog, DialogTitle, 
    DialogContent, TextField, DialogActions, Box 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import API from '../../utils/api';

const ClassSection = () => {
    const [sclasses, setSclasses] = useState([]);
    const [open, setOpen] = useState(false); // Controls the modal visibility
    const [className, setClassName] = useState("");

    // Fetch classes from local MongoDB
    const fetchClasses = async () => {
        try {
            const { data } = await API.get('/SclassList');
            setSclasses(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch classes", err);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    // Handle Form Submission
    const handleAddClass = async () => {
        try {
            const adminID = localStorage.getItem('adminID'); // Ensure you stored this during login
            await API.post('/SclassCreate', { sclassName: className, adminID });
            setOpen(false); // Close modal
            setClassName(""); // Clear input
            fetchClasses(); // Refresh list
        } catch (err) {
            alert("Error adding class: " + err.response?.data?.message);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4">Manage Classes</Typography>
                <Button 
                    variant="contained" 
                    startIcon={<AddIcon />} 
                    onClick={() => setOpen(true)}
                >
                    Add Class
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell><b>Class Name</b></TableCell>
                            <TableCell align="right"><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sclasses.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item.sclassName}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" color="error" size="small">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* ADD CLASS MODAL */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Class</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Class Name (e.g., Grade 10)"
                        fullWidth
                        variant="outlined"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddClass} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ClassSection;