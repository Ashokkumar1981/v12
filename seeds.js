var mongoose = require("mongoose");
var campground = require("./models/campground");
var comment = require("./models/comment");

 var data = [
        {name:"Kodaikanal", image:"http://www.thehindu.com/life-and-style/travel/article18384018.ece/alternates/FREE_660/05mpkodailake",description: "Kodaikanal is a city in the hills of the Dindigul district in the state of Tamil Nadu, India. Its name in the Tamil language means \"The Gift of the Forest\". Kodaikanal is referred to as the \"Princess of Hill stations\" and has a long history as a retreat and popular tourist destination."},
        {name:"Ooty", image:"http://www.ootytours.in/images/tours/1-day-ooty-town-tour/one-day-ooty-town-tour-local-sightseeing-tour-package-tea-estate-view-point-ooty.jpg", description: "Udagamandalam (also Ootacamund) and abbreviated as Udhagai and Ooty  is a town and municipality in the Indian state of Tamil Nadu. It is located 86 km north of Coimbatore and 128 km south of Mysore and is the capital of the Nilgiris district. It is a popular hill station located in the Nilgiri Hills."},
        {name:"Coorg", image:"https://travelofix.com/wp-content/uploads/2013/11/coorg-img.jpg",description:"Coorg / Kodagu is an administrative district in Karnataka, India. Before 1956 it was an administratively separate Coorg State, at which point it was merged into an enlarged Mysore State. It occupies an area of 4,102 square kilometres (1,584 sq mi) in the Western Ghats of southwestern Karnataka. In 2001 its population was 548,561, 13.74% of which resided in the district's urban centres, making it the least populous of the 30 districts in Karnataka."},
        {name:"Yercaud", image:"http://visityercaud.com/wp-content/uploads/2017/05/looproad-visityercaud.jpg", description: "Yercaud is a hill station in Salem District, in Tamil Nadu, India. It is located in the Shevaroys range of hills in the Eastern Ghats. It is situated at an altitude of 1515 metres (4970 ft) above sea level, and the highest point in Yercaud is the Servarayan temple, at 5,326 feet (1,623 m). The hill station is named owing to the abundance of forest near the lake, the name signifying Lake Forest.[1] As a popular tourist destination, Yercaud is also called as Jewel of the South. Yercaud is connected to the city of Salem, Tamil Nadu through a Highway of 28 km. Coffee and citrus fruits, most notably oranges, are grown in abundance, as well as bananas, pears and jackfruit. "},
        {name:"Himalayas", image:"https://upload.wikimedia.org/wikipedia/commons/d/d1/Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg", description:"The Himalayas, or Himalaya, form a mountain range in Asia separating the plains of the Indian subcontinent from the Tibetan Plateau. The Himalayan range has many of the Earth's highest peaks, including the highest, Mount Everest. The Himalayas include over fifty mountains exceeding 7,200 metres (23,600 ft) in elevation, including all of the fourteen 8,000-metre peaks. By contrast, the highest peak outside Asia (Aconcagua, in the Andes) is 6,961 metres (22,838 ft) tall."},
        {name:"Darjeeling", image:"https://www.hlimg.com/images/things2do/738X538/Darjeeling-Himalaya-railway_1508183760t.jpg",description: "Darjeeling is a town and a municipality in the Indian state of West Bengal. It is located in the Lesser Himalayas at an elevation of 6,700 ft (2,042.2 m). It is noted for its tea industry, its views of the Kangchenjunga, the world's third-highest mountain, and the Darjeeling Himalayan Railway, a UNESCO World Heritage Site. Darjeeling is the headquarters of the Darjeeling District which has a partially autonomous status within the state of West Bengal. It is also a popular tourist destination in India."},
        {name:"Shimla", image:"http://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2017/04/Honeymooners-enjoying-the-fresh-snowfall-in-Shimlas13042017.jpg", description: "Shimla, also known as Simla, is the capital and the largest city of the northern Indian state of Himachal Pradesh. Shimla is also a district which is bounded by Mandi and Kullu in the north, Kinnaur in the east, the state of Uttarakhand in the south-east, and Solan and Sirmaur. In 1864, Shimla was declared as the summer capital of British India, succeeding Murree, northeast of Rawalpindi. After independence, the city became the capital of Punjab and was later named the capital of Himachal Pradesh. It is the principal commercial, cultural and educational centre of the hilly regions of the state."},
        {name:"Manali", image:"https://www.hlimg.com/images/places2see/738X538/manali%20cover%20image_1472295446p.jpg",description:"Manali is a valley nestled in the mountains of the Indian state of Himachal Pradesh near the northern end of the Kullu Valley, at an altitude of 2,050 m (6,726 ft) in the Beas River Valley. It is located in the Kullu district, about 270 km (168 mi) north of the state capital, Shimla, 309 km (192 miles) northeast of Chandigarh and 544 km (338 miles) northeast of Delhi, the federal capital. The small town, with a population of 8,096, is the beginning of an ancient trade route to Ladakh and from there over the Karakoram Pass on to Yarkand and Khotan in the Tarim Basin. It is a popular tourist destination and serves as the gateway to Lahaul and Spiti district as well as Leh."}

    ];
        

function seedDB(){
    
   campground.remove({},function(err){
      if(err)
      {
            console.log(err) ;    
      }
      console.log("remove campgrounds!") ; 
      data.forEach(function(seed){
       
            campground.create(seed, function (err,campground){
                if(err)
                {  console.log("something went wrong");
                    console.log(err);
                    
                }
                else
                {
                    console.log("Added a campground: " + seed.name);
                    
                    comment.create(
                        {
                            text:"Wonderful place to visit",
                            author: "Ashok"   
                        }, function(err,comment){
                                if(err)
                                {
                                    console.log(err);
                                }
                                else
                                {
                                    console.log("Added comments");
                                    campground.comments.push(comment);

                                    campground.save();
                                    
                                    
                                }
                        
                            });
                    
                }
            }); 
        });
    });
   
}

module.exports = seedDB;