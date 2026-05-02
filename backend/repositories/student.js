const {db,sql} = require('../config/db')

class student{
    async createstudent(userid,rollnum,program,semester){
        const pool=await db.connect()
        const result=await pool.request()
        .input('userid',sql.Int,userid)
        .input('rollnum',sql.VarChar,rollnum)
        .input('program',sql.VarChar,program)
        .input('semester',sql.Int,semester)
        .query(`insert into student(userid,rollnum,program,semester) 
                values(@userid,@rollnum,@program,@semester)`)
        return result
    }

    async getstudentbyuser(userid){
        const pool=await db.connect()
        const result=await pool.request()
        .input('userid',sql.Int,userid)
        .query(`select * from student where userid=@userid`)
        return result.recordset[0]
    }
    async getstudentbyid(studentid){
        const pool=await db.connect()
        const result=await pool.request()
        .input('studentid',sql.Int,studentid)
        .query(`select * from student where studentid=@studentid`)
        return result.recordset[0]
    }
    async getallstudents(){
        const pool=await db.connect()
        const result=await pool.request()
        .query(`select * from student`)
        return result.recordset
    }
}

module.exports = student