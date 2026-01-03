const router = require('express').Router();
const { verifyToken } = require('../middleware/authMiddleware');

// **** Controllers ****
// Import only the functions, not the models, to avoid "Identifier already declared" errors
const { 
    adminRegister, 
    adminLogin, 
    getAdminStats, 
    noticeCreate, 
    getNotices 
} = require('../controllers/admin-controller');

const { 
    sclassCreate, 
    sclassList 
} = require('../controllers/class-controller');

const { 
    studentRegister, 
    studentList, 
    updateAttendance, 
    addMarks, 
    getStudentById 
} = require('../controllers/student-controller');

const { 
    subjectCreate, 
    getSubjectsByClass, 
    allSubjects 
} = require('../controllers/subject-controller');

// Multipart form handling for Notices with attachments
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// --------------- Public Routes ---------------
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogin);

// --------------- Protected Routes (Require Token) ---------------

// Dashboard Stats
router.get('/AdminStats', verifyToken, getAdminStats);

// Classes
router.post('/SclassCreate', verifyToken, sclassCreate);
router.get('/SclassList', verifyToken, sclassList);

// Students
router.post('/StudentReg', verifyToken, studentRegister);
router.get('/StudentList', verifyToken, studentList);
router.put('/StudentAttendance', verifyToken, updateAttendance);
// Dynamic route for Student Profile
router.get("/Student/:id", verifyToken, getStudentById); 

// Subjects
router.post('/SubjectCreate', verifyToken, subjectCreate);
router.get('/ClassSubjects/:id', verifyToken, getSubjectsByClass);
router.get('/AllSubjects', verifyToken, allSubjects);

// Marks Entry
router.put('/UpdateMarks', verifyToken, addMarks);

// Notices
router.post('/NoticeCreate', verifyToken, upload.single('file'), noticeCreate);
router.get('/NoticeList', verifyToken, getNotices);

module.exports = router;