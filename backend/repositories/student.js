const {db,sql} = require('../config/db')

class student{
    async createStudent(userid,rollnum,program,semester){
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
// // to fix error as multiple file has StudentByID not student ID we had to change it all there

    async getstudentbyid(studentid){
    return await this.getStudentById(studentid)
}
    async getStudentByUserId(userid){
        const pool=await db.connect()
        const result=await pool.request()
        .input('userid',sql.Int,userid)
        .query(`select * from student where userid=@userid`)
        return result.recordset[0]
    }
    async getStudentById(studentid){
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
