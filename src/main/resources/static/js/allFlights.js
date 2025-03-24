document.addEventListener("DOMContentLoaded", loadAllFlights);

function loadAllFlights() {
    fetch("/api/flights")
        .then(response => response.json())
        .then(displayFlights)
        .catch(error => console.error("Error fetching flights:", error));
}

function applyFilters() {
    let departure = document.getElementById("filterDeparture").value;
    let destination = document.getElementById("filterDestination").value;
    let date = document.getElementById("filterDate").value;
    let time = document.getElementById("filterTime").value;
    let price = document.getElementById("filterPrice").value;

    let url = "/api/flights?";
    if (departure) url += `from=${departure}&`
    if (destination) url += `to=${destination}&`;
    if (date) url += `date=${date}&`;
    if (time) url += `time=${time}&`;
    if (price) url += `maxPrice=${price}&`;

    fetch(url)
        .then(response => response.json())
        .then(displayFlights)
        .catch(error => console.error("Error fetching filtered flights:", error));
}

function resetFilters() {
    document.getElementById("filterDeparture").value = "";
    document.getElementById("filterDestination").value = "";
    document.getElementById("filterDate").value = "";
    document.getElementById("filterTime").value = "";
    document.getElementById("filterPrice").value = "";

    loadAllFlights();
}

function displayFlights(flights) {
    const tableBody = document.querySelector("#flightsTable tbody");
    tableBody.innerHTML = "";

    flights.forEach(flight => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${flight.flightNumber}</td>
            <td>${flight.from}</td>
            <td>${flight.to}</td>
            <td>${flight.date}</td>
            <td>${flight.time}</td>
            <td>${flight.price} €</td>
        `;

        row.addEventListener("click", () => {
            window.location.href = `/seating.html?flight=${flight.flightNumber}`;
        });

        row.style.cursor = "pointer";
        row.onmouseover = () => row.style.backgroundColor = "#f0f0f0";
        row.onmouseout = () => row.style.backgroundColor = "";

        tableBody.appendChild(row);
    });
}
