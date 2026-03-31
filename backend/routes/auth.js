const express =require('express')
const router = express.Router()
const { sql }=require('../config/db')
router.post('/signup/student',async(req, res)=>{
    const{name,email,password,rollnum,program,semester}=req.body
    try{
const pool =await sql.connect()
await pool.request()
.input('name',sql.VarChar,name)
.input('email',sql.VarChar,email)
.input('password',sql.VarChar,password)
.input('rollnum',sql.VarChar,rollnum)
.input('program',sql.VarChar,program)
.input('semester',sql.Int,semester)
.execute('sp_signupstudent')
res.json({message:'student account created successfully'})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

router.post('/login/student',async(req,res)=>{
    const{email,password}=req.body
    try{
        const pool=await sql.connect()
        await pool.request()
        .input('email',sql.VarChar,email)
        .input('password',sql.VarChar,password)
        .execute('sp_loginstudent')
        res.json({message:'student logged in successfully'})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})


router.post('/signup/teacher', async (req, res) => {
    const { name, email, password, department } = req.body
    try {
        const pool = await sql.connect()
        await pool.request()
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .input('department', sql.VarChar, department)
            .execute('sp_signupteacher')
        res.json({ message: 'teacher account created successfully' })
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})


router.post('/login/teacher', async (req, res) => {
    const { email, password } = req.body
    try {
        const pool = await sql.connect()
        await pool.request()
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .execute('sp_loginteacher')
        res.json({ message: 'Login successful' })
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/login/admin', async (req, res) => {
    const { email, password } = req.body
    try {
        const pool = await sql.connect()
        await pool.request()
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .execute('sp_loginadmin')
        res.json({ message: 'Login successful' })
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router