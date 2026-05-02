const express = require('express')
const cors =require('cors')
const { db  } = require('./config/db')
const routes = require('./routes/auth')

const app =express()
app.use(cors())
app.use(express.json())
app.use('/api',routes)

app.get('/',(req,res)=>res.send('campus connect api is running'))

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log('server running on port'))
db.connect()
