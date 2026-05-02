const { db, sql } = require('../config/db')

class fee {
    async createChallan(studentid, coursefees, totalamount, duedate) {
        const pool = await db.connect()
        await pool.request()
            .input('studentid', sql.Int, studentid)
            .input('coursefees', sql.Float, coursefees)
            .input('totalamount', sql.Float, totalamount)
            .input('duedate', sql.Date, duedate)
            .query(`insert into feechallan(studentid,coursefees,totalamount,duedate,payment,challanstatus) 
                    values(@studentid,@coursefees,@totalamount,@duedate,null,'due')`)
    }

    async getChallanByStudent(studentid) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('studentid', sql.Int, studentid)
            .query(`select * from feechallan where studentid=@studentid`)
        return result.recordset
    }

    async payChallan(challanid, studentid) {
        const pool = await db.connect()
        await pool.request()
            .input('challanid', sql.Int, challanid)
            .input('studentid', sql.Int, studentid)
            .query(`update feechallan set payment=getdate(), challanstatus='paid' 
                    where challanid=@challanid and studentid=@studentid`)
    }

    async challanExists(challanid) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('challanid', sql.Int, challanid)
            .query(`select * from feechallan where challanid=@challanid`)
        return result.recordset.length > 0
    }

    async isChallanPaid(challanid) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('challanid', sql.Int, challanid)
            .query(`select * from feechallan 
                    where challanid=@challanid and challanstatus='paid'`)
        return result.recordset.length > 0
    }

    async getTotalFeeByStudent(studentid) {
        const pool = await db.connect()
        const result = await pool.request()
            .input('studentid', sql.Int, studentid)
            .query(`select sum(c.credithours * 5000) as totalamount 
                    from registration r 
                    join course c on r.courseid=c.courseid 
                    where r.studentid=@studentid`)
        return result.recordset[0].totalamount
    }
}

module.exports = fee