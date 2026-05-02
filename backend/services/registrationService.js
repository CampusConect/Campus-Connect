const Registration = require('../repositories/registration')
const Student = require('../repositories/student')
const Course = require('../repositories/course')
const Fee = require('../repositories/fee')
class RegistrationService {
constructor() {
this.registrationRepo = new Registration()
this.studentRepo = new Student()
this.courseRepo = new Course()
this.feeRepo = new Fee()
}
async registerCourse(studentid, courseid, semester) {
if (!studentid || !courseid || !semester) {
throw new Error('studentid, courseid and semester are required')
}
const student = await this.studentRepo.getstudentbyid(studentid)
if (!student) {
throw new Error('student not found')
}
const course = await this.courseRepo.getCourseById(courseid)
if (!course) {
throw new Error('course not found')
}
// mirror sp_registercourse: block if any fee is due or overdue
const challans = await this.feeRepo.getChallanByStudent(studentid)
const unpaid = challans.find(c => c.challanstatus === 'due' || c.challanstatus === 'overdue')
if (unpaid) {
throw new Error('fee not cleared, cannot register')
}
const already = await this.registrationRepo.registrationExists(studentid, courseid, semester)
if (already) {
throw new Error('already registered in this course')
}
await this.registrationRepo.registerCourse(studentid, courseid, semester)
return { message: 'course registered successfully' }
}

async getRegistrationsByStudent(studentid) {
const student = await this.studentRepo.getstudentbyid(studentid)
if (!student) {
throw new Error('student not found')
}
return await this.registrationRepo.getRegistrationsByStudent(studentid)
}
async getRegistrationsByCourse(courseid) {
const course = await this.courseRepo.getCourseById(courseid)
if (!course) {
throw new Error('course not found')
}
return await this.registrationRepo.getRegistrationsByCourse(courseid)
}
async dropRegistration(registrationid) {
await this.registrationRepo.deleteRegistration(registrationid)
return { message: 'registration dropped successfully' }
}
}
module.exports = new RegistrationService()
