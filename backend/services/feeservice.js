const FeeRepository = require('../repositories/fee')
const StudentRepository = require('../repositories/student')
const AdminRepository = require('../repositories/admin')

class FeeService {
    constructor() {
        this.feeRepo = new FeeRepository()
        this.studentRepo = new StudentRepository()
        this.adminRepo = new AdminRepository()
    }

    async generateChallan(adminid, studentid, duedate) {
        const admin = await this.adminRepo.getAdminById(adminid)
        if (!admin) {
            throw new Error('Admin not found')
        }
        const student = await this.studentRepo.getStudentById(studentid)
        if (!student) {
            throw new Error('Student not found')
        }
        const totalamount = await this.feeRepo.getTotalFeeByStudent(studentid)
        if (!totalamount) {
            throw new Error('No courses registered for this student')
        }
        await this.feeRepo.createChallan(studentid, totalamount, totalamount, duedate)
        return { message: 'Fee challan generated successfully' }
    }

    async payChallan(studentid, challanid) {
        const student = await this.studentRepo.getStudentById(studentid)
        if (!student) {
            throw new Error('Student not found')
        }
        const exists = await this.feeRepo.challanExists(challanid)
        if (!exists) {
            throw new Error('Challan not found')
        }
        const isPaid = await this.feeRepo.isChallanPaid(challanid)
        if (isPaid) {
            throw new Error('Challan already paid')
        }
        await this.feeRepo.payChallan(challanid, studentid)
        return { message: 'Fee paid successfully' }
    }

    async getChallan(studentid) {
        const student = await this.studentRepo.getStudentById(studentid)
        if (!student) {
            throw new Error('Student not found')
        }
        const challans = await this.feeRepo.getChallanByStudent(studentid)
        return challans
    }
}

module.exports = new FeeService()