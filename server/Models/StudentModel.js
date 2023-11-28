const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    dob:{
        type:Date,
        required:true,
    },
    branch:{
        type:String,
        required:true,
    },
    section:{
        type:String,
        required:true,
    },
})

const student= mongoose.model('student',studentSchema)

module.exports = student