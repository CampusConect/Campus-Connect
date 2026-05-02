const { db, sql } = require(’../config/db’)

class announcement {
async addAnnouncement(postedbyid, title, text1) {
const pool = await db.connect()
await pool.request()
.input(‘postedbyid’, sql.Int, postedbyid)
.input(‘title’, sql.VarChar, title)
.input(‘text1’, sql.VarChar, text1)
.query(`insert into announcement(postedbyid,title,text1,dateposted) values(@postedbyid,@title,@text1,getdate())`)
}


async getAllAnnouncements() {
const pool = await db.connect()
const result = await pool.request()
.query(`select a.announcementid, a.title, a.text1, a.dateposted,
u.[name] as postedby, u.role1 as posterrole
from announcement a
join users u on a.postedbyid=u.userid
order by a.dateposted desc`)
return result.recordset
}

async getAnnouncementById(announcementid) {
const pool = await db.connect()
const result = await pool.request()
.input('announcementid', sql.Int, announcementid)
.query(`select * from announcement where announcementid=@announcementid`)
return result.recordset[0]
}

async getAnnouncementsByPoster(postedbyid) {
const pool = await db.connect()
const result = await pool.request()
.input('postedbyid', sql.Int, postedbyid)
.query(`select * from announcement where postedbyid=@postedbyid
order by dateposted desc`)
return result.recordset
}

async deleteAnnouncement(announcementid) {
const pool = await db.connect()
await pool.request()
.input('announcementid', sql.Int, announcementid)
.query(`delete from announcement where announcementid=@announcementid`)
}

async isAuthorizedPoster(userid) {
const pool = await db.connect()
const result = await pool.request()
.input('userid', sql.Int, userid)
.query(`select * from users
where userid=@userid and role1 in ('teacher','admin')`)
return result.recordset.length > 0
}


}

module.exports = announcement
