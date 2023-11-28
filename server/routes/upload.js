const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const { error } = require('console')
const cloudinary = require('cloudinary').v2
const Pdf = require('../Models/FormModel')

const upload = multer({
    storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    console.log(ext);
    if (ext !== ".pdf") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
})

cloudinary.config({
    cloud_name: "dtrrxvumj",
    api_key: "453121125234534",
    api_secret: "36u5txt5yOwRmcmBZcVdTDi718I",
  });

router.post('/upload',upload.single("pdf"),async(req,res)=>{
    const {name,location,description,phoneno,git} = await req.body;
    const pdf = req.file;
    cloudinary.uploader.upload(
        photo.path,
        {resource_type:"pdf"},
        async(err,result)=>{
            if(err){
                console.log(err);
            }
            const newImage = new Pdf({
                name: name,
                location:location,
                description: description,
                phoneno:phoneno,
                git:git,
                url: result.url,
                cloudinaryId: result.public_id,
              });
              const savedImage = await newImage.save();
              return res.status(200).send({ savedImage, sucssess: true });
        }

    )
})