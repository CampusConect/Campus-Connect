const sql = require('mssql')

const config = {
    server: 'SQL1001.site4now.net',
    database: 'db_ac8e32_campusconnect',
    user: 'db_ac8e32_campusconnect_admin',
    password: 'Saadeehab12',
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