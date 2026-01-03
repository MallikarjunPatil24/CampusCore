import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Typography,
    Grid,
    Card,
    CardContent,
    Divider,
    Box,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import PageTemplate from '../../components/PageTemplate';
import API from '../../utils/api';

const StudentProfile = () => {
    const { id } = useParams(); 
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                // Ensure the base URL in your API utility is correct (localhost:5000)
                const { data } = await API.get(`/Student/${id}`);
                setStudent(data);
            } catch (err) {
                console.error("Failed to load student:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!student) {
        return (
            <PageTemplate title="Profile Error">
                <Typography align="center">Student not found. Please verify the ID.</Typography>
            </PageTemplate>
        );
    }
    return (
        <PageTemplate title={`Student Profile: ${student.name}`}>
            <Grid container spacing={4}>
                {/* PERSONAL DETAILS SECTION */}
                <Grid item xs={12} md={4}>
                    <Card variant="outlined" sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h6" color="primary">Personal Details</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography sx={{ mt: 1 }}><strong>Roll Number:</strong> {student.rollNum}</Typography>
                            <Typography><strong>Class:</strong> {student.sclassName?.sclassName || "N/A"}</Typography>
                            <Typography><strong>Email:</strong> {student.email || "N/A"}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* ACADEMIC RECORDS SECTION */}
                <Grid item xs={12} md={8}>
                    <Card variant="outlined" sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h6" color="secondary">Academic Records</Typography>
                            <Divider sx={{ my: 1 }} />
                            
                            {student.examResult && student.examResult.length > 0 ? (
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Subject</strong></TableCell>
                                            <TableCell align="right"><strong>Marks Obtained</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {student.examResult.map((result, index) => (
                                            <TableRow key={index}>
                                                {/* Requires .populate('examResult.subName') in backend */}
                                                <TableCell>{result.subName?.subName || "Subject"}</TableCell>
                                                <TableCell align="right">{result.marksObtained}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <Typography variant="body2" color="textSecondary" sx={{ py: 2, textAlign: 'center' }}>
                                    No academic marks found for this student.
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </PageTemplate>
    );
};

export default StudentProfile;