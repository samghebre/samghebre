const api = {
    key: "b1b51bd98abaa0756f3c1cd18a24761b",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;


    const timezone = weather.timezone;
    console.log(timezone);


    let sunrise = document.querySelector('.location .sunrise');
    sunrise.innerHTML = `${weather.name}, ${getDateFromUnixTime(weather.sys.sunrise, timezone)}`;

    let sunset = document.querySelector('.location .sunset');
    sunset.innerHTML = `${weather.name}, ${getDateFromUnixTime(weather.sys.sunset, timezone)}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

    let temp2 = document.querySelector('.current .feels_like');
    temp2.innerHTML = `${Math.round(weather.main.feels_like)}<span>°F</span>`;

    let humid = document.querySelector('.current .humidity');
    humid.innerHTML = `${Math.round(weather.main.humidity)}<span>%</span>`

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}


function getDateFromUnixTime(unixTime, timezone) {
    const date = new Date((unixTime * 1000) + timezone);
    let minutes, hours, seconds;
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`
}