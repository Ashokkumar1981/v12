var express = require("express");
var router  = express.Router();
var campground =require("../models/campground");
var middleware = require("../middleware");
// INDEX - Displays all camp grounds

router.get("/",function(req,res){
    console.log("USER OBJECT "+req.user);
    campground.find({},function(err,allCampgrounds){
        if(err)
        {
            console.log("something went wrong");
            console.log(err);
            
        }
        else
        {
            console.log("GET /campgrounds - RETRIEVED ALL CAMPGROUNDS");
            // console.log(campgrounds);
            res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});
            
        }
    });
    
});




// NEW     /campgrounds/new    GET     Display a form to make a new campground
router.get("/new",middleware.isLoggedIn,function(req,res){
    // render a form
    res.render("campgrounds/new");
});

// CREATE  /campgrounds        POST    Add new campground to DB
router.post("/",middleware.isLoggedIn,function(req,res){
    // get data from Form and add to campgrounds array
    // redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var createdby = {username:req.user.username,id:req.user._id};
    
    var newCampground = {name:name,image:image, price:price,description:description,createdby:createdby};
    
    
    campground.create(newCampground, function (err,newCampground){
        if(err)
        {  console.log("something went wrong");
            console.log(err);
            
        }
        else
        {
            console.log("We just Saved a new CAMPGROUNDS from DB. POST /campgrounds");
            console.log(newCampground);
            
        }
    });
    
    
    res.redirect("/campgrounds");
    
});


// SHOW    /campgrounds/:id    GET     Show info about one campground
router.get("/:id",function(req,res){
    // find the campground with provided ID
    
    // render show template with that campground

    campground.findById(req.params.id).populate("comments").exec(function(err,selectedCampground){
        if(err)
        {
            console.log("something went wrong");
            console.log(err);
            
        }
        else
        {
            console.log("GET /campgrounds/:id SHOWING CAMPGROUND");
            console.log(selectedCampground);
            res.render("campgrounds/show",{campground:selectedCampground });
            
        }
    });
    
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    
    if(req.isAuthenticated()){
        campground.findById(req.params.id,function(err,selectedCampground){
                    res.render("campgrounds/edit",{campground:selectedCampground});
        });
    }
    else
    {
        console.log("You need to login");
        
        res.redirect("/login");
    }
    
    
    
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",function(req,res){

    // findByIdAndUpdate is a build 
    campground.findByIdAndUpdate(req.params.id,req.body.campground, function (err,campground){
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
    
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",function(req,res){
    campground.findByIdAndRemove(req.params.id,function(err,campground){
       if(err)
       {
           res.redirect("/campgrounds");
       }
       else
       {
           res.redirect("/campgrounds");
       }
    });
});



module.exports = router;