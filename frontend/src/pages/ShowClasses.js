import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import API from '../utils/api';

const ShowClasses = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                // This calls your backend route we tested in Thunder Client
                const { data } = await API.get('/SclassList'); 
                setClasses(data);
            } catch (err) {
                console.error("Error fetching classes", err);
            }
        };
        fetchClasses();
    }, []);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Class List</Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Class Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {classes.map((sclass) => (
                            <TableRow key={sclass._id}>
                                <TableCell>{sclass.sclassName}</TableCell>
                                <TableCell>View Students</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
};

export default ShowClasses;