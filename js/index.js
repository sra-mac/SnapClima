//Interação
const citySearchInput = document.getElementById('city-search-input');
const citySearchButton = document.getElementById('city-search-button');

//Exibição
const currentDate = document.getElementById('current-date');
const cityName = document.getElementById('current-city');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const currentTemperature = document.getElementById('current-temperature');
const windSpeed = document.getElementById('wind-speed');
const fellsLikeTemperature = document.getElementById('feels-like-temperature');
const currentHumidity = document.getElementById('current-humidity');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');

const api_key = "c4acc9aa226a132f61bd6d857d174d21";

citySearchButton.addEventListener("click", ()=>{
    let cityName =citySearchInput.value
    getCityWeather(cityName)
})

navigator.geolocation.getCurrentPosition(
    (position) => {
        // console.log(position);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getCurrentLocationWeather(lat, lon);
    },
    (err) =>{
        if(err.code === 1){
            alert("Precisa habilitar a permissão de localização!");
        }else{
            console.log(err)
        }
    }
)

function getCityWeather(cityName){
    weatherIcon.src = `./assets/loading-icon.svg`;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response)=> response.json())//convertendo dados da api em json
    .then((data) => changeDataDisplay(data))
}



function getCurrentLocationWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response)=> response.json())//convertendo dados da api em json
    .then((data) => changeDataDisplay(data))
}

// function changeDataDisplay(data){
//     weatherDescription.innerHTML = data.weather[0].description;
//     currentDate.innerHTML = data.dt;
//     cityName.innerHTML = data.name;
//     weatherIcon.setAttribute("src", "./assets/"+data.weather[0].icon+".svg");
//     weatherDescription.innerHTML = data.weather[0].description;
//     currentTemperature.innerHTML = data.main.temp;
//     windSpeed.innerHTML = data.wind.speed;
//     fellsLikeTemperature.innerHTML = data.main.temp;
//     currentHumidity.innerHTML = data.main.humidity;
//     sunriseTime.innerHTML = data.sys.sunrise;
//     sunsetTime.innerHTML = data.sys.sunset;
// }
function changeDataDisplay(data){
	/*desestruturação do objeto, pegando só o que irá utilizar*/
    let {
        dt,
        name,
        weather: [{ icon, description }],
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset },
    } = data;
    weatherDescription.textContent = description;
    currentDate.textContent = formatDate(dt);
    cityName.textContent = name;
    weatherIcon.src = `./assets/${icon}.svg`;
    weatherDescription.textContent = description;
    currentTemperature.textContent = `${Math.round(temp)}ºC`;
    windSpeed.textContent = `${Math.round(speed * 3.6)}km`;
    fellsLikeTemperature.textContent =  `${Math.round(feels_like)}`;
    currentHumidity.textContent = `${humidity}%`;
    sunriseTime.textContent = formatTime(sunrise);
    sunsetTime.textContent = formatTime(sunset);
}

function formatDate(epoch){
    let date = new Date(epoch * 1000);
    let formatterDate = date.toLocaleDateString('pt-BR', {month: "long", day: 'numeric'});
    return `Hoje, ${formatterDate}`;
}

function formatTime(epochTime){
    let date = new Date(epochTime * 1000);
    let formatterHours = date.getHours();
    let formatterMinutes = date.getMinutes();
    return `${formatterHours}:${formatterMinutes}`;
}