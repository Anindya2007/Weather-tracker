// For fetcing the data frotm the API

async function apidata(cityname) {
  const apikey = '0441e7dcc94ee6ddd6a68df3843ca1e6';
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=metric`;
  const res = await fetch(api);
  const data = await res.json();
  console.log(data);
  return data;
}


async function search(){
    let input = document.getElementById('city-input').value;
    let cityname= document.getElementById('cityname');
    let temp=document.getElementById('temp');
    let weather=document.getElementById('weather');
    let minmax=document.getElementById('minmax');
    let humidity=document.getElementById('humidity');
    let wind=document.getElementById('wind');
    let pressure=document.getElementById('pressure');
    let feelslike=document.getElementById('feelslike');

    let data = await apidata(input);

    cityname.innerText=data.name;
    temp.innerText=data.main.temp + ' °C';
    weather.innerText=data.weather[0].main;
    minmax.innerText=data.main.temp_min + ' / ' + data.main.temp_max;
    humidity.innerText=data.main.humidity + ' %';
    wind.innerText=data.wind.speed + ' km/hr';
    pressure.innerText=data.main.pressure + ' hPa';
    feelslike.innerText=data.main.feels_like + ' °C';
}
