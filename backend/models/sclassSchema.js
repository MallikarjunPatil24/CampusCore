const mongoose = require('mongoose');

const sclassSchema = new mongoose.Schema({
    sclassName: { type: String, required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' }, // Links the class to a specific school
}, { timestamps: true });

module.exports = mongoose.model("sclass", sclassSchema);