# 🌦️ Weather Tracker App

A simple and interactive **Weather Tracker Web App** that allows users to search for a city and view real-time weather details.

---

## 🚀 Features

* 🔍 Search weather by **city name**
* 🌡️ Displays **current temperature**
* 🌥️ Shows **weather condition** (Cloudy, Sunny, etc.)
* 💧 Displays **humidity**
* 🌬️ Shows **wind velocity**
* 🌡️ Displays **feels like / apparent temperature**
* 📊 Shows **atmospheric pressure**

---

## 🛠️ Tech Stack

* **HTML** – Structure
* **CSS** – Styling
* **JavaScript** – Logic & API handling
* **Weather API** – For fetching real-time data

---

## 📂 Project Structure

```
weather-tracker/
│── index.html
│── style.css
│── script.js
│── README.md
```

---

## 🔧 How It Works

1. User enters the **city name**
2. Application sends a request to the **weather API**
3. API returns weather data in JSON format
4. JavaScript extracts required details
5. UI updates dynamically with:

   * Temperature
   * Weather condition
   * Humidity
   * Wind speed
   * Pressure
   * Apparent temperature

---

## 🔑 API Setup

1. Get a free API key from a weather provider (e.g., OpenWeatherMap)
2. Replace the API key in your JavaScript file:

   ```javascript
   const apiKey = "YOUR_API_KEY";
   ```

---

## 🎯 Future Improvements

* 📍 Auto-detect user location
* 📊 5-day weather forecast
* 🌙 Dark mode
* 🔎 Search suggestions
* 📱 Better responsiveness

---

⭐ If you found this project helpful, consider giving it a star!
