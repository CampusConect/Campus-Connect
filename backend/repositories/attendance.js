const { db, sql } = require('../config/db')

class attendance {
    async markAttendance(studentid, courseid, attenddate, attendstatus) {
        const pool = await db.connect()
        await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('courseid', sql.Int, courseid)
            .input('attenddate', sql.Date, attenddate)
            .input('attendstatus', sql.VarChar, attendstatus)
            .query(`insert into attendance(studentid,courseid,attenddate,attendstatus) 
                    values(@studentid,@courseid,@attenddate,@attendstatus)`)
    }

    async updateAttendance(studentid, courseid, attenddate, attendstatus) {
        const pool = await db.connect()
        await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('courseid', sql.Int, courseid)
            .input('attenddate', sql.Date, attenddate)
            .input('attendstatus', sql.VarChar, attendstatus)
            .query(`update attendance set attendstatus=@attendstatus 
                    where studentid=@studentid and courseid=@courseid 
                    and attenddate=@attenddate`)
    }

    async getAttendanceByStudentAndCourse(studentid, courseid) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('courseid', sql.Int, courseid)
            .query(`select a.attenddate, a.attendstatus, c.coursename 
                    from attendance a 
                    join course c on a.courseid=c.courseid 
                    where a.studentid=@studentid and a.courseid=@courseid`)
        return result.recordset
    }

    async attendanceExists(studentid, courseid, attenddate) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('courseid', sql.Int, courseid)
            .input('attenddate', sql.Date, attenddate)
            .query(`select * from attendance 
                    where studentid=@studentid and courseid=@courseid 
                    and attenddate=@attenddate`)
        return result.recordset.length > 0
    }
}

module.exports = attendance