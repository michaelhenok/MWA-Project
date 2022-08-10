  // mongoose dependecies
const mongoose = require('mongoose')

// user data fields
const userSchema = mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    dob:String,
    history:[]
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel