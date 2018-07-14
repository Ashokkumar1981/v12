var mongoose = require("mongoose");
    // comment = require("./models/comment");
    
//SCHEMA FOR car
var carSchema = new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    description:String,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"         
        }
    ],
    createdby:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        username:String
        
    }
        
});


module.exports = mongoose.model("car",carSchema);
