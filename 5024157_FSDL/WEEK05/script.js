// 1. CLASS (Blueprint for a Trip)
class Trip {
    constructor(cityName) {
        this.cityName = cityName.trim().toUpperCase(); // STRING MANIPULATION
        this.dateAdded = new Date().toLocaleDateString(); // DATE
        this.id = Math.floor(Math.random() * 1000); // OPERATOR
    }
}

// 2. ARRAYS (Store our trips)
let myTrips = [];

// 3. SELECTORS & EVENTS
const addBtn = document.getElementById('addBtn');
const cityInput = document.getElementById('cityInput');
const errorDisplay = document.getElementById('errorMessage');

// Update Header Date on Load
document.getElementById('today').innerText = `Planner: ${new Date().toDateString()}`;

addBtn.addEventListener('click', () => {
    const value = cityInput.value;

    // 4. ERROR HANDLING & VALIDATION
    try {
        if (value === "") throw "City name cannot be empty!";
        if (value.length < 3) throw "That city name is too short!";
        if (!isNaN(value)) throw "Numbers are not valid city names!";

        // If valid, create new OBJECT from CLASS
        const newTrip = new Trip(value);
        myTrips.push(newTrip); // ARRAY method

        renderTrips();
        cityInput.value = ""; // Clear input
        errorDisplay.innerText = ""; // Clear error

    } catch (err) {
        errorDisplay.innerText = "⚠️ " + err;
    }
});

// 5. LOOPS (Displaying the items)
function renderTrips() {
    const list = document.getElementById('tripList');
    list.innerHTML = "";

    myTrips.forEach(trip => {
        const card = document.createElement('div');
        card.className = 'trip-card';
        card.innerHTML = `
            <div>
                <strong>${trip.cityName}</strong><br>
                <small>Planned on: ${trip.dateAdded}</small>
            </div>
            <div style="color: #2a5298">#${trip.id}</div>
        `;
        list.appendChild(card);
    });
}
