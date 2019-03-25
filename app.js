

var express                 = require("express"),
    bodyparser              = require("body-parser"),
    request                 = require('request'),
    mongoose                = require("mongoose"),
    flash                   = require("connect-flash"),
    passport                = require("passport"),
    localStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    methodOverride          = require("method-override"),
    
    app = express(),
    car =require("./models/car"),
    comment =require("./models/comment"),
    seedDB = require("./seeds"),
    user = require("./models/user"),
    
    // requireing routes
    commentRoutes = require("./routes/comments"),
    carRoutes = require("./routes/cars"),
    indexRoutes = require("./routes/index");
    
    
    
    
// seedDB();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/cars_v12",{useNewUrlParser:true});
app.use(methodOverride("_method"));
app.use(flash());

//===========================================================
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"Skoda Rapid is the best car in the world",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(user.authenticate()));
// These user.serializeUser() comes from passport-local-mongoose
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// This is the middleware added into every single route
app.use(function(req,res,next){
   res.locals.currentUser = req.user; // passing req.user to every single template
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   
   next(); // moving on to next middleware(actually route handler)
});

app.use("/", indexRoutes);
app.use("/cars", carRoutes); //This takes all the routes in car and append that with /cars
app.use("/cars/:id/comments", commentRoutes);

app.listen(3000, "0.0.0.0", function(){
    console.log("Cars Gallery App Server is listening!!!");
});

