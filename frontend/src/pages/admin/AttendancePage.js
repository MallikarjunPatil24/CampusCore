import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, MenuItem, TextField, Paper } from '@mui/material';
import API from '../../utils/api';

const AttendancePage = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState({}); // {studentId: 'Present'}

    useEffect(() => {
        const fetchClasses = async () => {
            const { data } = await API.get('/SclassList');
            setClasses(data);
        };
        fetchClasses();
    }, []);

    const fetchClassStudents = async (classId) => {
        setSelectedClass(classId);
        const { data } = await API.get(`/StudentList`); // You can filter this on backend by class
        const filtered = data.filter(s => s.sclassName._id === classId);
        setStudents(filtered);
    };

    const handleStatusChange = (id, status) => {
        setAttendanceData(prev => ({ ...prev, [id]: status }));
    };

    const submitAttendance = async () => {
        const formattedData = Object.entries(attendanceData).map(([id, status]) => ({ id, status }));
        await API.put('/StudentAttendance', { 
            studentsAttendance: formattedData, 
            date: new Date() 
        });
        alert("Attendance Marked!");
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Mark Attendance</Typography>
            <TextField select fullWidth label="Select Class" value={selectedClass} onChange={(e) => fetchClassStudents(e.target.value)}>
                {classes.map(c => <MenuItem key={c._id} value={c._id}>{c.sclassName}</MenuItem>)}
            </TextField>

            {students.length > 0 && (
                <Paper sx={{ mt: 3, p: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Student Name</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map(s => (
                                <TableRow key={s._id}>
                                    <TableCell>{s.name}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant={attendanceData[s._id] === 'Present' ? "contained" : "outlined"} 
                                            color="success" 
                                            onClick={() => handleStatusChange(s._id, 'Present')}
                                        >Present</Button>
                                        <Button 
                                            variant={attendanceData[s._id] === 'Absent' ? "contained" : "outlined"} 
                                            color="error" 
                                            sx={{ ml: 1 }} 
                                            onClick={() => handleStatusChange(s._id, 'Absent')}
                                        >Absent</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={submitAttendance}>Submit Attendance</Button>
                </Paper>
            )}
        </Container>
    );
};

export default AttendancePage;