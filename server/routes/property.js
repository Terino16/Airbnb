const express = require('express');
const {Property,User } = require("../db");
const {authenticatejwt}= require('../auth/authenticate');

const router = express.Router();

router.post('/airbnbyourhome',authenticatejwt, async(req, res) => {
   const { name, address, imageUrls, price, user } = req.body.addhome;
    const property = await Property.findOne({ name:name });
   if(property)
    {
        res.json({message:"Already exist"})
        return
    }
    const proeprtydoc=await Property.create({
      name,
      address,
      imageUrls,
      price,
      user
    })
   res.json({message:"Succesfully Added Property",proeprtydoc});
})

router.get("/getproperties",async(req,res)=>{
  const property= await Property.find({});
  res.json({ property });
})

router.get('/:id', authenticatejwt,async (req, res) => {
  const propertyid = req.params.id;
  const property = await Property.findOne({ _id:propertyid });
  if(property)
  {
    res.status(200).json({property})
  }
  else{
    res.json({ message: 'Doesnt Exist '});
  }
  
});
module.exports=router