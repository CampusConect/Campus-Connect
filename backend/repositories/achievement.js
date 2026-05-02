const { db, sql } = require('../config/db')

class achievement {
async addAchievement(studentid, title1, desc1, semester, gpa) {
const pool = await db.connect()
await pool.request()
.input('studentid', sql.Int, studentid)
.input('title1', sql.VarChar, title1)
.input('desc1', sql.VarChar, desc1)
.input('semester', sql.Int, semester)
.input('gpa', sql.Float, gpa)
.query(`insert into achievement(studentid,title1,desc1,semester,gpa,dateawarded) values(@studentid,@title1,@desc1,@semester,@gpa,getdate())`)
}


async getAchievementsByStudent(studentid) {
const pool = await db.connect()
const result = await pool.request()
.input('studentid', sql.Int, studentid)
.query(`select * from achievement where studentid=@studentid
order by dateawarded desc`)
return result.recordset
}

async getHonorList() {
const pool = await db.connect()
const result = await pool.request()
.query(`select a.achievementid, a.title1, a.desc1, a.semester,
a.gpa, a.dateawarded, s.rollnum, s.program, u.[name] as studentname
from achievement a
join student s on a.studentid=s.studentid
join users u on s.userid=u.userid
where a.gpa >= 3.5
order by a.gpa desc`)
return result.recordset
}

async getAllAchievements() {
const pool = await db.connect()
const result = await pool.request()
.query(`select a.achievementid, a.title1, a.desc1, a.semester,
a.gpa, a.dateawarded, s.rollnum, u.[name] as studentname
from achievement a
join student s on a.studentid=s.studentid
join users u on s.userid=u.userid
order by a.dateawarded desc`)
return result.recordset
}

async deleteAchievement(achievementid) {
const pool = await db.connect()
await pool.request()
.input('achievementid', sql.Int, achievementid)
.query(`delete from achievement where achievementid=@achievementid`)
}


}

module.exports = achievement
