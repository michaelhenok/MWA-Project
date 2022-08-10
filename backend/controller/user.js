// dependencies
const userModel = require('../model/user')
const doctorModel = require('../model/doctor')
const jwt = require('jsonwebtoken')
const privateKey = 'maharishi'
const bcrypt = require('bcrypt')


// creating new  signup user and hide the password
exports.signUp = (req,res)=>{
    const hashedPassword = bcrypt.hashSync(req.body.password,10)
    const newUser = new userModel({...req.body,password:hashedPassword})
    newUser.save()
    
    res.send({success:1})
}

//  creating login
exports.login =async (req,res)=>{
    console.log(req.body)
    const ifUser = await userModel.findOne({email:req.body.email})
  if(ifUser){
    const comparePassword =await bcrypt.compare(req.body.password,ifUser.password)
   
    if(comparePassword){
        const token = jwt.sign({ifUser},privateKey)
        res.send({success:token})
    }else{
        res.send({success:0})
    }
    
  }else{
    res.send({success:0}) 
}
   
}

exports.doctorLogin = async (req,res)=>{
    const ifDoctor = await doctorModel.findOne({email:req.body.email})
    if(ifDoctor){
        const comparePassword = ifDoctor.password === req.body.password
       
        if(comparePassword){
            const token = jwt.sign({user:ifDoctor},privateKey)
            res.send({success:token})
        }else{
            res.send({success:0})
        }
    }
}
  // creating doctor access
exports.getDoctors = async (req,res)=>{
    const findDoctors = await doctorModel.find()
    if(findDoctors.length > 1){
        res.send({success:findDoctors})
    }else{
        res.send({success:0})
    }
}


exports.addAppontment =async (req,res)=>{

    const ObjectId = require('mongodb').ObjectId
    const docId = ObjectId(parseInt(req.body.id))

   const findDoctor = await doctorModel.findOne({id:docId})

    if(findDoctor){
        await doctorModel.updateOne({id:docId},{$push:{requests:req.body}})
        res.send({success:findDoctor})
    }

}

exports.patientList = async (req,res)=>{
    const ObjectId = require('mongodb').ObjectId
    const docId = ObjectId(parseInt(req.params.id))
   
     const doctor =await doctorModel.findOne({id:docId})
    if(doctor){
        res.send({success:doctor.requests})
    }else{
        res.send({success:null})
    }
   
}


exports.verify = async (req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization
        console.log(token);
        jwt.verify(token,privateKey,(err)=>{
          if(err){
            console.log('errr');
            res.send({err:err})
          }else{
            console.log('next');
            next()
          }
        })
    }
}


