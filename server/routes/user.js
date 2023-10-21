
const express = require('express');
const {Property,User } = require("../db");
const jwt=require('jsonwebtoken');
const {SECRET}= require('../auth/authenticate');
const {authenticatejwt}= require('../auth/authenticate');
const bcrypt = require('bcrypt');

const router = express.Router();

const bcryptSalt=bcrypt.genSaltSync(10);

router.post('/signup', async(req, res) => {
    const {username,password}=req.body;
    const user = await User.findOne({ username:req.body.username });
    if(!username || !password){
        res.json({message:"NUll Values"})
    }
    if(user)
    {
        res.status(400).json({ message: "Already exist" }); // Return an error response
        return
    }
   const userdoc=await User.create({
    username,
    password:bcrypt.hashSync(password,bcryptSalt)
   })

    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token,userdoc });
})

router.post('/signin', async(req, res) => {
    const {username,password}=req.body;
    const user = await User.findOne({ username:req.body.username });
    if(!username || !password){
        res.json({message:"NUll Values"})
    }
    if(user)
    {
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({message:"User Logged in",token,user})
    }
    else{
        res.json({ message: 'Doesnt Exist '});
    }
})

router.post('/addProperty',authenticatejwt, async(req, res) => {
    const { name, address: { address1, address2, city, state, pincode }, images } = req.body;
    const address = {
      address1,
      address2,
      city,
      state,
      pincode,
    };
       const property=await Property.create({
        name,
        address,
        images,
       })
        res.json({ message: 'Welcome user, PLease continue to add proeprties',property }); 
})




module.exports=router