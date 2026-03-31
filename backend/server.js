const express = require('express')
const { connectDB} = require('./config/db')
require('dotenv').config()

const authroutes =require('./routes/auth')



const app = express()
app.use(express.json())
app.use('/api/auth',authroutes)

app.get('/',(req,res)=>{
    res.send('Welcome to Campus Connect API')
})
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
connectDB()