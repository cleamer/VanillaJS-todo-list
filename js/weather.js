const API_KEY = "f95addeab90a563ed1066a71d9a07ebb";

function onGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const weather = document.querySelector("#weather span:first-child");
            const city = document.querySelector("#weather span:last-child");
            city.innerText = data.name;
            weather.innerText = `${data.weather[0].main} / ${Math.round(data.main.temp)}°C`;
        });
}
function onGeoError() {}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
