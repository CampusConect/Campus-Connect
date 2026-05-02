const { db, sql } = require(’../config/db’)

class registration {
async registerCourse(studentid, courseid, semester) {
const pool = await db.connect()
await pool.request()
.input(‘studentid’, sql.Int, studentid)
.input(‘courseid’, sql.Int, courseid)
.input(‘semester’, sql.VarChar, semester)
.query(`insert into registration(studentid,courseid,semester,registrationdate) values(@studentid,@courseid,@semester,getdate())`)
}


async registrationExists(studentid, courseid, semester) {
const pool = await db.connect()
const result = await pool.request()
.input('studentid', sql.Int, studentid)
.input('courseid', sql.Int, courseid)
.input('semester', sql.VarChar, semester)
.query(`select * from registration
where studentid=@studentid and courseid=@courseid
and semester=@semester`)
return result.recordset.length > 0
}

async getRegistrationsByStudent(studentid) {
const pool = await db.connect()
const result = await pool.request()
.input('studentid', sql.Int, studentid)
.query(`select r.registrationid, r.semester, r.registrationdate,
c.coursecode, c.coursename, c.credithours
from registration r
join course c on r.courseid=c.courseid
where r.studentid=@studentid`)
return result.recordset
}

async getRegistrationsByCourse(courseid) {
const pool = await db.connect()
const result = await pool.request()
.input('courseid', sql.Int, courseid)
.query(`select r.registrationid, r.semester, r.registrationdate,
s.rollnum, u.[name]
from registration r
join student s on r.studentid=s.studentid
join users u on s.userid=u.userid
where r.courseid=@courseid`)
return result.recordset
}

async deleteRegistration(registrationid) {
const pool = await db.connect()
await pool.request()
.input('registrationid', sql.Int, registrationid)
.query(`delete from registration where registrationid=@registrationid`)
}


}

module.exports = registration
