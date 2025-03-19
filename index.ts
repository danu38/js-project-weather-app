const API_KEY: string = "648a2876b3cb745c6a8e46caeef48895";
const city: string = "Uppsala";
const countryCode: string = "SE";
const API_URL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`;
const API_FORECAST_URL: string = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`;

// Gets HTML-Elements for showcasing the weatherdata
const temperatureElement = document.querySelector(".temperature") as HTMLElement;
const locationElement = document.querySelector(".location") as HTMLElement;
const locationTimeElement = document.querySelector(".location-time") as HTMLElement;
const weatherStatusElement = document.querySelector(".weather-status") as HTMLElement;
const weatherIconElement = document.querySelector(".weather-icon") as HTMLElement;
const sunriseElement = document.querySelector(".sunrise-time") as HTMLElement;
const sunsetElement = document.querySelector(".sunset-time") as HTMLElement;

const extendedInfoButton = document.querySelector(".extendedinfo-button") as HTMLElement;

// Extended info elements
const upcomingDaysContainer = document.querySelector(".upcomming-days") as HTMLElement;

const forecastContainer = document.querySelector(".forecast-container") as HTMLElement;

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
  } catch (error) {
    console.error(error);
  }
}

fetchWeather();

async function fetchForecast() {
  try {
    const response = await fetch(API_FORECAST_URL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();

    // Clear previous forecast data
    upcomingDaysContainer.innerHTML = "";

    // Filter forecast data to get one entry per day (Noon time)
    const dailyForecast: any[] = [];
    const processedDates = new Set();

    data.list.forEach((item: any) => {
      const date = new Date(item.dt_txt);
      const day = date.toLocaleDateString("en-US", { weekday: "short" });

      if (!processedDates.has(day) && item.dt_txt.includes("12:00:00")) {
        processedDates.add(day);
        dailyForecast.push(item);
      }
    });

    // Loop through the filtered forecast data and display it
    dailyForecast.slice(1, 5).forEach((day) => {
      const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" });
      const tempMax = Math.round(day.main.temp_max);
      const tempMin = Math.round(day.main.temp_min);
      const icon = day.weather[0].icon;

      // Create forecast row
      const forecastRow = document.createElement("div");
      forecastRow.classList.add("forecast-day");
      forecastRow.innerHTML = `
                <p>${date}</p>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
                <p>${tempMax}° / ${tempMin}°C</p>
            `;
      upcomingDaysContainer.appendChild(forecastRow);
    });
  } catch (error) {
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
