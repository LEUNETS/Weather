const input = document.querySelector(".input");
const button = document.querySelector(".button");
const nowWeather = document.querySelector(".nowWeather");
const temeprature = document.querySelector(".temeprature");
const veter = document.querySelector(".veter");
const vlag = document.querySelector(".vlag");
const dav = document.querySelector(".dav");
const were = document.querySelector(".were");

const requestApi = async (city, coords) => {
    let api = ''
    if (city) {
        api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=772fd0a2601eeaf5929b9429cf71e838`;
    }
    else {
        api = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=772fd0a2601eeaf5929b9429cf71e838`
    }
    const response = await fetch(api);
    const json = await response.json();
    nowWeather.innerHTML = `${json.main.temp_max} °`;
    temeprature.innerHTML = ` ${json.main.temp} °`;
    veter.innerHTML = `${json.wind.speed} м/c`;
    vlag.innerHTML = `${json.main.humidity} %`;
    dav.innerHTML = `${json.main.pressure} `;
};
input.addEventListener("keyup", e => {
    if (e.key == "Enter" && input.value != "") {
        requestApi(input.value);
    }
});
button.addEventListener("click", () => {
    if (input.value != "") {
        requestApi(input.value);
    }
});
const requestApiGeolocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((v) => {
            requestApi(null, v.coords)
        }, (error) => {
            console.error(error)
        });

    } else {
        console.error("Ваш браузер не поддерживает геолокацию");
    }
}

were.addEventListener("click", () => {
    requestApiGeolocation()
});

requestApiGeolocation();


