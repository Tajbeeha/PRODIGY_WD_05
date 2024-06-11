// script.js

const apiKey = '3559418c9ad62c548100bf96cd62ea9c'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const locationInput = document.getElementById('location-input');
    const location = locationInput.value;
    const weatherInfo = document.getElementById('weather-info');
    const errorMessage = document.getElementById('error-message');
    
    weatherInfo.innerHTML = ''; // Clear previous weather info
    errorMessage.innerHTML = ''; 
    if (!location) {
        errorMessage.innerHTML = 'Please enter a location';
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        displayWeather(data);
    } catch (error) {
        errorMessage.innerHTML = 'Location not found';
    } finally {
        locationInput.value = ''; // Clear input field
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${weatherIcon}" alt="Weather Icon" class="weather-icon">
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
