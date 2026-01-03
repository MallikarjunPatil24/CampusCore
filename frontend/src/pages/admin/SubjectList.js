import React, { useState, useEffect } from 'react';
import { 
    Container, Paper, Typography, Table, TableBody, 
    TableCell, TableContainer, TableHead, TableRow, Button, Box, CircularProgress 
} from '@mui/material';
import PageTemplate from "../../components/PageTemplate"; 
import API from '../../utils/api';

const SubjectList = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubjects = async () => {
        try {
            // This calls the GET route defined in your backend
            const { data } = await API.get('/AllSubjects'); 
            setSubjects(data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch subjects:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    return (
      <PageTemplate title="Subject List">
        <Container sx={{ mt: 10, mb: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4">Subject List</Typography>
                    <Typography variant="h6" color="primary">Total: {subjects.length}</Typography>
                </Box>
                
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                                <TableRow>
                                    <TableCell><strong>Subject Name</strong></TableCell>
                                    <TableCell><strong>Subject Code</strong></TableCell>
                                    <TableCell><strong>Sessions</strong></TableCell>
                                    <TableCell><strong>Class</strong></TableCell>
                                    <TableCell align="center"><strong>Actions</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {subjects.length > 0 ? subjects.map((sub) => (
                                    <TableRow key={sub._id} hover>
                                        <TableCell>{sub.subName}</TableCell>
                                        <TableCell>{sub.subCode}</TableCell>
                                        <TableCell>{sub.sessions || 'N/A'}</TableCell>
                                        <TableCell>{sub.sclassName?.sclassName || "Unassigned"}</TableCell>
                                        <TableCell align="center">
                                            <Button color="error" variant="outlined" size="small">
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                            No subjects found. Use "Manage Subjects" to add one.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </Container>
        </PageTemplate>
    );
};

export default SubjectList;