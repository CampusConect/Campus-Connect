const { db, sql } = require(’../config/db’)

class course {
async createCourse(coursecode, coursename, credithours, teacherid) {
const pool = await db.connect()
const result = await pool.request()
.input(‘coursecode’, sql.VarChar, coursecode)
.input(‘coursename’, sql.VarChar, coursename)
.input(‘credithours’, sql.Int, credithours)
.input(‘teacherid’, sql.Int, teacherid)
.query(`insert into course(coursecode,coursename,credithours,teacherid) values(@coursecode,@coursename,@credithours,@teacherid)`)
return result
}


async getCourseById(courseid) {
const pool = await db.connect()
const result = await pool.request()
.input('courseid', sql.Int, courseid)
.query(`select * from course where courseid=@courseid`)
return result.recordset[0]
}

async getCourseByCode(coursecode) {
const pool = await db.connect()
const result = await pool.request()
.input('coursecode', sql.VarChar, coursecode)
.query(`select * from course where coursecode=@coursecode`)
return result.recordset[0]
}

async getAllCourses() {
const pool = await db.connect()
const result = await pool.request()
.query(`select * from course`)
return result.recordset
}

async getCoursesByTeacher(teacherid) {
const pool = await db.connect()
const result = await pool.request()
.input('teacherid', sql.Int, teacherid)
.query(`select * from course where teacherid=@teacherid`)
return result.recordset
}

async updateCourse(courseid, coursename, credithours, teacherid) {
const pool = await db.connect()
await pool.request()
.input('courseid', sql.Int, courseid)
.input('coursename', sql.VarChar, coursename)
.input('credithours', sql.Int, credithours)
.input('teacherid', sql.Int, teacherid)
.query(`update course set coursename=@coursename,
credithours=@credithours, teacherid=@teacherid
where courseid=@courseid`)
}

  async deleteCourse(courseid) {
  const pool = await db.connect()
  await pool.request()
  .input('courseid', sql.Int, courseid)
  .query(`delete from course where courseid=@courseid`)
}


}

module.exports = course
