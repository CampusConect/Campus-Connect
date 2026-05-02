const Course = require('../repositories/course')
const Teacher = require('../repositories/teacher')
class CourseService {
constructor() {
this.courseRepo = new Course()
this.teacherRepo = new Teacher()
}
async createCourse(coursecode, coursename, credithours, teacherid) {
if (!coursecode || !coursename || !credithours) {
throw new Error('coursecode, coursename and credithours are required')
}
if (credithours <= 0) {
throw new Error('credithours must be greater than 0')
}
const existing = await this.courseRepo.getCourseByCode(coursecode)
if (existing) {
throw new Error('course code already exists')
}
if (teacherid) {
const teacher = await this.teacherRepo.getTeacherById(teacherid)
if (!teacher) {
throw new Error('teacher not found')
}
}
await this.courseRepo.createCourse(coursecode, coursename, credithours, teacherid)
return { message: 'course created successfully' }
}
async getCourse(courseid) {
const course = await this.courseRepo.getCourseById(courseid)
if (!course) {
throw new Error('course not found')
}
return course
}
async getAllCourses() {
return await this.courseRepo.getAllCourses()
}

async getCoursesByTeacher(teacherid) {
const teacher = await this.teacherRepo.getTeacherById(teacherid)
if (!teacher) {
throw new Error('teacher not found')
}
return await this.courseRepo.getCoursesByTeacher(teacherid)
}
async updateCourse(courseid, coursename, credithours, teacherid) {
const course = await this.courseRepo.getCourseById(courseid)
if (!course) {
throw new Error('course not found')
}
if (credithours && credithours <= 0) {
throw new Error('credithours must be greater than 0')
}
await this.courseRepo.updateCourse(courseid, coursename, credithours, teacherid)
return { message: 'course updated successfully' }
}
async deleteCourse(courseid) {
const course = await this.courseRepo.getCourseById(courseid)
if (!course) {
throw new Error('course not found')
}
await this.courseRepo.deleteCourse(courseid)
return { message: 'course deleted successfully' }
}
}
module.exports = new CourseService()
