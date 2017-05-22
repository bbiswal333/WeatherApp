var request = require('request');
var async = require('async');
var express = require("express");

var app = express();

var APPID = "ddb2b86f75c107be5253f76bdeaa8ebe";
/*var addresses = [
    "Bangalore",
    "Chennai",
    "Delhi",
    "Kolkata",
    "Mumbai",
];*/

/*function accessUrl( address, callback ) {  
    options ={
        headers: {'user-agent': 'Mozilla/5.0'},
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + address +"&appid="+APPID,
        json: true
    };

    request.get(options, function(err, response, body_json) {
        if( !err && response.statusCode === 200 ){
            return callback(null, [[ address, body_json['weather'][0]['main'],
                 Math.round(body_json['main']['temp']-273.15)]]);
        }
        else{
            return callback(err);
        }
    });
}

async.concat (addresses, accessUrl, function(err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});*/

var getWeatherForcast = function(req,res){
	options ={
        headers: {'user-agent': 'Mozilla/5.0'},
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + req.params.city +"&appid="+APPID,
        json: true
    };
	request.get(options, function(err, response, body_json) {
        if( !err && response.statusCode === 200 ){
            //return callback(null, [[ address, body_json['weather'][0]['main'],
             //    Math.round(body_json['main']['temp']-273.15)]]);
			 var body_json1 = [];
			 body_json1.push(body_json);   
			 return res.json({"d":body_json1});
        }
		if(err){
			return res.json({"msg":"err"});
		}
        else{
            //return callback(err);
			return res.json({"msg":"NOT_FOUND"});
        }
    });
	//res.send("Showing weather forcast of "+req.params.city);
};

app.get("/",function(req,res){
	res.send("Welcome to weather forcast!!");
});
app.get("/weather/:city",getWeatherForcast);

var port  = process.env.PORT || 3000;
app.listen(port,function(){
	console.log("Server started at 3000");
});