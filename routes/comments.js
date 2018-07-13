var express = require("express");
var router  = express.Router({mergeParams: true}); // to merge the params
var campground = require("../models/campground");
var user = require("../models/user");
var comment =require("../models/comment");
var middleware = require("../middleware");



// ==================================
// COMMENTS ROUTES
// ==================================
router.get("/new",  middleware.isLoggedIn, function(req,res){
   

   
   campground.findById(req.params.id,function(err,selectedCampground){
       if(err)
       {
           console.log(err);
       }
       else
       {
           console.log("CALLED ID" + req.params.id);
           res.render("comments/new",{campground:selectedCampground}) ;
       }
        
   });
   
});


// CREATE  /comments        POST    Add new comment to DB
router.post("/", middleware.isLoggedIn,function(req,res){

    var author = req.body.author;
    var text = req.body.text;

    var newComment = req.body.comment;
    

    campground.findById(req.params.id,function (err,campground){
        if(err)
        {  
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
            
            comment.create(req.body.comment, function(err, comment){
                if(err)
                {
                    req.flash("error", "Something went wrong while adding comment");
                    console.log(err);
                }
                else
                {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    
                    comment.save();
                    campground.comments.push(comment);
                    
                    campground.save(function(err,campground){
                        if(err){
                            console.log(err);
                        }
                        else
                        {
                            req.flash("success","You have successfully added comment!!!");
                            res.redirect("/campgrounds/"+ campground._id) ;
                        }
                    });
                }
            });
            
            
            
        }
    });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    
     if(req.isAuthenticated()){
         comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err)
            {
                console.log(err);
                res.redirect("back");
            }
            else
            {
                res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});        
            }
        });
    }
    else
    {
        console.log("You need to login");
        res.redirect("/login");
    }
    
    
});


// COMMENT UPDATE ROUTE
router.put("/:comment_id", function(req,res){
    // findByIdAndUpdate is a build 
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function (err,updatedComment){
        
        
        if(err)
        {
            console.log(err);
            res.redirect("back");
        }
        else
        {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});


// DESTROY COMMENT ROUTE
router.delete("/:comment_id",function(req,res){
    
    comment.findByIdAndRemove(req.params.comment_id,function(err,foundComment){
      if(err)
      {
          res.redirect("back");
      }
      else
      {
          req.flash("success", "Comment deleted");
          res.redirect("/campgrounds/"+ req.params.id);
      }
    });
});





module.exports = router;