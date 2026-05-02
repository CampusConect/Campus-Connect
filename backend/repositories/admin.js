const { db, sql } = require('../config/db')

class admin {
    async createAdmin(userid) {
        const pool = await db.connect()
        await pool.request()
            .input('userid', sql.Int, userid)
            .query(`insert into admin1(userid) values(@userid)`)
    }

    async getAdminByUserId(userid) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('userid', sql.Int, userid)
            .query(`select * from admin1 where userid=@userid`)
        return result.recordset[0]
    }

    async getAdminById(adminid) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('adminid', sql.Int, adminid)
            .query(`select * from admin1 where adminid=@adminid`)
        return result.recordset[0]
    }
}

module.exports = AdminRepository