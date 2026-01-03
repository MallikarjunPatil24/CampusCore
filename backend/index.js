const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// MongoDB connect
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("DB Error:", err.message));


// ==== Multer Setup ====
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// expose uploads publicly
app.use('/uploads', express.static('uploads'));


// Import routes
const routes = require('./routes/route');
app.use('/', routes);  // <-- your NoticeCreate should be inside route.js


// Start Server
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);