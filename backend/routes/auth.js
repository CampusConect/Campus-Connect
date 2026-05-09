const express = require('express')
const router = express.Router()
const { db, sql } = require('../config/db')

// ── AUTH ──────────────────────────────────────────────
router.post('/auth/signup/student', async (req, res) => {
    const { name, email, password, rollnum, program, semester } = req.body
    try {
        const pool = await db.connect()
        await pool.request()
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .input('rollnum', sql.VarChar, rollnum)
            .input('program', sql.VarChar, program)
            .input('semester', sql.Int, semester)
            .execute('sp_signupstudent')
        res.json({ message: 'Student account created successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/auth/login/student', async (req, res) => {
    const { email, password } = req.body
    try {
        const pool = await db.connect()
        const userResult = await pool.request()
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .query(`select * from users where email=@email and [password]=@password and role1='student'`)
        const user = userResult.recordset[0]
        if (!user) return res.status(401).json({ error: 'Invalid email or password' })
        const studentResult = await pool.request()
            .input('userid', sql.Int, user.userid)
            .query(`select * from student where userid=@userid`)
        res.json({ message: 'Login successful', user, student: studentResult.recordset[0] })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/auth/signup/teacher', async (req, res) => {
    const { name, email, password, department } = req.body
    try {
        const pool = await db.connect()
        await pool.request()
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .input('department', sql.VarChar, department)
            .execute('sp_signupteacher')
        res.json({ message: 'Teacher account created successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/auth/login/teacher', async (req, res) => {
    const { email, password } = req.body
    try {
        const pool = await db.connect()
        const userResult = await pool.request()
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .query(`select * from users where email=@email and [password]=@password and role1='teacher'`)
        const user = userResult.recordset[0]
        if (!user) return res.status(401).json({ error: 'Invalid email or password' })
        const teacherResult = await pool.request()
            .input('userid', sql.Int, user.userid)
            .query(`select * from teacher where userid=@userid`)
        res.json({ message: 'Login successful', user, teacher: teacherResult.recordset[0] })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/auth/login/admin', async (req, res) => {
    const { email, password } = req.body
    try {
        const pool = await db.connect()
        const userResult = await pool.request()
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .query(`select * from users where email=@email and [password]=@password and role1='admin'`)
        const user = userResult.recordset[0]
        if (!user) return res.status(401).json({ error: 'Invalid email or password' })
        res.json({ message: 'Login successful', user })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.put('/profile/update', async (req, res) => {
    const { userid, name, email, password } = req.body
    try {
        const pool = await db.connect()
        await pool.request()
            .input('userid', sql.Int, userid)
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .execute('sp_updatepersonalinfo')
        res.json({ message: 'Personal info updated successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── ATTENDANCE ────────────────────────────────────────
router.get('/attendance/view/:studentid/:courseid', async (req, res) => {
    const { studentid, courseid } = req.params
    try {
        const pool = await db.connect()
        const result = await pool.request()
            .input('studentid', sql.Int, parseInt(studentid))
            .input('courseid', sql.Int, parseInt(courseid))
            .execute('sp_viewattendance')
        res.json({ attendance: result.recordset })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/attendance/update', async (req, res) => {
    const { studentid, courseid, attenddate, attendstatus } = req.body
    try {
        const pool = await db.connect()
        await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('courseid', sql.Int, courseid)
            .input('attenddate', sql.Date, attenddate)
            .input('attendstatus', sql.VarChar, attendstatus)
            .execute('sp_updateattendance')
        res.json({ message: 'Attendance updated successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── MARKS ─────────────────────────────────────────────
router.get('/marks/view/:studentid/:courseid', async (req, res) => {
    const { studentid, courseid } = req.params
    try {
        const pool = await db.connect()
        const result = await pool.request()
            .input('studentid', sql.Int, parseInt(studentid))
            .input('courseid', sql.Int, parseInt(courseid))
            .execute('sp_viewmarks')
        res.json({ marks: result.recordset })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/marks/update', async (req, res) => {
    const { studentid, courseid, assignmentmarks, exammarks, totalmarks } = req.body
    try {
        const pool = await db.connect()
        await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('courseid', sql.Int, courseid)
            .input('assignmentmarks', sql.Float, assignmentmarks)
            .input('exammarks', sql.Float, exammarks)
            .input('totalmarks', sql.Float, totalmarks)
            .execute('sp_updatemarks')
        res.json({ message: 'Marks updated successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── TRANSCRIPT ────────────────────────────────────────
router.get('/transcript/get/:studentid', async (req, res) => {
    const { studentid } = req.params
    try {
        const pool = await db.connect()
        const result = await pool.request()
            .input('studentid', sql.Int, parseInt(studentid))
            .execute('sp_gettranscript')
        res.json({ transcript: result.recordset })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/transcript/generate', async (req, res) => {
    const { studentid, semester, totalgpa } = req.body
    try {
        const pool = await db.connect()
        await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('semester', sql.Int, semester)
            .input('totalgpa', sql.Float, totalgpa)
            .execute('sp_generatetranscript')
        res.json({ message: 'Transcript generated successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── FEE ───────────────────────────────────────────────
router.post('/fee/generate', async (req, res) => {
    const { studentid, duedate } = req.body
    try {
        const pool = await db.connect()
        await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('duedate', sql.Date, duedate)
            .execute('sp_generatefeechallan')
        res.json({ message: 'Fee challan generated successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/fee/pay', async (req, res) => {
    const { challanid, studentid } = req.body
    try {
        const pool = await db.connect()
        await pool.request()
            .input('challanid', sql.Int, challanid)
            .input('studentid', sql.Int, studentid)
            .execute('sp_payfeechallan')
        res.json({ message: 'Fee paid successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/fee/view/:studentid', async (req, res) => {
    const { studentid } = req.params
    try {
        const pool = await db.connect()
        const result = await pool.request()
            .input('studentid', sql.Int, parseInt(studentid))
            .query(`select * from vw_feestatus where studentid=@studentid`)
        res.json({ challans: result.recordset })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── REGISTRATION ──────────────────────────────────────
router.post('/course/register', async (req, res) => {
    const { studentid, courseid, semester } = req.body
    try {
        const pool = await db.connect()
        await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('courseid', sql.Int, courseid)
            .input('semester', sql.VarChar, semester)
            .execute('sp_registercourse')
        res.json({ message: 'Course registered successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/course/registrations/:studentid', async (req, res) => {
    const { studentid } = req.params
    try {
        const pool = await db.connect()
        const result = await pool.request()
            .input('studentid', sql.Int, parseInt(studentid))
            .query(`select * from vw_studentcourses where studentid=@studentid`)
        res.json({ courses: result.recordset })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── COURT BOOKING ─────────────────────────────────────
router.post('/court/book', async (req, res) => {
    const { studentid, sport, bookingdate, starttime, endtime } = req.body
    try {
        const pool = await db.connect()
        await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('sport', sql.VarChar, sport)
            .input('bookingdate', sql.Date, bookingdate)
            .input('starttime', sql.Time, starttime)
            .input('endtime', sql.Time, endtime)
            .execute('sp_courtbooking')
        res.json({ message: 'Court booked successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/court/view/:studentid', async (req, res) => {
    const { studentid } = req.params
    try {
        const pool = await db.connect()
        const result = await pool.request()
            .input('studentid', sql.Int, parseInt(studentid))
            .query(`select * from vw_courtschedule where studentid=@studentid order by bookingdate desc`)
        res.json({ bookings: result.recordset })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.delete('/court/cancel/:bookingid', async (req, res) => {
    const { bookingid } = req.params
    try {
        const pool = await db.connect()
        await pool.request()
            .input('bookingid', sql.Int, parseInt(bookingid))
            .query(`delete from courtbooking where bookingid=@bookingid`)
        res.json({ message: 'Booking cancelled successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── COMPLAINTS ────────────────────────────────────────
router.post('/complaint/submit', async (req, res) => {
    const { studentid, description1 } = req.body
    try {
        const pool = await db.connect()
        await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('description1', sql.VarChar, description1)
            .execute('sp_submitcomplaint')
        res.json({ message: 'Complaint submitted successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/complaint/view', async (req, res) => {
    try {
        const pool = await db.connect()
        const result = await pool.request()
            .query(`select * from vw_complainthistory order by datesubmitted desc`)
        res.json({ complaints: result.recordset })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/complaint/view/:studentid', async (req, res) => {
    const { studentid } = req.params
    try {
        const pool = await db.connect()
        const result = await pool.request()
            .input('studentid', sql.Int, parseInt(studentid))
            .query(`select * from vw_complainthistory where studentid=@studentid order by datesubmitted desc`)
        res.json({ complaints: result.recordset })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── ANNOUNCEMENTS ─────────────────────────────────────
router.post('/announcement/add', async (req, res) => {
    const { postedbyid, title, text1 } = req.body
    try {
        const pool = await db.connect()
        await pool.request()
            .input('postedbyid', sql.Int, postedbyid)
            .input('title', sql.VarChar, title)
            .input('text1', sql.VarChar, text1)
            .execute('sp_addannouncement')
        res.json({ message: 'Announcement posted successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/announcement/view', async (req, res) => {
    try {
        const pool = await db.connect()
        const result = await pool.request()
            .query(`select * from vw_announcements order by dateposted desc`)
        res.json({ announcements: result.recordset })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ── ACHIEVEMENTS / HONOR LIST ─────────────────────────
router.post('/achievement/add', async (req, res) => {
    const { studentid, title1, desc1, semester, gpa } = req.body
    try {
        const pool = await db.connect()
        await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('title1', sql.VarChar, title1)
            .input('desc1', sql.VarChar, desc1)
            .input('semester', sql.Int, semester)
            .input('gpa', sql.Float, gpa)
            .execute('sp_managehonorlist')
        res.json({ message: 'Achievement added successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/achievement/view/:studentid', async (req, res) => {
    const { studentid } = req.params
    try {
        const pool = await db.connect()
        const result = await pool.request()
            .input('studentid', sql.Int, parseInt(studentid))
            .query(`select * from achievement where studentid=@studentid order by dateawarded desc`)
        res.json({ achievements: result.recordset })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/honor/view', async (req, res) => {
    try {
        const pool = await db.connect()
        const result = await pool.request()
            .query(`select * from vw_honorlist order by gpa desc`)
        res.json({ honorlist: result.recordset })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router