// Ootame, kuni dokument on täielikult laaditud, ja seejärel käivitame funktsiooni loadAllFlights
document.addEventListener("DOMContentLoaded", loadAllFlights);

// Funktsioon, mis laeb kõik lennud
function loadAllFlights() {
    fetch("/api/flights")
        .then(response => response.json())
        .then(displayFlights)
        .catch(error => console.error("Error fetching flights:", error));
}

// Funktsioon filtrite rakendamiseks ja lennuandmete filtreerimiseks
function applyFilters() {
    // Saame filtrite väärtused HTML-i sisenditest
    let departure = document.getElementById("filterDeparture").value;
    let destination = document.getElementById("filterDestination").value;
    let date = document.getElementById("filterDate").value;
    let time = document.getElementById("filterTime").value;
    let price = document.getElementById("filterPrice").value;

    // Loome URL-i, kuhu lisame kõik valitud filtrid
    let url = "/api/flights?";
    if (departure) url += `from=${departure}&`
    if (destination) url += `to=${destination}&`;
    if (date) url += `date=${date}&`;
    if (time) url += `time=${time}&`;
    if (price) url += `maxPrice=${price}&`;

    // Teeme API päringu, et saada filtreeritud lennud
    fetch(url)
        .then(response => response.json())
        .then(displayFlights)
        .catch(error => console.error("Error fetching filtered flights:", error));
}

// Funktsioon, mis lähtestab kõik filtrid ja laeb kõik lennud uuesti
function resetFilters() {
    // Lähtestame kõik sisendid nende vaikimisi väärtustele
    document.getElementById("filterDeparture").value = "";
    document.getElementById("filterDestination").value = "";
    document.getElementById("filterDate").value = "";
    document.getElementById("filterTime").value = "";
    document.getElementById("filterPrice").value = "";

    // Laeme kõik lennud ilma filtriteta uuesti
    loadAllFlights();
}

// Funktsioon, mis kuvab kõik lennud HTML tabelis
function displayFlights(flights) {
    const tableBody = document.querySelector("#flightsTable tbody");
    tableBody.innerHTML = "";

    // Läbime kõik lennud ja loome igaühe jaoks tabeli rea
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

        // Kui rida klikitakse, suunatakse kasutaja lennu valiku lehele
        row.addEventListener("click", () => {
            window.location.href = `/seating.html?flight=${flight.flightNumber}`;
        });

        row.style.cursor = "pointer";
        row.onmouseover = () => row.style.backgroundColor = "#f0f0f0";
        row.onmouseout = () => row.style.backgroundColor = "";

        tableBody.appendChild(row);
    });
}
