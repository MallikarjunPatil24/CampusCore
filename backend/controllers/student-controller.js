const bcrypt = require('bcryptjs');
const mongoose = require('mongoose'); // ✅ ADDED: Required for ID validation
const Student = require('../models/studentSchema');

// ================= REGISTER STUDENT =================
const studentRegister = async (req, res) => {
    try {
        const { name, rollNum, password, sclassName, adminID } = req.body;

        if (!name || !rollNum || !password || !sclassName || !adminID) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existingStudent = await Student.findOne({
            rollNum,
            school: adminID
        });

        if (existingStudent) {
            return res.status(409).json({ message: "Roll number already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = new Student({
            name,
            rollNum,
            password: hashedPassword,
            sclassName,
            school: adminID,
            role: 'Student'
        });

        await student.save();
        res.status(201).json({ message: "Student registered successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ================= FETCH STUDENT LIST =================
const studentList = async (req, res) => {
    try {
        const students = await Student.find({ school: req.user.id })
            .populate("sclassName", "sclassName");
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ================= UPDATE ATTENDANCE =================
const updateAttendance = async (req, res) => {
    try {
        const { studentsAttendance, date } = req.body;

        if (!Array.isArray(studentsAttendance) || !date) {
            return res.status(400).json({ message: "Invalid attendance data" });
        }

        await Promise.all(
            studentsAttendance.map(student =>
                Student.findByIdAndUpdate(
                    student.id,
                    { $push: { attendance: { date, status: student.status } } }
                )
            )
        );

        res.status(200).json({ message: "Attendance updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ================= ADD / UPDATE MARKS =================
const addMarks = async (req, res) => {
    try {
        const { studentID, subName, marksObtained } = req.body;

        // Use $push to add a new result object to the array
        const student = await Student.findByIdAndUpdate(
            studentID,
            {
                $push: {
                    examResult: {
                        subName: subName,
                        marksObtained: marksObtained
                    }
                }
            },
            { new: true } 
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Marks added successfully", student });
    } catch (err) {
        res.status(500).json({ message: "Error adding marks", error: err.message });
    }
};

// ================= GET STUDENT PROFILE =================
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ ID Validation: Now works because mongoose is imported
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid student ID" });
        }

        const student = await Student.findOne({
            _id: id,
            school: req.user.id // 🔒 Security: Admin must own the student record
        })
        .populate("sclassName", "sclassName")
        .populate("examResult.subName", "subName"); // Deep populate for table labels

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = {
    studentRegister,
    studentList,
    updateAttendance,
    addMarks,
    getStudentById
};