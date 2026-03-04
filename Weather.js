// For fetcing the data frotm the API

async function apidata(cityname) {
  const apikey = '0441e7dcc94ee6ddd6a68df3843ca1e6';
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=metric`;
  const res = await fetch(api);
  const data = await res.json();
  return data;
}


//For using the data in the UI
const button = document.getElementById('search-btn');

button.addEventListener('click',async () => {

  const cityname = document.getElementById('cityname').value.trim();

    if (!cityname){
      alert('Please enter a city name!')
      return
    }

  let display = document.getElementById('city');
  let temperature = document.getElementById('temperature');
  let high = document.getElementById('high_text');
  let low = document.getElementById('low_text');
  let feels = document.getElementById('feels_like');
  let wind = document.getElementById('wind-speed');
  let pressure = document.getElementById('Pressure');
  let humidity = document.getElementById('Humidity');

  const data = await apidata(cityname);

  display.innerText = cityname;
  temperature.innerText = `${data.main.temp.toFixed(1)}°C`;
  high.innerText = `High: ${data.main.temp_max.toFixed(1)}°C`;
  low.innerText = `Low: ${data.main.temp_min.toFixed(1)}°C`;
  feels.textContent = `${data.main.feels_like.toFixed(1)}`;
  wind.textContent = `${data.wind.speed}`;
  pressure.textContent = `${data.main.pressure}`;
  humidity.textContent = `${data.main.humidity}`;

})

