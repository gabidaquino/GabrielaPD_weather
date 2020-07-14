function displayWeather(response) {
  document.querySelector("#city-display").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#min").innerHTML = `min ${Math.round(
    response.data.main.temp_min
  )} ºC`;
  document.querySelector("#max").innerHTML = `max ${Math.round(
    response.data.main.temp_max
  )} ºC`;
  document.querySelector("#country-display").innerHTML =
    response.data.sys.country;
  console.log(response.data.name);
}
function searchCity(city) {
  let apiKey = "f40c452c872335dff1152a721c30a322";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f40c452c872335dff1152a721c30a322&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "f40c452c872335dff1152a721c30a322";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function getCurrtenLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSearch);
//show date
function showDate() {
  let today = new Date();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = weekdays[today.getDay()];
  let monthday = today.getDate();
  let months = [
    "Jan",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Semptember",
    "October",
    "November",
    "December",
  ];
  let month = months[today.getMonth()];
  let year = today.getFullYear();
  let hour = today.getHours();
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  } else {
    minutes = minutes + "";
  }
  let dateNow = document.querySelector("#date-line");
  dateNow.innerHTML = `${weekday}, ${monthday} ${month} ${year} | ${hour}:${minutes}`;
}
showDate();

let currentButton = document.querySelector("#current-city");
currentButton.addEventListener("click", getCurrtenLocation);
searchCity("New york");
