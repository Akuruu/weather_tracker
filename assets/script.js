//Global Variables
const searchHistory = [];
// const weatherApiUrl = "https://api.openweathermap.org/";
const apiKey = "d9a9fecef476e14177165be4b90c7d62";

// timeszones for day.js to get current day and 5-day dates
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

//DOM element references
//#search form, #search input, #today, #forecast, #history
let searchForm = document.querySelector("#search-form");
let searchInput = document.querySelector("#search-input");
let todayBox = document.querySelector("#today");
let forecastBox = document.querySelector("#forecast");
let searchDisplayBox = document.querySelector("#history");
let searchButton = document.querySelector("#search-button");


//function to display search history
//function displaySearchHistory (){
// searchDisplayBox.innerHTML = "";
// }

var weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&current.weather&exclude=minutely,daily&current.temp&current.uvi&current.wind_speed&current.humidity&units=imperial&appid=${apiKey}`;
console.log(weatherApiUrl);
// function to display current weather
function weatherData(weatherApi) {
    fetch(weatherApi) 
    .then (function (res) {
        return res.json()
    })
    .then (function(data) {
         for (var i = 0; i < data.length; i++) {

            
         }
         forecastBox.innerHTML = data
        
         console.log(data.current);
    });
}

/*
 function displayWeather(data) {
    for  (i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = 'temp' + data[i].current;
        forecastBox.appendChild(div);
    }
 }
*/
weatherData(weatherApiUrl);
// displayWeather();

//create a fetch inside of a function request to fetch the data from the weather API
