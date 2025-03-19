"use strict";
const API_KEY = "648a2876b3cb745c6a8e46caeef48895";
const city = "Uppsala";
const countryCode = "SE";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`;
const API_FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`;
// Gets HTML-Elements for showcasing the weatherdata
const temperatureElement = document.querySelector(".temperature");
const locationElement = document.querySelector(".location");
const locationTimeElement = document.querySelector(".location-time");
const weatherStatusElement = document.querySelector(".weather-status");
const weatherIconElement = document.querySelector(".weather-icon");
const sunriseElement = document.querySelector(".sunrise-time");
const sunsetElement = document.querySelector(".sunset-time");
const extendedInfoButton = document.querySelector(".extendedinfo-button");
// Extended info elements
const upcomingDaysContainer = document.querySelector(".upcomming-days");
const forecastContainer = document.querySelector(".forecast-container");
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
        /*     const localTime = new Date();
            locationTimeElement.innerHTML = localTime.toLocaleTimeString("sv-SE", {
              hour: "2-digit",
              minute: "2-digit",
            }); */
        const timezoneOffset = data.timezone;
        const locationTime = new Date((data.dt + timezoneOffset) * 1000);
        locationTimeElement.innerHTML = locationTime.toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
        });
        const weatherStatus = data.weather[0].description;
        weatherStatusElement.innerHTML = weatherStatus.charAt(0).toUpperCase() + weatherStatus.slice(1);
        const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        weatherIconElement.innerHTML = `<img src="${weatherIcon}" alt="Weather Icon">`;
        const sunrise = new Date(data.sys.sunrise * 1000);
        sunriseElement.innerHTML = sunrise.toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
        });
        const sunset = new Date(data.sys.sunset * 1000);
        sunsetElement.innerHTML = sunset.toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
        });
        console.log(data);
    }
    catch (error) {
        console.error(error);
    }
}
setInterval(fetchWeather, 5000);
async function fetchForecast() {
    try {
        const response = await fetch(API_FORECAST_URL);
        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        upcomingDaysContainer.innerHTML = "";
        // Object to store daily temperatures
        const dailyForecast = {};
        data.list.forEach((item) => {
            const date = new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" });
            const temp = item.main.temp;
            const icon = item.weather[0].icon;
            if (!dailyForecast[date]) {
                dailyForecast[date] = { tempMax: temp, tempMin: temp, icon };
            }
            else {
                dailyForecast[date].tempMax = Math.max(dailyForecast[date].tempMax, temp);
                dailyForecast[date].tempMin = Math.min(dailyForecast[date].tempMin, temp);
            }
        });
        // Loop through forecast and display next 4 days
        Object.entries(dailyForecast)
            .slice(1, 5)
            .forEach(([day, forecast]) => {
            const forecastRow = document.createElement("div");
            forecastRow.classList.add("forecast-day");
            forecastRow.innerHTML = `
                    <p>${day}</p>
                    <img src="https://openweathermap.org/img/wn/${forecast.icon}@2x.png" alt="Weather icon">
                    <p>${Math.round(forecast.tempMax)}° / ${Math.round(forecast.tempMin)}°C</p>
                `;
            upcomingDaysContainer.appendChild(forecastRow);
        });
    }
    catch (error) {
        console.error("Error fetching forecast data:", error);
    }
}
// Toggle Forecast on Button Click
extendedInfoButton.addEventListener("click", () => {
    forecastContainer.classList.toggle("show");
    extendedInfoButton.classList.toggle("rotate");
    // Fetch forecast only when opening
    if (forecastContainer.classList.contains("show")) {
        fetchForecast();
    }
});
