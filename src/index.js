//let weather = {
// paris: {
// temperature: 19.7,
// humidity: 80,
//},
// tokyo: {
//temperature: 17.3,
//humidity: 50,
// },
//lisbon: {
// temperature: 30.2,
// humidity: 20,
// },
//"san francisco": {
//  temperature: 20.9,
//  humidity: 100,
// },
// moscow: {
// temperature: -5,
// humidity: 20,
//},
//};

//let city = prompt("Please enter a city : Paris, Tokyo, Lisbon, San Francisco or Moscow.");

//alert(`It is currently ${celsiusTemperature}ºC (${fahrenheitTemperature}ºF) in ${city} with a humidity of ${humidity}%.`);} else {alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`)}

let now = new Date();
console.log(now);

function dayHour(now) {
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[now.getDay()];
  let month = months[now.getMonth()];

  //city = city.toLocaleLowerCase();
  //if (weather[city] !== undefined) {
  // let temperature = weather[city].temp;
  // let humidity = weather[city].humidity;
  // let celsiusTemperature = Math.round(temperature);
  // let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);

  let clock = `, ${day}, ${date} ${month}, ${hours}:${minutes}`;
  return clock;
}

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

let button = document.querySelector("button");
button.addEventListener("click", showCity);

function currentHome(position) {
  let apiKey = "677571ea5aaed640ed5d7529e96208c2";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let homeUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(homeUrl).then(showTemperature);
}

function getCurrentHome(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentHome);
}

let buttonCurrentHome = document.querySelector("#currentHome");
buttonCurrentHome.addEventListener("click", getCurrentHome);

let emojiFirstElement = document.querySelector("#emojiFirst");

function showTemperature(response) {
  document.querySelector("#city").innerHTML =
    `${response.data.name}` + dayHour(now);

  let celsius = document.querySelector("#celsius");
  celsius.innerHTML = `${Math.round(response.data.main.temp)}Cº`;
  let celciusValue = Math.round(response.data.main.temp);
  console.log(celciusValue);

  document.querySelector("#tempMax").innerHTML = `H ${Math.round(
    response.data.main.temp_max
  )}º `;
  let celciusMax = Math.round(response.data.main.temp_max);
  console.log(celciusMax);

  document.querySelector("#tempMin").innerHTML = `L ${Math.round(
    response.data.main.temp_min
  )}º `;
  let celciusMin = Math.round(response.data.main.temp_min);
  console.log(celciusMin);

  document.querySelector(
    "#realFeel"
  ).innerHTML = `real feel like : ${Math.round(
    response.data.main.feels_like
  )}Cº`;
  let celciusRealFeel = Math.round(response.data.main.feels_like);
  console.log(celciusRealFeel);

  document.querySelector("#description").innerHTML =
    `${response.data.weather[0].main} |`.toLowerCase();

  document.querySelector("#wind").innerHTML = ` w ${Math.round(
    response.data.wind.speed
  )}km/hr |`;

  document.querySelector("#humidity").innerHTML = ` humidity ${Math.round(
    response.data.main.humidity
  )}%`;

  function farnheiteToCelsius(event) {
    event.preventDefault();

    let celsius = document.querySelector("#celsius");
    celsius.innerHTML = `${Math.round(response.data.main.temp * 9) / 5 + 32}ºF`;

    document.querySelector("#tempMax").innerHTML = `H ${
      Math.round(response.data.main.temp_max * 9) / 5 + 32
    }º `;

    document.querySelector("#tempMin").innerHTML = `L ${
      Math.round(response.data.main.temp_min * 9) / 5 + 32
    }º `;

    document.querySelector("#realFeel").innerHTML = `real feel like : ${
      Math.round(response.data.main.feels_like * 9) / 5 + 32
    }ºF`;
  }
  let fToC = document.querySelector("#fToC");
  fToC.addEventListener("click", farnheiteToCelsius);

  function celsiusToFarnheite(event) {
    event.preventDefault();

    let celsiusC = document.querySelector("#celsius");
    celsiusC.innerHTML = `${Math.round(response.data.main.temp)}Cº`;

    document.querySelector("#tempMax").innerHTML = `H ${Math.round(
      response.data.main.temp_max
    )}º `;

    document.querySelector("#tempMin").innerHTML = `L ${Math.round(
      response.data.main.temp_min
    )}º `;

    document.querySelector(
      "#realFeel"
    ).innerHTML = `real feel like : ${Math.round(
      response.data.main.feels_like
    )}Cº`;
  }
  let cToF = document.querySelector("#cToF");
  cToF.addEventListener("click", celsiusToFarnheite);

  emojiFirstElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  emojiFirstElement.setAttribute("alt", response.data.weather[0].description);
}
function search() {
  let apiKey = "677571ea5aaed640ed5d7529e96208c2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=lisbon&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
search();
function searchCity() {
  let cityName = document.querySelector("#search-text-input").value;
  let apiKey = "677571ea5aaed640ed5d7529e96208c2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

//function celsiusToFahrenheit(event, response) {
//event.preventDefault();
//let celsiusElement = document.querySelector("#celsius");
//let celsius = celsiusElement.innerHTML;
//celsius = `${Math.round(response.data.main.temp)}`;

//let realFeel = document.querySelector("#realFeel");
//realFeel.innerHTML = `real feel like : ${Math.round(
// response.data.main.feels_like
// )}Cº`;
//}

//let cToF = document.querySelector("#cToF");
//cToF.addEventListener("click", celsiusToFahrenheit);
