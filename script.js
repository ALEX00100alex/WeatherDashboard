
const apiKey = "91ab1f166a22407eaa1886ec52afbc9a";

$(document).ready(init);
function init () {
    $("nav button").on("click", searchButtonClicked);
    getSavedCities();
}


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
    }).then(gotCityData);
}

function gotCityData(data) {
    displayCityData(data);
    let city = data.name;
    addCity(city);
    getSavedCities();
    let lat = data.coord.lat;
    let long = data.coord.lon;
    getForecast(lat,long);
}

function getForecast(lat,long){
    var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(displayForecast);
}

function displayForecast (data) {
    console.log(data);
    var html = '<h3>5 Day Forecast:</h3>';
    for (let i=0; i<5; i++) {
        let day=data.daily[i];
        let temp=day.temp.day;
        let humidity=day.humidity;
        let icon=day.weather[0].icon;
        let date = (new Date(day.dt*1000)).toDateString();
        html+= `
        <div class="col-md-2 boxes">
            <h4>${date}</h4>
            <img src='http://openweathermap.org/img/wn/${icon}@2x.png'>
            <p>Temp: ${temp}&deg;F</p>
            <p>Humidity: ${humidity}%</p>   
        </div>
        `;
    }
    $('#row-3').html(html);
}

function displayCityData(data) {
    var temp = data.main.temp;
    var city = data.name;
    var humid = data.main.humidity;
    var wind = data.wind.speed;
    let date = (new Date(data.dt*1000)).toDateString();
    var html = `
        <h2>${city} ${date}</h2> 
        <p>Temp: ${temp}&deg;F</p>
        <p>Humidity: ${humid}%</p>
        <p>Wind Speed: ${wind}mph</p>
    `;
    $("#main .card-body").html(html);
 }

function getCities () {
    let cities = localStorage.getItem("cities");
    if(cities){
        return JSON.parse(cities);
    } 
    return [];
}

function addCity(city) {
    let cities = getCities();
    if(!cities.includes(city)) {
        cities.unshift(city);
        localStorage.setItem("cities", JSON.stringify(cities));
    }
}

function getSavedCities () {
    let cities = getCities();
    let html="";
    for(let city of cities){
        html+=`<button type="button" class="list-group-item list-group-item-action">${city}</button>`;
    }
    $("#city-buttons").html(html);
    $("#city-buttons button").on("click", savedCityButtonClicked)
}

function savedCityButtonClicked () {
    let city = $(this).text();
    getCityData(city);
}

