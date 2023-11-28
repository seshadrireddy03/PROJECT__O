const mongoose = require('mongoose')
const formSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        ref:'Student'
    },
    location:{
        type:Number,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    phoneno:{
        type:String,
        requires:true
    },
    git:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true
    }
})

const form = mongoose.model('Form',formSchema)

module.exports = form