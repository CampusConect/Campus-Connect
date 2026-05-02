const { db, sql } = require('../config/db')

class UserRepository {
    async createUser(name, email, password, role) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .input('role', sql.VarChar, role)
            .query(`insert into users([name],email,[password],role1) 
                    values(@name,@email,@password,@role)`)
        return result
    }

    async getUserByEmail(email) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query(`select * from users where email=@email`)
        return result.recordset[0]
    }

    async getUserById(userid) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('userid', sql.Int, userid)
            .query(`select * from users where userid=@userid`)
        return result.recordset[0]
    }

    async updateUser(userid, name, email, password) {
        const pool = await db.connect()
        await pool.request()
            .input('userid', sql.Int, userid)
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .query(`update users set [name]=@name, email=@email, 
                    [password]=@password where userid=@userid`)
    }
}

module.exports = UserRepository