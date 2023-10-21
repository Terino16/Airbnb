
const express = require('express')
const app = express()
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
var cors = require('cors')
var bodyParser  = require('body-parser');
const port = 3001
app.use(cookieParser())
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())
require('dotenv').config()

const userroutes=require('./routes/user');
const propertyroutes=require('./routes/property');

app.use('/user',userroutes)
app.use('/property',propertyroutes)

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
connectToDatabase();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})