import React, { useState, useEffect } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button} from '@mui/material';
import API from '../../utils/api';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        try {
            // We'll create this backend route next
            const { data } = await API.get('/StudentList');
            setStudents(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch students", err);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Student Directory</Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#1976d2' }}>
                            <TableCell sx={{ color: '#fff' }}><b>Name</b></TableCell>
                            <TableCell sx={{ color: '#fff' }}><b>Roll Number</b></TableCell>
                            <TableCell sx={{ color: '#fff' }}><b>Class</b></TableCell>
                            <TableCell sx={{ color: '#fff' }} align="right"><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student._id} hover>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.rollNum}</TableCell>
                                {/* We access sclassName.sclassName because of Mongoose population */}
                                <TableCell>{student.sclassName?.sclassName || "Not Assigned"}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" color="primary" size="small" sx={{ mr: 1 }}>View</Button>
                                    <Button variant="outlined" color="error" size="small">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default StudentList;