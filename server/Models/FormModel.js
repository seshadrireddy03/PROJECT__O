const mongoose = require('mongoose')
const formSchema = new mongoose.Schema({
    pname:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
        ref:'Student'
    },
    domain:{
        type:String,
        required:true,
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
    /*url:{
        type:String,
        required:true
    },
    cloudinaryId:{
        type:String,
        require:true
    }*/
    sem:{
        type:String,
        reruired:true,
    }
})

const form = mongoose.model('Form',formSchema)

module.exports = form