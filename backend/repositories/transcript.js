const { db, sql } = require('../config/db')

class transcript {
    async createTranscript(studentid, semester, totalgpa) {
        const pool = await db.connect()
        await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('semester', sql.Int, semester)
            .input('totalgpa', sql.Float, totalgpa)
            .query(`insert into transcript(studentid,semester,totalgpa,generateddate) 
                    values(@studentid,@semester,@totalgpa,getdate())`)
    }

    async getTranscriptByStudent(studentid) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('studentid', sql.Int, studentid)
            .query(`select t.semester, t.totalgpa, t.generateddate, 
                    s.rollnum, u.[name] 
                    from transcript t 
                    join student s on t.studentid=s.studentid 
                    join users u on s.userid=u.userid 
                    where t.studentid=@studentid`)
        return result.recordset
    }

    async transcriptExists(studentid, semester) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('semester', sql.Int, semester)
            .query(`select * from transcript 
                    where studentid=@studentid and semester=@semester`)
        return result.recordset.length > 0
    }
}

module.exports = transcript