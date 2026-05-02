const UserRepository = require('../repositories/user')
const student = require('../repositories/student')
const teacher = require('../repositories/teacher')
const admin = require('../repositories/admin')
class AuthService {
    constructor() {
        this.userRepo = new UserRepository()
        this.studentRepo = new student()
        this.teacherRepo = new teacher()
        this.adminRepo = new admin()
    }

    async signupStudent(name, email, password, rollnum, program, semester) {
        const existingUser = await this.userRepo.getUserByEmail(email)
        if (existingUser) {
            throw new Error('Email already exists')
        }
        await this.userRepo.createUser(name, email, password, 'student')
        const newUser = await this.userRepo.getUserByEmail(email)
        await this.studentRepo.createStudent(newUser.userid, rollnum, program, semester)
        return { message: 'Student account created successfully' }
    }

    async loginStudent(email, password) {
        const user = await this.userRepo.getUserByEmail(email)
        if (!user || user.password !== password || user.role1 !== 'student') {
            throw new Error('Invalid email or password')
        }
        const student = await this.studentRepo.getStudentByUserId(user.userid)
        return { message: 'Login successful', user, student }
    }

    async signupTeacher(name, email, password, department) {
        const existingUser = await this.userRepo.getUserByEmail(email)
        if (existingUser) {
            throw new Error('Email already exists')
        }
        await this.userRepo.createUser(name, email, password, 'teacher')
        const newUser = await this.userRepo.getUserByEmail(email)
        await this.teacherRepo.createTeacher(newUser.userid, department)
        return { message: 'Teacher account created successfully' }
    }

    async loginTeacher(email, password) {
        const user = await this.userRepo.getUserByEmail(email)
        if (!user || user.password !== password || user.role1 !== 'teacher') {
            throw new Error('Invalid email or password')
        }
        const teacher = await this.teacherRepo.getTeacherByUserId(user.userid)
        return { message: 'Login successful', user, teacher }
    }

    async loginAdmin(email, password) {
        const user = await this.userRepo.getUserByEmail(email)
        if (!user || user.password !== password || user.role1 !== 'admin') {
            throw new Error('Invalid email or password')
        }
        return { message: 'Login successful', user }
    }

    async updatePersonalInfo(userid, name, email, password) {
        const existingUser = await this.userRepo.getUserByEmail(email)
        if (existingUser && existingUser.userid !== userid) {
            throw new Error('Email already taken')
        }
        await this.userRepo.updateUser(userid, name, email, password)
        return { message: 'Personal info updated successfully' }
    }
}

module.exports = new AuthService()