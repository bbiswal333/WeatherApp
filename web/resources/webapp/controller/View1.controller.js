sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("web.controller.View1", {
		
		onInit: function() {
			var path = "https://hxehost:51065/weather/bangalore";
			//var path = "http://api.openweathermap.org/data/2.5/weather?q=Bhadrak&mode=json&appid=ddb2b86f75c107be5253f76bdeaa8ebe";
			this.getWeather(path);
			 
			
		},
		onAfterRendering : function(){
			// var path = "https://hxehost:51065/weather/bangalore";
			//  this.getWeather(path);
			 
			
		},
		getWeather : function(path){
			 var oModel = new sap.ui.model.json.JSONModel();
			 oModel.loadData(path);
			 sap.ui.core.BusyIndicator.show();
			 oModel.attachRequestCompleted(function() {
		        console.log(oModel.getData()); 
		        var msg = oModel.getProperty("/msg");
		        if(msg){
		        	alert("No results found"); 
		        }else{
		        	
			        	var city = oModel.getProperty("/d/0/name");
			        	var country = oModel.getProperty("/d/0/sys/country");
				        var temp = oModel.getProperty("/d/0/main/temp");
				        var desc = oModel.getProperty("/d/0/weather/0/main")+" "+oModel.getProperty("/d/0/weather/0/description"); 
				       
				       
						sap.ui.getCore().byId("__xmlview0--city_label").setText("Weather in "+city+","+country);
						sap.ui.getCore().byId("__xmlview0--temp_label").setText(Math.floor(parseInt(temp)-273.15)+"°C");
						sap.ui.getCore().byId("__xmlview0--desc_label").setText(desc);
		        
		        }
		        sap.ui.core.BusyIndicator.hide();
			 });
		},
		search : function(){
			var defaultCity = "Bangalore";
			var city = sap.ui.getCore().byId("__xmlview0--search_field").getValue();
			var path="";
			if(city==""){
				 path = "https://hxehost:51065/weather/"+defaultCity;
			}else{
				path = "https://hxehost:51065/weather/"+city;
			}
			this.getWeather(path);
		}
	});
});