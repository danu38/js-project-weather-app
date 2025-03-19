var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var API_KEY = "648a2876b3cb745c6a8e46caeef48895";
var city = "Uppsala";
var countryCode = "SE";
var API_URL = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&units=metric&APPID=").concat(API_KEY);
// Gets HTML-Elements for showcasing the weatherdata
var temperatureElement = document.querySelector('.temperature');
var locationElement = document.querySelector('.location');
var locationTimeElement = document.querySelector('.location-time');
var weatherStatusElement = document.querySelector('.weather-status');
var weatherIconElement = document.querySelector('.weather-icon');
var sunriseElement = document.querySelector('.sunrise-time');
var sunsetElement = document.querySelector('.sunset-time');
var extendedInfoButton = document.querySelector('.extendedinfo-button');
// Fetches weather data from the OpenWeatherMap API
function fetchWeather() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, temperature, location_1, locationTime, weatherStatus, weatherIcon, sunrise, sunset, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    // Sends a request to the the API
                    console.log(API_URL);
                    return [4 /*yield*/, fetch(API_URL)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    temperature = data.main.temp;
                    console.log(temperature);
                    temperatureElement.innerHTML = "".concat(Math.round(temperature), "\u00B0C");
                    location_1 = data.name;
                    locationElement.innerHTML = location_1;
                    locationTime = new Date(data.dt * 1000);
                    locationTimeElement.innerHTML = locationTime.toLocaleTimeString('sv-SE', {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    weatherStatus = data.weather[0].description;
                    weatherStatusElement.innerHTML = weatherStatus.charAt(0).toUpperCase() + weatherStatus.slice(1);
                    weatherIcon = "https://openweathermap.org/img/wn/".concat(data.weather[0].icon, ".png");
                    weatherIconElement.innerHTML = "<img src=\"".concat(weatherIcon, "\" alt=\"Weather Icon\">");
                    sunrise = new Date(data.sys.sunrise * 1000);
                    sunriseElement.innerHTML = sunrise.toLocaleTimeString('sv-SE', {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    sunset = new Date(data.sys.sunset * 1000);
                    sunsetElement.innerHTML = sunset.toLocaleTimeString('sv-SE', {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    console.log(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
fetchWeather();
