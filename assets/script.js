//Global Variables
const searchHistory = [];
const apiKey = "d9a9fecef476e14177165be4b90c7d62";

var weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&current.weather&exclude=minutely,daily&current.temp&current.uvi&current.wind_speed&current.humidity&units=imperial&appid=${apiKey}`;
var geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=Orlando&limi=5&appid=${apiKey}`;

// timeszones for day.js to get current day and 5-day dates
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

//DOM element references
let searchForm = document.querySelector("#search-form");
let searchInput = document.querySelector("#search-input");
let todayBox = document.querySelector("#today");
let forecastBox = document.querySelector("#forecast");
let searchDisplayBox = document.querySelector("#history");
let searchButton = document.querySelector("#search-button");

//function to display search history
function displaySearchHistory (){
 searchDisplayBox.innerHTML = "";
 for (let i = 0; i < searchHistory.length; i++ ) {
     var last = document.createElement("input");
     last.setAttribute("type","text");
     last.setAttribute("readonly",true);
     last.setAttribute("class", "d-block bg-black");
     last.setAttribute("value", searchHistory[i]);
     last.addEventListener("click",function() {
     displayWeather(last.value);
     })
     searchDisplayBox.append(last);
    }
}

searchButton.addEventListener("click",function() {
    const searchTerm = inputEl.value;
    displayWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search",JSON.stringify(searchHistory));
    displaySearchHistory();
})

searchButton.addEventListener("click",function() {
    searchHistory = [];
    displaySearchHistory();
})


// fetch for weather data
function weatherData(weatherApiUrl) {
    fetch(weatherApiUrl) 
    .then (function (res) {
        return res.json()
    })
    .then (function(data) {
        displayWeather(data);
     //    forecastBox.innerHTML = data     
         console.log(data.current);
    });
}
// fetch for geo data
function geoData(geoApiUrl) {
    fetch(geoApiUrl)
    .then (function(res) {
        return res.json()
    })
    .then (function(data) {
        retrieveGeo(data);
        console.log(data);
    })
}

// categories for weather display
var selectedCity = {
    name: "",
    temp: "",
    humidity: "",
    uvi: "",
    humidity: "",
};

function retrieveGeo(data){
    selectedCity["name"] = data[0]["name"];
    var cityId = data.id;
    geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=` + cityId + `&limi=5&appid=${apiKey}`
     retrieveWeather([data[0]["lat"], data[0]["lon"]]);
    
 }
  function retrieveWeather(latLon){
     let weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+latLon[0]+ "&lon=" 
     + latLon[1]+ `&units=imperial&exclude=hourly&appid=${apiKey}`
     weatherData(weatherApiUrl);
  }  

// displays the weather for the current day
function displayWeather(data) {
    data["name"] = selectedCity["name"];
    selectedCity = data;
    var todayList = document.createElement("div");
    todayBox.append(todayList);

    todayList.innerHTML = "<h2> " +  selectedCity["name"] + " " + dayjs().format("MM/DD/YYYY h:mm A") + "</h2>"+ " " + 
    " <img src='http://openweathermap.org/img/wn/" + 
    selectedCity["current"]["weather"][0]["icon"] + "@2x.png' /></p>" +
    "<p> Temp: " + selectedCity["current"]["temp"] + " F</li>" +
    "<p> Wind: " + selectedCity["current"]["wind_speed"] + " MPH</p>" +
    "<p> Humidity: " + selectedCity["current"]["humidity"] + " %</p>" +
    "<p> UV Index: " + selectedCity["current"]["uvi"] + "</p>";


// lists the forecasts for the week
  var weekDay = 1;
  var daily = data["daily"].slice(0, 5);

  
  for (day in daily){
    var weeklyWeather = document.createElement("div")
    forecastBox.append(weeklyWeather);
    weeklyWeather.innerHTML = "<h2>" + dayjs().add(weekDay, "day").format("MM/DD/YYYY h:mm A") + "</h2>" + 
    " <img src='http://openweathermap.org/img/wn/" + 
    daily[day]["weather"][0]["icon"] + "@2x.png'></p>" +
    "<p> Temp: " + daily[day]["temp"]["day"] + " F</p>" +
    "<p> UV Index: " + selectedCity["current"]["uvi"] + "</p>" +
    "<p> Wind: " + daily[day]["wind_speed"] + " MPH</p>" +
    "<p> Humidity: " + daily[day]["humidity"] + " %</p>";

    //displays new date for each day
    weekDay++;
    }
 
}

displaySearchHistory();
    if (searchHistory.length > 0) {
        displayWeather(searchHistory[searchHistory.length - 1]);
    }

 // Search button event 
   searchButton.addEventListener("click", function(event){
        event.preventDefault();
        if (searchInput.value === "") {
            alert("Enter a city name");
            return;
        }
    })
    
geoData(geoApiUrl);
weatherData(weatherApiUrl);
