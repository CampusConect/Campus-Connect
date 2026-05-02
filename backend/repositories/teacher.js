const { db, sql } = require('../config/db')

class teacher {
    async createTeacher(userid, department) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('userid', sql.Int, userid)
            .input('department', sql.VarChar, department)
            .query(`insert into teacher(userid,department) 
                    values(@userid,@department)`)
        return result
    }

    async getTeacherByUserId(userid) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('userid', sql.Int, userid)
            .query(`select * from teacher where userid=@userid`)
        return result.recordset[0]
    }

    async getTeacherById(teacherid) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('teacherid', sql.Int, teacherid)
            .query(`select * from teacher where teacherid=@teacherid`)
        return result.recordset[0]
    }

    async getAllTeachers() {
        const pool = await db.connect()
        const result = await pool.request()
            .query(`select t.teacherid, u.[name], u.email, t.department 
                    from teacher t join users u on t.userid=u.userid`)
        return result.recordset
    }
}

module.exports = teacher