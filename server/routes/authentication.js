const express = require('express')
const router = express.Router()
const Student = require('../Models/StudentModel')
const JWT_SECRET = "Harsha$@"
var jwt = require('jsonwebtoken')
const Faculty = require('../Models/FacultyModel')
const Image=require('../Models/FormModel')

router.post('/createstudent',async(req,res)=>{
    const {username,email,phone,password,dob,branch,section} = req.body
    const existingStudent = await Student.findOne({ username });

    if (existingStudent) {
    // If the username is already taken, return an error response
     return res.status(400).json({ success: false, message: 'Username already exists' });
    }
    const student = await Student.create({
        username:username,
        email:email,
        phone:phone,
        password:password,
        dob:dob,
        branch:branch,
        section:section,
    })
    const data = {
        user:{
            id:student.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
    return res.status(200).json({success:true,student,authtoken})
})

router.post('/createfaculty',async(req,res)=>{
    const {email,password,username,phone,dob} = req.body

    const existingFaculty = await Faculty.findOne({ username });

    if (existingFaculty) {
    // If the username is already taken, return an error response
     return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    const faculty = await Faculty.create({
        username:username,
        email:email,
        password:password,
        phone:phone,
        dob:dob
    })
    const data = {
        user:{
            id:faculty.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
    return res.status(200).json({success:true,faculty,authtoken})
})



router.post('/studentlogin',async(req,res)=>{
    const {email,password} = req.body
    const student = await Student.findOne({email:email})
    if(!student){
        return res.status(200).json({success:false,message:"login with correct credentials"})
    }
    if(password!==student.password){return res.status(200).json({success:false,message:"login with correct credentials"})}
    const data = {
        user:{
            id:student.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
    return res.status(200).json({success:true,student,authtoken})
})

router.post('/facultylogin',async(req,res)=>{
    const {email,password} = req.body
    const faculty = await Faculty.findOne({email:email})
    if(!faculty){
        return res.status(200).json({success:false,message:"login with correct credentials"})
    }
    if(password!==faculty.password){return res.status(200).json({success:false,message:"login with correct credentials"})}
    const data = {
        user:{
            id:faculty.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
    return res.status(200).json({success:true,faculty,authtoken})
})

router.post('/getstudent',async(req,res)=>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({error:"please use a vaild token"})
    }
    const student = jwt.verify(token,JWT_SECRET)
    const user = await Student.findById(student.user.id)
    return res.status(200).json(user)
})

router.post('/getfaculty',async(req,res)=>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({error:"please use a vaild token"})
    }
    const faculty = jwt.verify(token,JWT_SECRET)
    const user = await Faculty.findById(faculty.user.id)
    return res.status(200).json(user)
})

router.post('/upload', async (req, res) => {
    const { pname,name, domain, description, phoneno, git, sem } = req.body;
    // const File = req.file;
    console.log(domain);
    // console.log(File)
    /* if (!File) {
      return res.status(400).send({ error: 'File not uploaded or invalid file format' });
    }
    cloudinary.uploader.upload(
        File.path,
        { resource_type: "auto" },
        async (err, result) => {
          if (err || !result || !result.url) {
            console.log(err || 'Invalid Cloudinary response:', result);
            return res.status(500).send({ error: 'Error uploading file to Cloudinary' });
          }
          console.log('Cloudinary Result:', result); */
    const newImage = new Image({
      pname:pname,
      name: name,
      domain: domain,
      description: description,
      phoneno: phoneno,
      git: git,
      sem: sem,
    });
    const savedImage = await newImage.save();
    return res.status(200).send({ savedImage, success: true });
    // }
    // )
  });

module.exports = router