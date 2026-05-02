const { db, sql } = require(’../config/db’)

class courtbooking {
async bookCourt(studentid, sport, bookingdate, starttime, endtime) {
const pool = await db.connect()
await pool.request()
.input(‘studentid’, sql.Int, studentid)
.input(‘sport’, sql.VarChar, sport)
.input(‘bookingdate’, sql.Date, bookingdate)
.input(‘starttime’, sql.Time, starttime)
.input(‘endtime’, sql.Time, endtime)
.query(`insert into courtbooking(studentid,sport,bookingdate,starttime,endtime) values(@studentid,@sport,@bookingdate,@starttime,@endtime)`)
}


async slotAvailable(sport, bookingdate, starttime, endtime) {
const pool = await db.connect()
const result = await pool.request()
.input('sport', sql.VarChar, sport)
.input('bookingdate', sql.Date, bookingdate)
.input('starttime', sql.Time, starttime)
.input('endtime', sql.Time, endtime)
.query(`select * from courtbooking
where sport=@sport and bookingdate=@bookingdate
and starttime < @endtime and endtime > @starttime`)
return result.recordset.length === 0
}

async getBookingsByStudent(studentid) {
const pool = await db.connect()
const result = await pool.request()
.input('studentid', sql.Int, studentid)
.query(`select * from courtbooking where studentid=@studentid
order by bookingdate desc, starttime`)
return result.recordset
}

async getAllBookings() {
const pool = await db.connect()
const result = await pool.request()
.query(`select cb.bookingid, cb.sport, cb.bookingdate,
cb.starttime, cb.endtime, s.rollnum, u.[name] as studentname
from courtbooking cb
join student s on cb.studentid=s.studentid
join users u on s.userid=u.userid
order by cb.bookingdate desc, cb.starttime`)
return result.recordset
}

async getBookingsByDate(bookingdate) {
const pool = await db.connect()
const result = await pool.request()
.input('bookingdate', sql.Date, bookingdate)
.query(`select * from courtbooking where bookingdate=@bookingdate
order by starttime`)
return result.recordset
}

async cancelBooking(bookingid) {
const pool = await db.connect()
await pool.request()
.input('bookingid', sql.Int, bookingid)
.query(`delete from courtbooking where bookingid=@bookingid`)
}


}

module.exports = courtbooking
