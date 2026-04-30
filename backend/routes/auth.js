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

//view attendance
router.get('/view/:studentid/:courseid',async(req,res) =>{
    const{studentid,courseid}=req.params
    try{
        const pool=await sql.connect()
        const result=await pool.request()
        .input('studentid',sql.Int,parseInt(studentid))
        .input('courseid',sql.Int,parseInt(courseid))
        .execute('sp_viewattendance')
        res.json({data:result.recordset})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

//update attendance
router.post('/update',async(req,res)=>{
    const{studentid,courseid,attenddate,attendstatus}=req.body
    try{
        const pool = await sql.connect()
        await pool.request()
        .input('studentid',sql.Int,studentid)
        .input('courseid',sql.Int,courseid)
        .input('attenddate',sql.Date,attenddate)
        .input('attendstatus',sql.VarChar,attendstatus)
        .execute('sp_updateattendance')
        res.json({message:'attendance updated successfully'})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }

})


//view marks

router.get('/marks/view/:studentid/:courseid',async(req,res)=>{
    const{studentid,courseid}=req.params
    try{
        const pool =await sql.connect()
        const result=await pool.request()
        .input('studentid',sql.Int,studentid)
        .input('courseid',sql.Int,courseid)
        .execute('sp_viewmarks')
        res.json({data:result.recordset})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

//update marks
router.post('/marks/update',async(req,res)=>{
    const{studentid,courseid,assignmentmarks,exammarks,totalmarks}=req.body
    try{
        const pool=await sql.connect()
        await pool.request()
        .input('studentid',sql.Int,studentid)
        .input('courseid',sql.Int,courseid)
        .input('assignmentmarks',sql.Int,assignmentmarks)
        .input('exammarks',sql.Int,exammarks)
        .input('totalmarks',sql.Int,totalmarks)
        .execute('sp_updatemarks')
        res.json({message:'Marks updated successfully'})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

//get transcript
router.get('/transcript/:studentid',async(req,res)=>{
    const{studentid}=req.params
    try{
        const pool=await sql.connect()
        const result=await pool.request()
        .input('studentid',sql.Int,studentid)
        .execute('sp_gettranscript')
        res.json({data:result.recordset})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

//generate transcript
router.post('/transcript/generate',async(req,res)=>{
    const{studentid,semester,totalgpa}=req.body
    try{
        const pool=await sql.connect()
        await pool.request()
        .input('studentid',sql.Int,studentid)
        .input('semester',sql.Int,semester)
        .input('totalgpa',sql.Float,totalgpa)
        .execute('sp_generatetranscript')
        res.json({message:'Transcript generated successfully'})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

//generate fee challan
router.post('/fee/generate',async(req,res)=>{
    const{studentid,duedate}=req.body
    try{
        const pool=await sql.connect()
        await pool.request()
        .input('studentid',sql.Int,studentid)
        .input('duedate',sql.Date,duedate)
        .execute('sp_generatefeechallan')
        res.json({message:'Fee challan generated successfully'})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})
//pay challan
router.post('/fee/pay',async(req,res)=>{
    const{studentid,challanid}=req.body
    try{
        const pool=await sql.connect()
        await pool.request()
        .input('studentid',sql.Int,studentid)
        .input('challanid',sql.Int,challanid)
        .execute('sp_payfeechallan')
        res.json({message:'Fee challan paid successfully'})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

//court booking
router.post('/court/book',async(req,res)=>{
    const{studentid,sport,bookingdate,starttime,endtime}=req.body
    try{
        const pool=await sql.connect()
        await pool.request()
        .input('studentid',sql.Int,studentid)
        .input('sport',sql.VarChar,sport)
        .input('bookingdate',sql.Date,bookingdate)
        .input('starttime',sql.Time,starttime)
        .input('endtime',sql.Time,endtime)
        .execute('sp_courtbooking')
        res.json({message:'Court booked successfully'})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

//course register
router.post('/course/register',async(req,res)=>{
    const{studentid,courseid,semester}=req.body
    try{
        const pool=await sql.connect()
        await pool.request()
        .input('studentid',sql.Int,studentid)
        .input('courseid',sql.Int,courseid)
        .input('semester',sql.VarChar,semester)
        .execute('sp_registercourse')
        res.json({message:'Course registered successfully'})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

//submit complain
router.post('/complain/submit',async(req,res)=>{
    const{studentid,description}=req.body
    try
    {
        const pool=await sql.connect()
        await pool.request()
        .input('studentid',sql.Int,studentid)
        .input('description',sql.VarChar,description)
        .execute('sp_submitcomplaint')
        res.json({message:'Complain submitted successfully'})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})
// update profile
router.post('/profile/update',async(req,res)=>{
const{userid,name,email,password}=req.body
try{
    const pool=await sql.connect()
    await pool.request()
    .input('userid',sql.Int,userid)
    .input('name',sql.VarChar,name)
    .input('email',sql.VarChar,email)
    .input('password',sql.VarChar,password)
    .execute('sp_updatepersonalinfo')
    res.json({message:'Personal info updated successfully'})
}
catch(err){
    res.status(500).json({error:err.message})
}

    
})
//post announcement
router.post('/announcement/add',async(req,res)=>{
const{postedbyid,title,text1}=req.body
try{
    const pool=await sql.connect()
    await pool.request()
    .input('postedbyid',sql.Int,postedbyid)
    .input('title',sql.VarChar,title)
    .input('text1',sql.VarChar,text1)
    .execute('sp_addannouncement')
    res.json({message:'Annoucement posted Successfully'})
}
catch(err){
    res.status(500).json({error:err.message})
}

    
})
//view announcement
router.get('/announcement/view',async(req,res)=>{
const{postedbyid,title,text1}=req.body
try{
    const pool=await sql.connect()
    const result=await pool.request().query('select * from vw_announcements')
    res.json({data:result.recordset})
}
catch(err){
    res.status(500).json({error:err.message})
}

    
})
//add honor list
router.post('/honor/add',async(req,res)=>{
const{studentid,title1,desc1,semester,gpa}=req.body
try{
   const pool=await sql.connect()
    await pool.request()
    .input('studentid',sql.Int,studentid)
    .input('title1',sql.VarChar,title1)
    .input('desc1',sql.VarChar,desc1)
    .input('semester',sql.Int,semester)
    .input('gpa',sql.Float,gpa)
    .execute('sp_managehonorlist')
    res.json({message:'Achievement added successfully'})
}
catch(err){
    res.status(500).json({error:err.message})
}

    
})
//view honor list
router.get('/honor/view',async(req,res)=>{
    try{
        const pool=await sql.connect()
        const result=await pool.request().query('select * from vw_honorlist')
        res.json({data:result.recordset})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

//view complaints
router.get('/complain/view',async(req,res)=>{
    try{
        const pool=await sql.connect()
        const result=await pool.request().query('select * from vw_complainthistory')
        res.json({data:result.recordset})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

//view courses
router.get('/course/view',async(req,res)=>{
    try{
        const pool=await sql.connect()
        const result=await pool.request().query('select * from course')
        res.json({data:result.recordset})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

//view fee challan
router.get('/fee/view/:studentid',async(req,res)=>{
    const{studentid}=req.params
    try{
        const pool=await sql.connect()
        const result=await pool.request()
        .input('studentid',sql.Int,parseInt(studentid))
        .query('select * from vw_feestatus where studentid=@studentid')
        res.json({data:result.recordset})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})
module.exports = router
