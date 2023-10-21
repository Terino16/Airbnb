const  mongoose = require("mongoose");

const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    purchasedProperty: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
})



const propertyschema=new mongoose.Schema({
    name : String ,
    address : {
        address1 : String ,
        address2 : String ,
        city : String ,
        state : String ,
        pincode: String,
     },
     imageUrls: {
        type: [String], // Define an array of strings
      },
    price:Number,
    user:String
}
)

const User= mongoose.model('User',UserSchema);

const Property=mongoose.model('Property',propertyschema);

module.exports={
    User,
    Property
}

