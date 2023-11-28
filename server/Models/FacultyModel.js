const mongoose = require('mongoose')
const facultySchema = new mongoose.Schema({
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
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    dob:{
        type:Date,
        required:true,
    }
})

const faculty = mongoose.model('Faculty',facultySchema)

module.exports = faculty