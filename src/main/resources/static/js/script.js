document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/flights") // Fetch flight data from the backend
        .then(response => response.json())
        .then(flights => {
            const tableBody = document.querySelector("#flightsTable tbody");
            tableBody.innerHTML = ""; // Clear existing content

            flights.forEach(flight => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${flight.flightNumber}</td>
                    <td>${flight.from}</td>
                    <td>${flight.to}</td>
                    <td>${flight.date}</td>
                    <td>${flight.time}</td>
                    <td>$${flight.price}</td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching flights:", error));
});