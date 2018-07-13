// ALL MIDDLEWARE GOES HERE
var campground =require("../models/campground");
var comment =require("../models/comment");

var middlewareObj={};

    middlewareObj.checkCampgroundOwnership= function(req,res,next){
            console.log("MIDDLEWARE CALLED");
            if(req.isAuthenticated()){
                campground.findById(req.params.id,function(err,selectedCampground){
                
                if(err){
                    console.log(err);
                    req.flash("error", "Campground not found");
                    res.redirect("back");
                }
                else
                {
                    
                    if(selectedCampground.createdby.id.equals(req.user._id)){
                        next();
                    }
                    else
                    {
                        req.flash("error", "You dont have permission to do that");
                        res.redirect("back");
                    }
                }
            });
        }
        else
        {
            console.log("You need to login");
            req.flash("error", "You need to logged in to do that!!!");
            res.redirect("back"); // takes back to previous page
        }
    };

    middlewareObj.checkCommentOwnership = function(req,res,next){
        console.log("MIDDLEWARE CALLED");
         if(req.isAuthenticated()){
            comment.findById(req.params.comment_id,function(err,selectedComment){
                
                if(err){
                    console.log(err);
                    req.flash("error", "You need to have permission to do that!!!");
                    res.redirect("back");
                }
                else
                {
                    
                    if(selectedComment.author.id.equals(req.user._id)){
                        next();
                    }
                    else
                    {
                        res.redirect("back");
                    }
                }
            });
        }
        else
        {
            console.log("You need to login");
            req.flash("error", "You need to logged in to do that!!!");
            res.redirect("back"); // takes back to previous page
        }
        
    };


middlewareObj.isLoggedIn=function(req,res,next){ // This is the standard format for all middleware function
    // next - it is the next thing to be called
    if(req.isAuthenticated()){
        
        return next(); // This allows the next function in the calling function to be executed.
    }
    req.flash("error","You need to logged in to do that!!!");
    res.redirect("/login"); // redirects to login - since user is not loggedin.
}

module.exports = middlewareObj;