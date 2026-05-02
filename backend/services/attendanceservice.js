const AttendanceRepository = require('../repositories/attendance')
const StudentRepository = require('../repositories/student')
const TeacherRepository = require('../repositories/teacher')

class AttendanceService {
    constructor() {
        this.attendanceRepo = new AttendanceRepository()
        this.studentRepo = new StudentRepository()
        this.teacherRepo = new TeacherRepository()
    }

    async viewAttendance(studentid, courseid) {
        const student = await this.studentRepo.getStudentById(studentid)
        if (!student) {
            throw new Error('Student not found')
        }
        const attendance = await this.attendanceRepo.getAttendanceByStudentAndCourse(studentid, courseid)
        return attendance
    }

    async updateAttendance(teacherid, studentid, courseid, attenddate, attendstatus) {
        const teacher = await this.teacherRepo.getTeacherById(teacherid)
        if (!teacher) {
            throw new Error('Teacher not found')
        }
        const student = await this.studentRepo.getStudentById(studentid)
        if (!student) {
            throw new Error('Student not found')
        }
        const exists = await this.attendanceRepo.attendanceExists(studentid, courseid, attenddate)
        if (exists) {
            await this.attendanceRepo.updateAttendance(studentid, courseid, attenddate, attendstatus)
        } else {
            await this.attendanceRepo.markAttendance(studentid, courseid, attenddate, attendstatus)
        }
        return { message: 'Attendance updated successfully' }
    }
}

module.exports = new AttendanceService()