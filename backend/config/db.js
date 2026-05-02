const sql = require('mssql')

const config = {
    server: 'LAPTOP-2RBFAKUR\\SQLEXPRESS',
    database: 'CampusConnect',
    user: 'campusadmin',
    password: 'campus123',
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    }
}

class database{
    constructor(){
        if(database.instance){
            return database.instance
        }
        this.pool=null
        database.instance=this
    }

    async connect(){
        if(this.pool){
            return this.pool
        }
        this.pool=await sql.connect(config)
        console.log('connected to sql server')
        return this.pool
    }

    getpool()
    {
        return this.pool
    }
}
const db=new database()
module.exports = { db, sql }