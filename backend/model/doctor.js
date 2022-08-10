const mongoose = require('mongoose')

// user data fields
const doctorSchema = mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    requests:[]
})

const doctorModel = mongoose.model('doctors',doctorSchema)

module.exports = doctorModel