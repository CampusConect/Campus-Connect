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

const connectDB = async () => {
    try {
        await sql.connect(config)
        console.log('connected to sql server successfully')
    } catch(err) {
        console.error('error connecting to sql server:', err.message)
    }
}

module.exports = { connectDB, sql }