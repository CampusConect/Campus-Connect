const TranscriptRepository = require('../repositories/transcript')
const StudentRepository = require('../repositories/student')
const TeacherRepository = require('../repositories/teacher')
const AdminRepository = require('../repositories/admin')

class TranscriptService {
    constructor() {
        this.transcriptRepo = new TranscriptRepository()
        this.studentRepo = new StudentRepository()
        this.teacherRepo = new TeacherRepository()
        this.adminRepo = new AdminRepository()
    }

    async getTranscript(studentid) {
        const student = await this.studentRepo.getStudentById(studentid)
        if (!student) {
            throw new Error('Student not found')
        }
        const transcript = await this.transcriptRepo.getTranscriptByStudent(studentid)
        if (!transcript || transcript.length === 0) {
            throw new Error('Transcript not generated yet')
        }
        return transcript
    }

    async generateTranscript(teacherid, adminid, studentid, semester, totalgpa) {
        const teacher = await this.teacherRepo.getTeacherById(teacherid)
        if (!teacher) {
            throw new Error('Teacher not found')
        }
        const admin = await this.adminRepo.getAdminById(adminid)
        if (!admin) {
            throw new Error('Admin not found')
        }
        const student = await this.studentRepo.getStudentById(studentid)
        if (!student) {
            throw new Error('Student not found')
        }
        const exists = await this.transcriptRepo.transcriptExists(studentid, semester)
        if (exists) {
            throw new Error('Transcript already generated for this semester')
        }
        await this.transcriptRepo.createTranscript(studentid, semester, totalgpa)
        return { message: 'Transcript generated successfully' }
    }
}

module.exports = TranscriptService