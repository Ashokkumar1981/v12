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

    req.body.car.description = req.body.car.description + lorem;
    
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

var lorem = "Proin dignissim massa vel laoreet sagittis. Praesent vitae lacus lacinia, ultricies turpis id, fringilla ipsum. Ut in iaculis arcu. Pellentesque ac ligula magna. In fermentum sed augue quis condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras tincidunt leo at massa lacinia feugiat. Integer sodales sed metus vitae consectetur. Vivamus id mattis ipsum, eget tempus lacus. Pellentesque consequat lectus vel dui placerat, ut mattis arcu consequat." +

"Nullam aliquet egestas faucibus. Maecenas sed augue dolor. Donec non mollis eros. Duis est metus, bibendum at dignissim a, tempus quis eros. Aenean felis lorem, congue ut lacus sed, bibendum fermentum sapien. Nullam sit amet augue lobortis, tincidunt tellus eget, accumsan tortor. Sed pellentesque dictum eros, ac consequat justo hendrerit et. Praesent commodo sit amet lorem nec volutpat. Phasellus gravida, sapien maximus egestas condimentum, nunc lorem ornare massa, nec blandit velit turpis sit amet metus. Proin ut nulla sit amet urna vulputate ultricies et sed felis. Phasellus non nulla in tortor mattis pretium. Fusce suscipit nec sapien quis mattis. Integer eget ultricies tellus. Nulla dictum nisi at mauris commodo mollis. Aenean commodo accumsan tortor, ut consequat lectus luctus vel." +

"Fusce non volutpat purus. Sed feugiat ante eget leo imperdiet elementum. Pellentesque in consequat libero, et interdum nibh. Pellentesque placerat sodales scelerisque. Aenean id sollicitudin magna, ut lacinia magna. Sed ullamcorper blandit ornare. Maecenas finibus massa luctus lacus sodales, sed egestas orci aliquam." +

"Donec pellentesque euismod varius. Sed vel ultricies erat. In imperdiet at metus quis ultrices. Nullam erat quam, gravida quis orci id, auctor maximus magna. Proin in tellus a mauris faucibus interdum. Nulla quis lectus massa. Nullam vestibulum odio libero, consequat mollis velit cursus non. Suspendisse tristique quam justo, ornare consequat nulla interdum hendrerit. Etiam ultricies arcu ligula, in venenatis velit ultricies vel."+

"Morbi consequat a nibh at vestibulum. Sed id nulla nec lectus bibendum vehicula eu vitae leo. Curabitur sagittis fringilla magna, ac porta risus vehicula id. Nunc eget tincidunt urna. Suspendisse potenti. Suspendisse ut justo id lorem faucibus porttitor. Curabitur pulvinar orci vel enim aliquet euismod. Mauris ut rutrum nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et lacus facilisis, semper elit et, varius risus. Fusce molestie eros metus, in condimentum lorem congue vitae. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean erat nibh, blandit eu turpis sed, gravida eleifend orci. Sed rutrum maximus leo, nec imperdiet nibh vestibulum non. Nulla sed diam nisi."+

"Cras quis faucibus nunc, at auctor ipsum. Praesent id fermentum enim. Mauris nec augue elit. Ut eget rutrum mauris. Ut efficitur mi sed ipsum ultrices, ut posuere purus dictum. Pellentesque eu sagittis tortor. Aenean euismod vel augue a pulvinar. Mauris sed est ultrices, venenatis massa quis, fringilla justo. Sed at congue velit, id egestas lectus. Morbi sed velit cursus, iaculis eros vitae, mollis magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."+

"Donec pellentesque malesuada turpis nec euismod. Praesent pretium rhoncus urna, eget posuere ex aliquet ut. In hac habitasse platea dictumst. Integer eu porttitor diam. Curabitur quis elit non sapien bibendum ornare. Mauris id porttitor felis. Curabitur a eleifend sapien, lobortis feugiat sapien. In id purus sit amet magna suscipit aliquet. Vestibulum interdum est a finibus dictum. Curabitur volutpat urna et lacus rhoncus, id luctus sem lacinia. Sed sit amet orci augue. Nunc congue vitae sapien quis pellentesque. Aliquam malesuada ipsum vel ante malesuada tincidunt."+

"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec scelerisque posuere sapien, ac tempor lectus. Etiam porta est augue, eget feugiat lorem auctor non. Morbi ac neque eros. Phasellus in mauris eget sapien pellentesque maximus. Quisque est libero, venenatis vel odio at, dapibus iaculis ante. Integer et libero ac turpis tincidunt mattis."+

"Aenean imperdiet lorem sed felis porttitor scelerisque. Aliquam venenatis vehicula nisi at imperdiet. Morbi in finibus nisl, nec semper erat. Suspendisse condimentum odio non leo blandit mollis. Duis consectetur bibendum mi, vitae ornare felis tincidunt nec. Proin auctor elementum nisi. Mauris nibh sapien, vestibulum ut diam vel, cursus mattis sem. Pellentesque nibh nisl, dignissim ut diam vel, auctor mollis ante. Integer at volutpat nibh. Proin vitae maximus nunc. Pellentesque lacinia nisi sed eros euismod vestibulum. Maecenas id ullamcorper enim, et vestibulum elit. Nunc maximus quam ut nibh blandit, sit amet varius tellus ornare. Mauris mollis, diam et pharetra sagittis, lectus dolor finibus ipsum, ut convallis turpis mauris vitae mauris. Maecenas accumsan fermentum tellus, vitae aliquet ipsum imperdiet vitae."+

"Mauris ac massa odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque nec ultricies metus. In sit amet risus et ex ultrices porta. Sed lobortis sit amet lectus eu fringilla. Nam vulputate risus eros, nec varius neque accumsan quis. Cras ac quam id ante eleifend cursus ac at augue. Praesent laoreet placerat ex, vitae euismod mauris laoreet non. Aenean sagittis imperdiet faucibus. Vivamus eu sem sit amet nunc suscipit dignissim convallis id orci. Donec lectus ex, dapibus ac semper ut, feugiat eu dolor. Morbi lacinia, arcu et efficitur ullamcorper, elit eros ornare mi, sit amet eleifend nunc eros a eros. Aliquam vitae neque non nisl consequat bibendum. Aenean molestie, tellus iaculis placerat blandit, sapien nibh porttitor felis, eu imperdiet est odio at ante. Curabitur dictum elementum purus a consectetur. Nulla nulla est, lobortis quis consectetur vitae, consequat sed mauris."+

"Donec a nisl condimentum, placerat lorem at, elementum est. Vivamus nec turpis turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi turpis nisl, molestie et sagittis sed, lobortis sit amet nibh. Etiam suscipit placerat accumsan. Proin malesuada consectetur tortor sit amet dictum. Fusce hendrerit eros in tempus tincidunt. Mauris sodales, lorem vel mattis aliquet, diam purus imperdiet diam, ut venenatis odio nulla nec justo. Nunc suscipit vitae nibh vel interdum. Nunc ut urna sagittis, molestie mauris sit amet, ultricies libero."+

"Maecenas ut aliquam turpis. Nam bibendum semper magna, id tristique diam scelerisque vel. Curabitur lectus est, mollis eget dictum ornare, dictum a elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque nibh ipsum, eleifend ac risus nec, eleifend dignissim nulla. Suspendisse vel neque metus. Sed sed aliquet dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam dolor quam, fringilla et velit non, venenatis convallis lorem. Cras quis dui ut leo mollis congue sit amet feugiat odio."+

"Maecenas non vulputate ligula, eget feugiat eros. Donec ut dui dapibus, lobortis velit ut, lobortis sapien. Morbi bibendum, diam quis rutrum feugiat, turpis nunc euismod dui, eu luctus sapien enim ac lorem. Cras mollis tincidunt lectus, blandit porta nibh euismod nec. Donec enim risus, imperdiet sit amet ante sed, suscipit euismod tellus. Etiam vitae commodo lectus. Nulla id ante malesuada, mollis risus hendrerit, vestibulum ligula. Cras blandit nunc nec felis dictum, et fringilla risus luctus. Curabitur eget convallis leo. Ut diam diam, tempus eu ultricies in, gravida eu velit. In ac velit imperdiet orci imperdiet ullamcorper eu at eros. In ultricies felis sit amet sem ornare efficitur vel et magna. Etiam neque sapien, porta nec interdum sit amet, eleifend bibendum eros. Quisque sollicitudin imperdiet facilisis. Sed semper ex eget sapien scelerisque, a mattis quam malesuada. Quisque vel faucibus lacus." +

"Proin feugiat quam orci, sed interdum mi rhoncus sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse maximus metus neque, eget hendrerit justo blandit vitae. Fusce eu dui posuere, volutpat urna nec, sagittis nunc. Vestibulum tempus neque odio, quis pellentesque ante ultricies quis. Maecenas vitae felis est. Maecenas a nulla turpis. Ut lobortis enim eu orci tempus, at gravida nibh blandit. Donec sed purus vitae arcu maximus viverra. Sed in iaculis diam, nec luctus nunc. Suspendisse potenti. Maecenas eget turpis diam. Ut aliquam suscipit augue sit amet feugiat. Vestibulum feugiat accumsan justo vitae bibendum. Integer rutrum fringilla lacus, nec pharetra felis tincidunt euismod." +

"Sed laoreet mi sit amet dapibus pellentesque. Proin quis ornare est. Donec sit amet neque quis urna fringilla bibendum. Nullam semper mauris ac justo ornare vulputate. Aenean mattis lacinia justo, congue convallis sem ultricies vitae. Suspendisse dolor odio, consectetur in feugiat eget, tristique ac sapien. Phasellus cursus non mi gravida consectetur. Nunc aliquet eros sed eros porta ullamcorper. Etiam non porta risus. Pellentesque sed fermentum dui, vitae imperdiet orci. Phasellus sagittis eleifend est eu blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut tincidunt eros massa, sed tempor velit venenatis sed."+

"Nam interdum ut augue molestie posuere. Donec varius gravida quam ac egestas. Sed ac dignissim eros, a vestibulum dolor. In rutrum imperdiet magna, eu condimentum augue feugiat in. Integer bibendum tortor ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus imperdiet purus nec nisl tristique, nec semper metus fermentum. Aenean velit dolor, suscipit nec dolor in, vulputate semper sem. Fusce in magna bibendum, commodo mauris eu, imperdiet arcu. Maecenas dolor neque, ultrices at mi a, blandit ultrices tortor. Vestibulum efficitur purus nulla, in blandit nibh egestas egestas. Maecenas blandit eros tellus, eget bibendum libero euismod vitae. Nam porttitor arcu vel tortor sagittis, eu pellentesque dui bibendum. Fusce interdum mauris neque, sed sodales dui volutpat sit amet. Nullam eu vulputate ante, eget posuere diam. Nam a purus nisl."+

"Aenean efficitur lobortis urna ac cursus. Pellentesque vulputate, sapien a gravida vehicula, massa nisi faucibus lectus, non consequat felis lacus a ligula. Aliquam aliquet lectus nec metus lacinia, a dignissim lacus ultrices. Fusce nec purus mattis, mollis elit a, malesuada risus. Integer eget lacinia ligula, id feugiat lacus. Duis vitae tempus diam, vel varius lorem. Sed nulla urna, porttitor non auctor volutpat, sodales a sem. Vivamus venenatis at sem sollicitudin mattis. In mauris magna, sodales sed malesuada eget, sollicitudin eu turpis. Quisque ac posuere tortor. Nulla at sem et massa fringilla volutpat eget et dolor. Sed sed tellus nisl. Suspendisse condimentum, odio ac fermentum malesuada, tortor enim ultrices lacus, sit amet gravida augue dolor in augue. Nullam gravida vitae libero in porttitor. Donec faucibus, nulla eget vestibulum blandit, purus libero maximus metus, sit amet blandit massa lorem nec mi."+

"Ut semper mi id vulputate fermentum. Fusce semper mauris elit, a consequat quam interdum et. Duis congue, quam vel vestibulum sagittis, metus velit varius nisl, eget sagittis est nisl sed odio. Mauris aliquam odio urna, vitae aliquet ante interdum nec. Praesent convallis at enim et consequat. Mauris non libero consequat, maximus est eu, efficitur lectus. Donec commodo dolor ac porttitor maximus. Morbi neque ligula, sollicitudin non tellus vel, placerat interdum lectus. In rhoncus ex ut tempor efficitur. Duis pulvinar condimentum felis, vulputate tincidunt nisi feugiat at. Etiam venenatis egestas nisi, sed tincidunt nulla accumsan id. Nulla dapibus justo libero, dictum dictum sapien dignissim in. Etiam bibendum porttitor urna eu feugiat. Sed at ligula purus."+

"Donec non lorem lacus. Donec ullamcorper lectus id lorem maximus finibus. Phasellus sollicitudin nulla quis magna rhoncus finibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur nulla nibh, consectetur sed eros eget, facilisis faucibus turpis. Fusce consequat, nisl nec laoreet fermentum, felis nisi placerat lectus, eget aliquam massa dui eget quam. Aliquam dignissim dictum enim, a ultricies est ultricies in."+

"Aenean nec tempor orci. Curabitur faucibus urna velit, eu aliquet ligula tempor at. Donec sapien lacus, pulvinar nec orci non, lacinia hendrerit erat. Donec urna risus, tincidunt faucibus feugiat at, porta vel ex. Ut gravida orci a risus iaculis rhoncus. Vestibulum quis turpis non nulla fringilla lobortis. Integer dignissim ornare velit, at volutpat diam. Curabitur imperdiet diam id elit molestie, sit amet tincidunt urna accumsan. Duis eu massa ante. Aenean sed nulla facilisis, ullamcorper ligula id, luctus ligula. Fusce vel dignissim ante. In in ligula risus. Quisque non eros quis nibh pretium sagittis quis ac nisl. Suspendisse faucibus nunc eget neque lobortis molestie. Nunc vestibulum est at nunc sollicitudin congue ac vitae felis. Donec ornare justo ac mollis tristique.";