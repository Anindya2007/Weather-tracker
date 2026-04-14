// For fetching weather and air quality data
const API_KEY = '0441e7dcc94ee6ddd6a68df3843ca1e6';
const searchedCities = [];

const el = (id) => document.getElementById(id);

function setText(id, value) {
  const node = el(id);
  if (node) node.innerText = value;
}

function showPage(page) {
  const landing = el('landing-page');
  const weather = el('user-interface');
  const forecast = document.querySelector('body > #forecast');

  if (landing) landing.style.display = page === 'landing' ? 'block' : 'none';
  if (weather) weather.style.display = page === 'weather' ? 'block' : 'none';
  if (forecast) forecast.style.display = page === 'forecast' ? 'block' : 'none';
}

function showLanding() {
  showPage('landing');
}

function showWeather() {
  showPage('weather');
}

function showForecast() {
  showPage('forecast');
}

function Explore() {
  showWeather();
}

async function fetchJson(url) {
  const res = await fetch(url);
  return res.json();
}

function getWeatherData(city) {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  return fetchJson(api);
}

function getAirQualityData(lat, lon) {
  const api = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return fetchJson(api);
}

function renderPreviousCities() {
  const otherDays = el('other-days');
  if (!otherDays) return;

  const cards = searchedCities
    .filter((city) => city?.name)
    .map(
      (city) => `
      <div class="history-card">
        <h3>${city.name}</h3>
        <p>${city.temp}</p>
        <p>${city.weather}</p>
        <p>${city.minmax}</p>
      </div>
    `
    );

  otherDays.innerHTML = cards.join('');
}

function updateForecastValues(airData, weatherData) {
  const item = airData?.list?.[0];
  const comp = item?.components || {};

  setText('aqi-value', `AQI: ${item?.main?.aqi ?? '--'}`);
  setText('co', `${comp.co ?? '--'} μg/m³`);
  setText('no2', `${comp.no2 ?? '--'} μg/m³`);
  setText('o3', `${comp.o3 ?? '--'} μg/m³`);
  setText('so2', `${comp.so2 ?? '--'} μg/m³`);
  setText('pm2_5', `${comp.pm2_5 ?? '--'} μg/m³`);
  setText('pm10', `${comp.pm10 ?? '--'} μg/m³`);
  setText('o2', '-- %');
  setText('co2', '-- ppm');

  const visibility = weatherData?.visibility
    ? `${(weatherData.visibility / 1000).toFixed(1)} km`
    : '-- km';
  setText('visibility', visibility);

  const sunriseUnix = weatherData?.sys?.sunrise;
  const sunrise = sunriseUnix
    ? new Date(sunriseUnix * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    : '--:--';
  setText('sunrise', sunrise);
}

function saveCurrentCityIfValid() {
  const currentName = el('cityname')?.innerText;
  if (!currentName || currentName === '--.--') return;

  const currentCity = {
    name: currentName,
    temp: el('temp')?.innerText || '',
    weather: el('weather')?.innerText || '',
    minmax: el('minmax')?.innerText || ''
  };

  const last = searchedCities[searchedCities.length - 1];
  if (!last || last.name !== currentCity.name) {
    searchedCities.push(currentCity);
    renderPreviousCities();
  }
}

function updateMainWeather(data) {
  setText('cityname', data.name || '--.--');
  setText('forecast-city', `City: ${data.name || '--'}`);
  setText('temp', `${data.main?.temp ?? 0} °C`);
  setText('weather', data.weather?.[0]?.main || '--.---');
  setText(
    'minmax',
    `Min: ${data.main?.temp_min ?? 0}°C / Max: ${data.main?.temp_max ?? 0}°C`
  );
  setText('humidity', `${data.main?.humidity ?? 0} %`);
  setText('wind', `${data.wind?.speed ?? 0} km/hr`);
  setText('pressure', `${data.main?.pressure ?? 0} hPa`);
  setText('feelslike', `${data.main?.feels_like ?? 0} °C`);
}

async function search() {
  const input = el('city-input')?.value.trim();
  if (!input) return;

  let weatherData;
  try {
    weatherData = await getWeatherData(input);
  } catch (e) {
    return;
  }

  const isValid =
    weatherData &&
    Number(weatherData.cod) === 200 &&
    weatherData.coord &&
    weatherData.main &&
    weatherData.weather?.[0];

  if (!isValid) return;

  saveCurrentCityIfValid();
  updateMainWeather(weatherData);

  try {
    const { lat, lon } = weatherData.coord;
    const airData = await getAirQualityData(lat, lon);
    updateForecastValues(airData, weatherData);
  } catch (e) {
    updateForecastValues(null, weatherData);
  }
}

window.onload = function () {
  showLanding();

  el('forecast-tab')?.addEventListener('click', showForecast);
  el('air-quality-tab')?.addEventListener('click', showWeather);
  el('forecast-back-btn')?.addEventListener('click', showWeather);
};
