const sql=require('mssql')
require('dotenv').config()
const config={
    server:'localhost\\SQLEXPRESS',
    database:'CampusConnect',
    driver:'msnodesqlv8',
    options:{
        encrypt:false,
        trustServerCertificate:true,
        trustedConnection:true
    }
}
const connectDB=async()=>{
    try{
        await sql.connect(config)
        console.log('connected to sql server successfully')
    }catch(err){
        console.error('error connecting to sql server:',err)    
    }
}

module.exports={connectDB,sql}