const Subject = require('../models/subjectSchema');

// ================= CREATE SUBJECT =================
const subjectCreate = async (req, res) => {
  try {
    const { subName, subCode, sessions, sclassName } = req.body;
    const adminID = req.user.id;

    if (!subName || !subCode || !sclassName) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Prevent duplicates
    const existing = await Subject.findOne({
      subCode,
      sclassName,
      school: adminID
    });

    if (existing) {
      return res.status(409).json({
        message: "Subject already exists for this class"
      });
    }

    const subject = new Subject({
      subName,
      subCode,
      sessions,
      sclassName,
      school: adminID
    });

    const result = await subject.save();
    res.status(201).json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET ALL SUBJECTS =================
const allSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ school: req.user.id })
      .populate("sclassName", "sclassName");

    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET SUBJECTS BY CLASS =================
const getSubjectsByClass = async (req, res) => {
  try {
    const subjects = await Subject.find({
      sclassName: req.params.id,
      school: req.user.id
    }).populate("sclassName", "sclassName");

    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  subjectCreate,
  getSubjectsByClass,
  allSubjects
};
