// dependencies 
const express = require('express')
const route = express.Router()
const userController = require('../controller/user')


route.post('/signup',userController.signUp)
route.post('/login',userController.login)
route.use(userController.verify)
route.get('/getDoctors',userController.getDoctors)
route.post('/doctorLogin',userController.doctorLogin)
route.post('/appointment',userController.addAppontment)
route.get('/patientList/:id',userController.patientList)


module.exports = route