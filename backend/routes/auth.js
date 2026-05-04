const express = require('express')
const router = express.Router()

const authService = require('../services/authservice')
const attendanceService = require('../services/attendanceservice')
const marksService = require('../services/marksservice')
const transcriptService = require('../services/transcriptservice')
const feeService = require('../services/feeservice')
const achievementService = require('../services/achievementService')
const announcementService = require('../services/annoucementService')
const complaintService = require('../services/complaintService')
const courseService = require('../services/courseService')
const courtBookingService = require('../services/courtBookingService')
const registrationService = require('../services/registrationService')

// ── AUTH ──────────────────────────────────────────────
router.post('/auth/signup/student', async (req, res) => {
    const { name, email, password, rollnum, program, semester } = req.body
    try {
        const result = await authService.signupStudent(name, email, password, rollnum, program, semester)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/auth/login/student', async (req, res) => {
    const { email, password } = req.body
    try {
        const result = await authService.loginStudent(email, password)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/auth/signup/teacher', async (req, res) => {
    const { name, email, password, department } = req.body
    try {
        const result = await authService.signupTeacher(name, email, password, department)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/auth/login/teacher', async (req, res) => {
    const { email, password } = req.body
    try {
        const result = await authService.loginTeacher(email, password)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/auth/login/admin', async (req, res) => {
    const { email, password } = req.body
    try {
        const result = await authService.loginAdmin(email, password)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.put('/profile/update', async (req, res) => {
    const { userid, name, email, password } = req.body
    try {
        const result = await authService.updatePersonalInfo(userid, name, email, password)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── ATTENDANCE ────────────────────────────────────────
router.get('/attendance/view/:studentid/:courseid', async (req, res) => {
    const { studentid, courseid } = req.params
    try {
        const result = await attendanceService.viewAttendance(parseInt(studentid), parseInt(courseid))
        res.json({ data: result })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/attendance/update', async (req, res) => {
    const { teacherid, studentid, courseid, attenddate, attendstatus } = req.body
    try {
        const result = await attendanceService.updateAttendance(teacherid, studentid, courseid, attenddate, attendstatus)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── MARKS ─────────────────────────────────────────────
router.get('/marks/view/:studentid/:courseid', async (req, res) => {
    const { studentid, courseid } = req.params
    try {
        const result = await marksService.viewMarks(parseInt(studentid), parseInt(courseid))
        res.json({ data: result })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/marks/update', async (req, res) => {
    const { teacherid, studentid, courseid, assignmentmarks, exammarks, totalmarks } = req.body
    try {
        const result = await marksService.updateMarks(teacherid, studentid, courseid, assignmentmarks, exammarks, totalmarks)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── TRANSCRIPT ────────────────────────────────────────
router.get('/transcript/get/:studentid', async (req, res) => {
    const { studentid } = req.params
    try {
        const result = await transcriptService.getTranscript(parseInt(studentid))
        res.json({ data: result })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/transcript/generate', async (req, res) => {
    const { teacherid, adminid, studentid, semester, totalgpa } = req.body
    try {
        const result = await transcriptService.generateTranscript(teacherid, adminid, studentid, semester, totalgpa)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── FEE ───────────────────────────────────────────────
router.post('/fee/generate', async (req, res) => {
    const { adminid, studentid, duedate } = req.body
    try {
        const result = await feeService.generateChallan(adminid, studentid, duedate)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/fee/pay', async (req, res) => {
    const { studentid, challanid } = req.body
    try {
        const result = await feeService.payChallan(studentid, challanid)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/fee/view/:studentid', async (req, res) => {
    const { studentid } = req.params
    try {
        const result = await feeService.getChallan(parseInt(studentid))
        res.json({ data: result })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── COURSES ───────────────────────────────────────────
router.post('/course/create', async (req, res) => {
    const { coursecode, coursename, credithours, teacherid } = req.body
    try {
        const result = await courseService.createCourse(coursecode, coursename, credithours, teacherid)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/course/view', async (req, res) => {
    try {
        const result = await courseService.getAllCourses()
        res.json({ data: result })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/course/view/:courseid', async (req, res) => {
    const { courseid } = req.params
    try {
        const result = await courseService.getCourse(parseInt(courseid))
        res.json({ data: result })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── REGISTRATION ──────────────────────────────────────
router.post('/course/register', async (req, res) => {
    const { studentid, courseid, semester } = req.body
    try {
        const result = await registrationService.registerCourse(studentid, courseid, semester)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/course/registrations/:studentid', async (req, res) => {
    const { studentid } = req.params
    try {
        const result = await registrationService.getRegistrationsByStudent(parseInt(studentid))
        res.json({ data: result })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── COURT BOOKING ─────────────────────────────────────
router.post('/court/book', async (req, res) => {
    const { studentid, sport, bookingdate, starttime, endtime } = req.body
    try {
        const result = await courtBookingService.bookCourt(studentid, sport, bookingdate, starttime, endtime)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/court/view/:studentid', async (req, res) => {
    const { studentid } = req.params
    try {
        const result = await courtBookingService.getBookingsByStudent(parseInt(studentid))
        res.json({ data: result })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.delete('/court/cancel/:bookingid', async (req, res) => {
    const { bookingid } = req.params
    try {
        const result = await courtBookingService.cancelBooking(parseInt(bookingid))
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── COMPLAINTS ────────────────────────────────────────
router.post('/complaint/submit', async (req, res) => {
    const { studentid, description } = req.body
    try {
        const result = await complaintService.submitComplaint(studentid, description)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/complaint/view', async (req, res) => {
    try {
        const result = await complaintService.getAllComplaints()
        res.json({ data: result })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/complaint/view/:studentid', async (req, res) => {
    const { studentid } = req.params
    try {
        const result = await complaintService.getComplaintsByStudent(parseInt(studentid))
        res.json({ data: result })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── ANNOUNCEMENTS ─────────────────────────────────────
router.post('/announcement/add', async (req, res) => {
    const { postedbyid, title, text1 } = req.body
    try {
        const result = await announcementService.addAnnouncement(postedbyid, title, text1)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/announcement/view', async (req, res) => {
    try {
        const result = await announcementService.getAllAnnouncements()
        res.json({ data: result })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── ACHIEVEMENTS / HONOR LIST ─────────────────────────
router.post('/achievement/add', async (req, res) => {
    const { studentid, title1, desc1, semester, gpa } = req.body
    try {
        const result = await achievementService.addAchievement(studentid, title1, desc1, semester, gpa)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/achievement/all', async (req, res) => {
    try {
        const result = await achievementService.getAllAchievements()
        res.json({ data: result })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/honor/view', async (req, res) => {
    try {
        const result = await achievementService.getHonorList()
        res.json({ data: result })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
