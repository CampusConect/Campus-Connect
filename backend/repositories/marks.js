const { db, sql } = require('../config/db')

class marks {
    async addMarks(studentid, courseid, assignmentmarks, exammarks, totalmarks) {
        const pool = await db.connect()
        await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('courseid', sql.Int, courseid)
            .input('assignmentmarks', sql.Float, assignmentmarks)
            .input('exammarks', sql.Float, exammarks)
            .input('totalmarks', sql.Float, totalmarks)
            .query(`insert into marks(studentid,courseid,assignmentmarks,exammarks,totalmarks) 
                    values(@studentid,@courseid,@assignmentmarks,@exammarks,@totalmarks)`)
    }

    async updateMarks(studentid, courseid, assignmentmarks, exammarks, totalmarks) {
        const pool = await db.connect()
        await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('courseid', sql.Int, courseid)
            .input('assignmentmarks', sql.Float, assignmentmarks)
            .input('exammarks', sql.Float, exammarks)
            .input('totalmarks', sql.Float, totalmarks)
            .query(`update marks set assignmentmarks=@assignmentmarks, 
                    exammarks=@exammarks, totalmarks=@totalmarks 
                    where studentid=@studentid and courseid=@courseid`)
    }

    async getMarksByStudentAndCourse(studentid, courseid) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('courseid', sql.Int, courseid)
            .query(`select m.assignmentmarks, m.exammarks, m.totalmarks, c.coursename 
                    from marks m 
                    join course c on m.courseid=c.courseid 
                    where m.studentid=@studentid and m.courseid=@courseid`)
        return result.recordset
    }

    async marksExist(studentid, courseid) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('courseid', sql.Int, courseid)
            .query(`select * from marks 
                    where studentid=@studentid and courseid=@courseid`)
        return result.recordset.length > 0
    }
}

module.exports = marks