const API_KEY: string = "648a2876b3cb745c6a8e46caeef48895";
const city: string = "Uppsala";
const countryCode: string = "SE";
const API_URL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`;

// Gets HTML-Elements for showcasing the weatherdata
const temperatureElement = document.querySelector('.temperature') as HTMLElement;
const locationElement = document.querySelector('.location') as HTMLElement;
const locationTimeElement = document.querySelector('.location-time') as HTMLElement;
const weatherStatusElement = document.querySelector('.weather-status') as HTMLElement;
const weatherIconElement = document.querySelector('.weather-icon') as HTMLElement;
const sunriseElement = document.querySelector('.sunrise-time') as HTMLElement;
const sunsetElement = document.querySelector('.sunset-time') as HTMLElement;
const extendedInfoButton = document.querySelector('.extendedinfo-button') as HTMLElement;

// Fetches weather data from the OpenWeatherMap API
async function fetchWeather() {
    try {
        // Sends a request to the the API
        console.log(API_URL);
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const temperature = data.main.temp;
        console.log(temperature);
        temperatureElement.innerHTML = `${Math.round(temperature)}°C`;

        const location = data.name;
        locationElement.innerHTML = location;

        const locationTime = new Date(data.dt * 1000);
        locationTimeElement.innerHTML = locationTime.toLocaleTimeString('sv-SE', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const weatherStatus = data.weather[0].description;
        weatherStatusElement.innerHTML = weatherStatus.charAt(0).toUpperCase() + weatherStatus.slice(1);

        const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        weatherIconElement.innerHTML = `<img src="${weatherIcon}" alt="Weather Icon">`;

        const sunrise = new Date(data.sys.sunrise * 1000);
        sunriseElement.innerHTML = sunrise.toLocaleTimeString('sv-SE', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const sunset = new Date(data.sys.sunset * 1000);
        sunsetElement.innerHTML = sunset.toLocaleTimeString('sv-SE', {
            hour: '2-digit',
            minute: '2-digit'
        });

        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
fetchWeather();