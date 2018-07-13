var mongoose = require("mongoose");
    // comment = require("./models/comment");
    
//SCHEMA FOR CAMPGROUND
var campgroundSchema = new mongoose.Schema({
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


module.exports = mongoose.model("Campground",campgroundSchema);
