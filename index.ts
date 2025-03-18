const API_KEY = "648a2876b3cb745c6a8e46caeef48895";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Gets HTML-Elements for showcasing the weatherdata
const temperatureElement = document.querySelector('.temperature') as HTMLElement;
const locationElement = document.querySelector('.location') as HTMLElement;
const locationTimeElement = document.querySelector('.location-time') as HTMLElement;
const weatherStatusElement = document.querySelector('.weather-status') as HTMLElement;
const weatherIconElement = document.querySelector('.weather-icon') as HTMLElement;
const sunriseElement = document.querySelector('.sunrise-sunset span:first-of-type') as HTMLElement;
const sunsetElement = document.querySelector('.sunrise-sunset span:last-of-type') as HTMLElement;
const extendedInfoButton = document.querySelector('.extendedinfo-button') as HTMLElement;