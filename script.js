
const apiKey = "91ab1f166a22407eaa1886ec52afbc9a";

$("nav button").on("click", searchButtonClicked);

function searchButtonClicked() {
//grab search bar input
let input = $("nav input");
let city = input.val();
input.val("");
//then call getCityData
getCityData(city); 
}

function getCityData(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(displayCityData);
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid=${apiKey}&units=imperial`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(displayForecastData);
}

function displayCityData(data) {
    var temp = data.main.temp;
    var city = data.name;
    var humid = data.main.humidity;
    var wind = data.wind.speed;
    var html = `
        <h2>${city}</h2>
        <p>temp: ${temp}&deg;F</p>
        <p>humidity: ${humid}%</p>
        <p>wind speed: ${wind}mph</p>
    `;
    $("#main .card-body").html(html);
 }

 function displayForecastData(data) {
    console.log(data);

 }


