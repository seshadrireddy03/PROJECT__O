const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const { error } = require('console')
const cloudinary = require('cloudinary').v2
const Image = require('../Models/FormModel')
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    console.log(ext);
    if (ext !== '.pdf') {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});

cloudinary.config({
    cloud_name: "dtrrxvumj",
    api_key: "453121125234534",
    api_secret: "36u5txt5yOwRmcmBZcVdTDi718I",
  });


let records = [];
// Modify your GET endpoint to accept a query parameter for username

router.get('/getRecords', async(req, res) => {
  try {
    const donors=await Image.find(); // Filter donors based on domain
    console.log(donors);
    if (!donors || donors.length === 0) {
      return res.status(200).json({ message: "No donations available for this domain" });
    }
    return res.status(200).json({ success: true, data: donors });
  } catch (error) {
    return res.status(500).json({ success: false, error, message: "Some error occurred" });
  }
});



module.exports = router