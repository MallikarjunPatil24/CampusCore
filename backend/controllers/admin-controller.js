const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminSchema');
const Sclass = require('../models/sclassSchema');
const Student = require('../models/studentSchema');
const Subject = require('../models/subjectSchema');
const Notice = require('../models/noticeSchema');

// ---------------- ADMIN REGISTER ----------------
const adminRegister = async (req, res) => {
    try {
        const { schoolName, name, email, password } = req.body;

        // Check if email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = new Admin({
            schoolName,
            name,
            email,
            password: hashedPassword
        });

        const result = await admin.save();
        // Remove password from response for security
        result.password = undefined;
        res.status(201).send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};
// ---------------- ADMIN LOGIN ----------------
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: "Admin not found" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: admin._id, role: "Admin" },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "You are logged in",
            token,
            admin: { id: admin._id, name: admin.name }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// ---------------- CREATE NOTICE (Supports Text + File Upload) ----------------
const noticeCreate = async (req, res) => {
    try {
        const { title, details, attachmentType } = req.body;

        if (!title || !details) {
            return res.status(400).json({ message: "Title & Details required" });
        }

        // File URL from multer if uploaded
        const attachmentUrl = req.file
            ? `/uploads/${req.file.filename}`
            : req.body.attachmentUrl || null;

        const notice = new Notice({
            title,
            details,                 // formData.details comes here
            attachmentType,
            attachmentUrl,
            school: req.user.id,
            date: new Date()
        });

        const result = await notice.save();
        res.status(201).json({ message: "Notice Created Successfully", notice: result });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ---------------- GET NOTICES ----------------
const getNotices = async (req, res) => {
    try {
        const notices = await Notice.find({ school: req.user.id }).sort({ date: -1 });
        res.status(200).json(notices);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ---------------- GET DASHBOARD STATS ----------------
const getAdminStats = async (req, res) => {
    try {
        const [classCount, studentCount, subjectCount] = await Promise.all([
            Sclass.countDocuments({ school: req.user.id }),
            Student.countDocuments({ school: req.user.id }),
            Subject.countDocuments({ school: req.user.id })
        ]);

        res.status(200).json({
            classes: classCount,
            students: studentCount,
            subjects: subjectCount
        });

    } catch (err) {
        res.status(500).json({ message: "Error fetching statistics" });
    }
};
module.exports = { adminRegister, adminLogin, noticeCreate, getNotices, getAdminStats };
