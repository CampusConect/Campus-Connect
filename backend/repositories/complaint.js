const { db, sql } = require(’../config/db’)

class complaint {
async submitComplaint(studentid, description1) {
const pool = await db.connect()
await pool.request()
.input(‘studentid’, sql.Int, studentid)
.input(‘description1’, sql.VarChar, description1)
.query(`insert into complaint(studentid,description1,datesubmitted) values(@studentid,@description1,getdate())`)
}


async getComplaintsByStudent(studentid) {
const pool = await db.connect()
const result = await pool.request()
.input('studentid', sql.Int, studentid)
.query(`select * from complaint where studentid=@studentid
order by datesubmitted desc`)
return result.recordset
}

async getAllComplaints() {
const pool = await db.connect()
const result = await pool.request()
.query(`select c.complaintid, c.description1, c.datesubmitted,
s.rollnum, u.[name]
from complaint c
join student s on c.studentid=s.studentid
join users u on s.userid=u.userid
order by c.datesubmitted desc`)
return result.recordset
}

async getComplaintById(complaintid) {
const pool = await db.connect()
const result = await pool.request()
.input('complaintid', sql.Int, complaintid)
.query(`select * from complaint where complaintid=@complaintid`)
return result.recordset[0]
}

async deleteComplaint(complaintid) {
const pool = await db.connect()
await pool.request()
.input('complaintid', sql.Int, complaintid)
.query(`delete from complaint where complaintid=@complaintid`)
}

}

module.exports = complaint
