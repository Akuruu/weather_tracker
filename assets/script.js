// timeszones for day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

//Global Variables
const searchHistory = [];
const weatherApiUrl = "https://openweathermap.org";
const apiKey = "d9a9fecef476e14177165be4b90c7d62";

//DOM element references
//#search form, #search input, #today, #forecast, #history
let searchForm;
let searchInput;
let todayBox;
let forecastBox
let searchDisplay





//create a fetch inside of a function request to fetch the data from the weather API
