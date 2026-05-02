const MarksRepository = require('../repositories/marks')
const StudentRepository = require('../repositories/student')
const TeacherRepository = require('../repositories/teacher')

class MarksService {
    constructor() {
        this.marksRepo = new MarksRepository()
        this.studentRepo = new StudentRepository()
        this.teacherRepo = new TeacherRepository()
    }

    async viewMarks(studentid, courseid) {
        const student = await this.studentRepo.getStudentById(studentid)
        if (!student) {
            throw new Error('Student not found')
        }
        const marks = await this.marksRepo.getMarksByStudentAndCourse(studentid, courseid)
        return marks
    }

    async updateMarks(teacherid, studentid, courseid, assignmentmarks, exammarks, totalmarks) {
        const teacher = await this.teacherRepo.getTeacherById(teacherid)
        if (!teacher) {
            throw new Error('Teacher not found')
        }
        const student = await this.studentRepo.getStudentById(studentid)
        if (!student) {
            throw new Error('Student not found')
        }
        const exists = await this.marksRepo.marksExist(studentid, courseid)
        if (exists) {
            await this.marksRepo.updateMarks(studentid, courseid, assignmentmarks, exammarks, totalmarks)
        } else {
            await this.marksRepo.addMarks(studentid, courseid, assignmentmarks, exammarks, totalmarks)
        }
        return { message: 'Marks updated successfully' }
    }
}

module.exports = MarksService