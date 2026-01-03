import React, { useState, useEffect } from 'react';
import { 
    TextField, 
    Button, 
    Autocomplete, 
    Grid 
} from '@mui/material';
import API from '../../utils/api';
import PageTemplate from '../../components/PageTemplate';
import { useNavigate } from "react-router-dom";

const StudentRegistration = () => {
    const [name, setName] = useState("");
    const [rollNum, setRollNum] = useState("");
    const [password, setPassword] = useState("");
    const [sclassName, setSclassName] = useState("");
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();

    // Fetch Classes
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const { data } = await API.get('/SclassList');
                setClasses(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching classes", err);
            }
        };
        fetchClasses();
    }, []);

    const handleRegister = async (e) => {
    e.preventDefault();

    // 🔒 Basic frontend validation
    if (!name.trim() || !rollNum || !password || !sclassName) {
        alert("Please fill all fields");
        return;
    }

    try {
        const adminID = localStorage.getItem('adminID');

        if (!adminID) {
            alert("Admin not logged in");
            return;
        }

        const studentData = {
            name: name.trim(),
            rollNum,
            password,
            sclassName,
            adminID
        };

        await API.post('/StudentReg', studentData);

        alert("✅ Student Registered Successfully!");

        navigate("/admin/students");
        setName("");
        setRollNum("");
        setPassword("");
        setSclassName("");

    } catch (err) {

        // 🧠 Duplicate roll number handling
        if (err.response?.status === 409) {
            alert("❌ Roll number already exists!");
        } 
        else {
            alert(
                "Registration Failed: " +
                (err.response?.data?.message || "Server error")
            );
        }
    }
};
    return (
        <PageTemplate title="Register New Student">
            <form onSubmit={handleRegister}>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Roll Number"
                            type="number"
                            value={rollNum}
                            required
                            onChange={(e) => setRollNum(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Autocomplete
                            options={classes}
                            getOptionLabel={(option) => option.sclassName || ""}
                            value={classes.find(c => c._id === sclassName) || null}
                            onChange={(e, newValue) => {
                                setSclassName(newValue ? newValue._id : "");
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Assign Class" required />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{ mt: 2 }}
                        >
                            Register Student
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </PageTemplate>
    );
};

export default StudentRegistration;
