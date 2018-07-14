var express = require("express");
var router  = express.Router();
var car =require("../models/car");
var user = require("../models/user");
var passport = require("passport");
var Tail = require('tail').Tail;
var fs = require('fs');
var jsdiff = require('diff');

var oldData=0;
//==========================================================

router.get("/",function(req,res){
    res.render("landing");
    
});


//===============================
// AUTH ROUTES
//===============================
router.get("/register",function(req,res){
    res.render("register"); 
});

router.post("/register",function(req,res){
        
    user.register(new user({username:req.body.username}),req.body.password,function(err,user){
        if(err)
        {
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        else
        {
            req.flash("success", "Welcome to Cars Gallery: " + user.username);
            
            passport.authenticate("local")(req,res,function(){
                res.redirect("/cars");
            });
        }
    });
});

// ==========================
// SHOW LOGIN FORM
// ==========================
router.get("/login",function(req,res){
    res.render("login");
});

// Login logic
// Middleware - Some code runs before our final route call back here. It sits between beginning and end of the route.
// app.post(ROUTE,MIDDLEWARE,CALLBACK)
router.post("/login", passport.authenticate("local",{
    successRedirect:"/cars",
    failureRedirect:"/login"
    }),function(req,res){
    
});

// ===============
// Logout route
// ===============

router.get("/logout",function(req,res){
    
    req.logout(); // passport destroys all the user data in the session
    req.flash("success","Logged you out");
    res.redirect("/cars");
});


router.get("/logs",function(req,res){
    res.render("logs");
});

router.get("/renderlogs",function(req,res){
    
    // var tail = new Tail("fileToTail");

    // tail.on("line", function(data) {
    // //   console.log(data);
    //   res.send(data);
    // });
    
    // tail.on("error", function(error) {
    // //   console.log('ERROR: ', error);
    // });
    
    
    fs.readFile('output.txt', function(err, data) {
        
        var newData = data.toString().length;
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        // var diff = jsdiff.diffLines(oldData, newData,true);
        // oldData = newData;
        
        // console.log(oldData);
        // console.log(newData);

        var diffdata = data.slice(oldData, newData);
        oldData = newData;


        res.write(diffdata);
        
        
        res.end();
        
        
    });
    
    
    // const src = fs.createReadStream('./output.txt');
    // src.pipe(res);
    
    
});

module.exports = router;