// 1. CLASS & OBJECTS
class WeatherReport {
    constructor(city, temp, condition) {
        this.city = city;
        this.temp = temp;
        this.condition = condition;
    }
}

// 2. VARIABLES
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

// 3. FUNCTIONS & EVENTS
searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value;

    // 4. CONDITIONALS
    if (cityName === "") {
        alert("Please enter a city!");
        return;
    }

    generateWeather(cityName);
});

function generateWeather(city) {
    // 5. OPERATORS (Math for a random temperature)
    let randomTemp = Math.floor(Math.random() * 35) + 5;
    let todayWeather = new WeatherReport(city, randomTemp, "Partly Cloudy");

    // Displaying main weather
    document.getElementById('mainWeather').innerHTML = `
        <h1>${todayWeather.city}</h1>
        <h2>${todayWeather.temp}°C</h2>
        <p>${todayWeather.condition}</p>
    `;

    // 6. LOOPS (Generating 7-day forecast)
    const grid = document.getElementById('forecastGrid');
    grid.innerHTML = ""; // Clear old data

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    for (let i = 0; i < days.length; i++) {
        let dailyTemp = randomTemp - i; // Using operators

        let card = document.createElement('div');
        card.className = "forecast-card";
        card.innerHTML = `
            <h4>${days[i]}</h4>
            <p>${dailyTemp}°C</p>
        `;
        grid.appendChild(card);
    }
}
