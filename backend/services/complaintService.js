const Complaint = require('../repositories/complaint')
const Student = require('../repositories/student')
class ComplaintService {
constructor() {
this.complaintRepo = new Complaint()
this.studentRepo = new Student()
}
async submitComplaint(studentid, description) {
if (!studentid || !description) {
throw new Error('studentid and description are required')
}
if (description.trim().length < 5) {
throw new Error('description must be at least 5 characters')
}
if (description.length > 500) {
throw new Error('description cannot exceed 500 characters')
}
const student = await this.studentRepo.getstudentbyid(studentid)
if (!student) {
throw new Error('student not found')
}
await this.complaintRepo.submitComplaint(studentid, description)
return { message: 'complaint submitted successfully' }
}
async getComplaintsByStudent(studentid) {
const student = await this.studentRepo.getstudentbyid(studentid)
if (!student) {
throw new Error('student not found')
}
return await this.complaintRepo.getComplaintsByStudent(studentid)
}
async getAllComplaints() {
return await this.complaintRepo.getAllComplaints()
}
async getComplaintById(complaintid) {
const complaint = await this.complaintRepo.getComplaintById(complaintid)
if (!complaint) {

throw new Error('complaint not found')
}
return complaint
}
async deleteComplaint(complaintid) {
const complaint = await this.complaintRepo.getComplaintById(complaintid)
if (!complaint) {
throw new Error('complaint not found')
}
await this.complaintRepo.deleteComplaint(complaintid)
return { message: 'complaint deleted successfully' }
}
}
module.exports = new ComplaintService()
