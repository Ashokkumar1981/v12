var express = require("express");
var router  = express.Router();
var car =require("../models/car");
var middleware = require("../middleware");
// INDEX - Displays all camp grounds

router.get("/",function(req,res){
    console.log("USER OBJECT "+req.user);
    car.find({},function(err,allcars){
        if(err)
        {
            console.log("something went wrong");
            console.log(err);
            
        }
        else
        {
            console.log("GET /cars - RETRIEVED ALL carS");
            // console.log(cars);
            res.render("cars/index",{cars:allcars, currentUser:req.user});
            
        }
    });
    
});




// NEW     /cars/new    GET     Display a form to make a new car
router.get("/new",middleware.isLoggedIn,function(req,res){
    // render a form
    res.render("cars/new");
});

// CREATE  /cars        POST    Add new car to DB
router.post("/",middleware.isLoggedIn,function(req,res){
    // get data from Form and add to cars array
    // redirect back to cars page
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var createdby = {username:req.user.username,id:req.user._id};
    
    var newcar = {name:name,image:image, price:price,description:description,createdby:createdby};
    
    
    car.create(newcar, function (err,newcar){
        if(err)
        {  console.log("something went wrong");
            console.log(err);
            
        }
        else
        {
            console.log("We just Saved a new carS from DB. POST /cars");
            console.log(newcar);
            
        }
    });
    
    
    res.redirect("/cars");
    
});


// SHOW    /cars/:id    GET     Show info about one car
router.get("/:id",function(req,res){
    // find the car with provided ID
    
    // render show template with that car

    car.findById(req.params.id).populate("comments").exec(function(err,selectedcar){
        if(err)
        {
            console.log("something went wrong");
            console.log(err);
            
        }
        else
        {
            console.log("GET /cars/:id SHOWING car");
            console.log(selectedcar);
            res.render("cars/show",{car:selectedcar });
            
        }
    });
    
});

// EDIT car ROUTE
router.get("/:id/edit",middleware.checkcarOwnership,function(req,res){
    
    if(req.isAuthenticated()){
        car.findById(req.params.id,function(err,selectedcar){
                    res.render("cars/edit",{car:selectedcar});
        });
    }
    else
    {
        console.log("You need to login");
        
        res.redirect("/login");
    }
    
    
    
});

// UPDATE car ROUTE
router.post("/:id",function(req,res){

    // findByIdAndUpdate is a build 
    car.findByIdAndUpdate(req.params.id,req.body.car, function (err,car){
        if(err)
        {
            console.log(err);
            res.redirect("/cars");
        }
        else
        {
            console.log("Update car Route called.");
            res.redirect("/cars/"+req.params.id);
        }
    });
    
});

// DESTROY car ROUTE
router.delete("/:id",function(req,res){
    car.findByIdAndRemove(req.params.id,function(err,car){
       if(err)
       {
           res.redirect("/cars");
       }
       else
       {
           res.redirect("/cars");
       }
    });
});



module.exports = router;