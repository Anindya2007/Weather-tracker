// const cityname = document.getElementById('cityname').value;




function cityname() {
  const cityname = document.getElementById('cityname').value;
  const name = cityname.trim();
  cityname.value = '';
  return name;
}

// For fetcing the data frotm the API
async function apidata(name = cityname()) {
  const apikey = '84224d66cece4298f15d44287a08afed';
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apikey}`;
  const res = await fetch(api);
  const data = await res.json();
  return data;
}

//For using the data in the UI

function getweather() {

  const dummyWeatherData = {
    "name": "Mumbai",
    "main": {
      "temp": 30.5,
      "feels_like": 33.2,
      "humidity": 70
    },
    "weather": [
      {
        "main": "Clouds",
        "description": "scattered clouds",
        "icon": "03d"
      }
    ],
    "wind": {
      "speed": 4.5
    }
  };
  let city = document.getElementById('city');
  city.innerText = dummyWeatherData.name;
  let temperature = document.getElementById('temperature');
  temperature.innerText = `${dummyWeatherData.main.temp}°C`;
}
