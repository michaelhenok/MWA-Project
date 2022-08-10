const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const userRoute = require('./routes/userRoute')
mongoose.connect('mongodb://localhost:27017/clinic')


app.use(cors())
app.use(express.json())

app.use('/user',userRoute)

app.listen(3001,()=>{
    console.log('listen on 3001');
})