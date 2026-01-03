import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, MenuItem, Box } from '@mui/material';
import API from '../../utils/api';
import PageTemplate from "../../components/PageTemplate";

const AddNotice = () => {

    const [formData, setFormData] = useState({
        title: '',
        details: '',
        attachmentUrl: '',
        attachmentType: 'none',
        rawFile: null
    });

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Use FormData for file uploads
    const data = new FormData();
    data.append('title', formData.title);
    data.append('details', formData.details);
    data.append('attachmentType', formData.attachmentType);
    
    // 'file' must match the name used in upload.single('file') on the backend
    if (formData.rawFile) {
        data.append('file', formData.rawFile);
    }

    try {
        const response = await API.post('/NoticeCreate', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if(response.status === 200 || response.status === 201) {
            alert("Announcement successfully posted!");
            setFormData({ title:'', details:'', attachmentUrl:'', attachmentType:'none', rawFile: null });
        }
    } catch (err) {
        alert("Error posting notice: " + (err.response?.data?.message || "Server Issue"));
    }
};

    return (
       <PageTemplate title="Add New Announcement">
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>Add Announcement</Typography>

                <form onSubmit={handleSubmit}>

                    <TextField
                        fullWidth label="Title" margin="normal"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                    />

                    <TextField
                        fullWidth multiline rows={3} label="Short Note" margin="normal"
                        value={formData.details}
                        onChange={e => setFormData({ ...formData, details: e.target.value })}
                        required
                    />

                    <TextField
                        select fullWidth label="Attachment Type" margin="normal"
                        value={formData.attachmentType}
                        onChange={e => setFormData({ ...formData, attachmentType: e.target.value })}
                    >
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="image">Photo</MenuItem>
                        <MenuItem value="pdf">PDF Document</MenuItem>
                    </TextField>

                    <Box sx={{ mt: 2 }}>
                        <Button variant="outlined" component="label">
                            Upload Image/PDF
                            <input
                                type="file"
                                hidden
                                accept="image/*,application/pdf"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const previewURL = URL.createObjectURL(file);
                                        setFormData({ ...formData, rawFile: file, attachmentUrl: previewURL });
                                    }
                                }}
                            />
                        </Button>
                    </Box>

                    {/* Preview Before Submit */}
                    {formData.attachmentUrl && (
                        <Box sx={{ mt: 2, textAlign: "center" }}>
                            {formData.attachmentType === "image" && (
                                <img
                                    src={formData.attachmentUrl}
                                    alt="preview"
                                    style={{ maxWidth: "100%", maxHeight: "250px", borderRadius: 8 }}
                                />
                            )}

                            {formData.attachmentType === "pdf" && (
                                <Button variant="contained" sx={{ mt: 1 }} href={formData.attachmentUrl} target="_blank">
                                    View PDF Preview
                                </Button>
                            )}
                        </Box>
                    )}

                    <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }}>
                        Post Announcement
                    </Button>
                </form>
            </Paper>
        </Container>
        </PageTemplate>
    );
};

export default AddNotice;