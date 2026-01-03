const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNum: { type: Number, required: true },
    password: { type: String, required: true },

    sclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass', // Links to your class collection
        required: true
    },

    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin', // Links to the Admin/School
        required: true
    },

    role: { type: String, default: "Student" },

    attendance: [{
        date: { type: Date, required: true },
        status: { type: String, enum: ['Present', 'Absent'], required: true }
    }],
    examResult: [{
        subName: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'subject' // Crucial for populating subject names
        },
        marksObtained: { type: Number, default: 0 }
    }]
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

// Check if the model already exists before creating a new one to avoid re-declaration errors
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

module.exports = Student;