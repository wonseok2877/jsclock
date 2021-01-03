const weather = document.querySelector(".js-weather");

const API_KEY = "0025b070af5500788f6c78e295864d6a";

const COORDS = "coords";

function getWeather(lat, lng) {
  // fetch api !
  // then ! 가끔은 서버로부터 데이터가 들어오는대 시간이 좀 걸리는 경우도 있거든. 그래서 then을 써서 데이터가 우리헌테 넘어왔을 때 호출함.
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      // weather api 에서 봤던 javascript object를 가져옴
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  // bring up the latitude and longitude, which is the essence of geolocation
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(latitude, longitude);
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleGeoError() {
  console.log("Can't access geo location..");
}

function askForCoords() {
  // geolocation !
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
