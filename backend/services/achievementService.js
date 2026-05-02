const Achievement = require('../repositories/achievement')
const Student = require('../repositories/student')
class AchievementService {
constructor() {
this.achievementRepo = new Achievement()
this.studentRepo = new Student()
}
async addAchievement(studentid, title1, desc1, semester, gpa) {
if (!studentid || !title1 || !semester || gpa === undefined || gpa === null) {
throw new Error('studentid, title, semester and gpa are required')
}
if (gpa < 0 || gpa > 4.0) {
throw new Error('gpa must be between 0.0 and 4.0')
}
if (semester < 1 || semester > 9) {
throw new Error('semester must be between 1 and 9')
}
if (title1.length > 100) {
throw new Error('title cannot exceed 100 characters')
}
const student = await this.studentRepo.getstudentbyid(studentid)
if (!student) {
throw new Error('student not found')
}
await this.achievementRepo.addAchievement(studentid, title1, desc1, semester, gpa)
return { message: 'achievement added successfully' }
}
async getAchievementsByStudent(studentid) {
const student = await this.studentRepo.getstudentbyid(studentid)
if (!student) {
throw new Error('student not found')
}
return await this.achievementRepo.getAchievementsByStudent(studentid)
}
async getHonorList() {
return await this.achievementRepo.getHonorList()
}

async getAllAchievements() {
return await this.achievementRepo.getAllAchievements()
}
async deleteAchievement(achievementid) {
await this.achievementRepo.deleteAchievement(achievementid)
return { message: 'achievement deleted successfully' }
}
}
module.exports = new AchievementService()
