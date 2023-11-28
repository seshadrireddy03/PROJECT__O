const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

const auth = require('./routes/authentication')
//const upload = require('./routes/formupload')
const bodyParser = require("body-parser")



mongoose
  .connect('mongodb+srv://seshadri_reddy_:welcome123@cluster0.yyxunvk.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected successfully to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())
app.use('/api/v1',auth)
//app.use('/api/v1',upload)
app.listen(4000,()=>{
    console.log('app listening on port 4000')
})