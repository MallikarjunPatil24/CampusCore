const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    attachmentUrl: { type: String }, // Path to photo or PDF
    attachmentType: { type: String, enum: ['image', 'pdf', 'none'] },
    date: { type: Date, default: Date.now },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' }
});

module.exports = mongoose.model("notice", noticeSchema);

