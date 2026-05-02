const CourtBooking = require('../repositories/courtbooking')
const Student = require('../repositories/student')
class CourtBookingService {
constructor() {
this.bookingRepo = new CourtBooking()
this.studentRepo = new Student()
}
async bookCourt(studentid, sport, bookingdate, starttime, endtime) {
if (!studentid || !sport || !bookingdate || !starttime || !endtime) {
throw new Error('all booking fields are required')
}
if (starttime >= endtime) {
throw new Error('starttime must be before endtime')
}
// no booking in the past
const today = new Date().toISOString().split('T')[0]
if (bookingdate < today) {
throw new Error('cannot book a court for a past date')
}
const student = await this.studentRepo.getstudentbyid(studentid)
if (!student) {
throw new Error('student not found')
}
// mirror sp_courtbooking and tr_preventdoublebooking: overlap check
const available = await this.bookingRepo.slotAvailable(sport, bookingdate, starttime, endtime)
if (!available) {
throw new Error('slot is already booked for this time')
}
await this.bookingRepo.bookCourt(studentid, sport, bookingdate, starttime, endtime)
return { message: 'court booked successfully' }
}
async getBookingsByStudent(studentid) {
const student = await this.studentRepo.getstudentbyid(studentid)
if (!student) {
throw new Error('student not found')
}
return await this.bookingRepo.getBookingsByStudent(studentid)

}
async getAllBookings() {
return await this.bookingRepo.getAllBookings()
}
async getBookingsByDate(bookingdate) {
if (!bookingdate) {
throw new Error('bookingdate is required')
}
return await this.bookingRepo.getBookingsByDate(bookingdate)
}
async cancelBooking(bookingid) {
await this.bookingRepo.cancelBooking(bookingid)
return { message: 'booking cancelled successfully' }
}
}
module.exports = new CourtBookingService()
