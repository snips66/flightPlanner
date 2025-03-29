// Ootame, kuni dokument on täielikult laetud ja seejärel käivitame funktsiooni
document.addEventListener("DOMContentLoaded", function () {
    // Loeme URL-i päringu parameetrit, et saada lennu number
    const params = new URLSearchParams(window.location.search);
    const flightNumber = params.get("flight");

    document.getElementById("flightInfo").innerText = `Flight: ${flightNumber}`;

    // Teeme API päringu, et saada istmete andmed lennu kohta
    fetch(`/api/seats/${flightNumber}`)
        .then(response => response.json())
        .then(seats => {
            const seatingContainer = document.getElementById("seating");
            let rowDiv;

            // Läbime kõik istmed ja loome igaühe jaoks nupu
            seats.forEach((seat, index) => {
                if (index % 6 === 0) {
                    // Iga 6. istme järel loome uue rida
                    rowDiv = document.createElement("div");
                    rowDiv.classList.add("seat-row");
                    seatingContainer.appendChild(rowDiv);
                }

                if (index % 6 === 3) {
                    // Loome vahekäigu elemendi iga rea kolmanda istme juurde
                    const aisle = document.createElement("div");
                    aisle.classList.add("aisle");
                    rowDiv.appendChild(aisle);
                }

                // Loome nupu igale istmele
                const seatBtn = document.createElement("button");
                seatBtn.classList.add("seat");
                seatBtn.innerText = seat.seatNumber;

                if (seat.isBooked) {
                    // Kui iste on broneeritud, siis deaktiveerime nupu ja lisame 'booked' klassi
                    seatBtn.disabled = true;
                    seatBtn.classList.add("booked");
                } else {
                    // Muul juhul lisame istme vastava omadusega klassi
                    if (seat.isWindow) seatBtn.classList.add("window");
                    else if (seat.isHasExtraLegroom) seatBtn.classList.add("hasExtraLegroom");
                    else if (seat.isExitRow) seatBtn.classList.add("exitRow");
                }

                // Lisame kuulaja, et muuta valitud iste 'valituks'
                seatBtn.addEventListener("click", function () {
                   toggleSeatSelection(seatBtn);
                });

                rowDiv.appendChild(seatBtn);
            });
        })
        .catch(error => console.error("Error loading seats:", error));
});

// Funktsioon, mis muudab istme valiku olekut 'valituks' või tühistab valiku
function toggleSeatSelection(seat) {
    if (!seat.classList.contains("booked")) {
        seat.classList.toggle("suggested");
        document.getElementById("bookButton").style.display = "inline-block";
    }
}

// Funktsioon filtrite rakendamiseks
function applyFilters() {
    let numTickets = parseInt(document.getElementById("filterNumberOfTickets").value, 10);
    if (isNaN(numTickets) || numTickets <= 0) {
        alert("Please select at least one ticket."); // Kui ei ole valitud kehtivat piletite arvu, anname veateate
        return;
    }

    // Loeme valitud filtri väärtuse
    let selectedFilter = document.querySelector("input[name='seatFilter']:checked")?.value;
    let allSeats = document.querySelectorAll(".seat");
    let availableSeats = [...allSeats].filter(seat => !seat.classList.contains("booked"));

    if (selectedFilter) {
        // Kui filter on valitud, rakendame selle
        availableSeats = availableSeats.filter(seat => seat.classList.contains(selectedFilter));
    }

    if (availableSeats.length < numTickets) {
        alert("Not enough seats available with the selected criteria."); // Kui ei ole piisavalt vabu istekohti, kuvame veateate
        return;
    }

    // Eemaldame kõik varasemad "soovitatud" istmed
    document.querySelectorAll(".seat.suggested").forEach(seat => seat.classList.remove("suggested"));

    // Valime esimesed 'numTickets' vaba istekohta ja määrame need "soovitatuks"
    let selectedSeats = availableSeats.slice(0, numTickets);
    selectedSeats.forEach(seat => seat.classList.add("suggested"));

    // Kuvame broneerimisnupu
    document.getElementById("bookButton").style.display = "inline-block";
}

// Funktsioon filtrite lähtestamiseks
function resetFilters() {
    document.getElementById("filterNumberOfTickets").value = 1;
    document.querySelectorAll("input[name='seatFilter']").forEach(radio => radio.checked = false);

    document.querySelectorAll(".seat.suggested").forEach(seat => seat.classList.remove("suggested"));

    document.getElementById("bookButton").style.display = "none";
}

// Funktsioon valitud istekohtade broneerimiseks
function bookSelectedSeats() {
    let selectedSeats = document.querySelectorAll(".seat.suggested");
    if (selectedSeats.length === 0) {
        alert("No seats selected!"); // Kui ei ole ühtegi istet valitud, kuvame veateate
        return;
    }

    let flightNumber = new URLSearchParams(window.location.search).get("flight");
    let bookingPromises = [...selectedSeats].map(seat => {
        let seatNumber = seat.innerText;
        // Broneerime iga valitud istme
        return fetch(`/api/seats/${flightNumber}/book/${seatNumber}`, { method: "POST" })
            .then(response => response.text())
            .then(message => {
                if (message === "Seat booked successfully!") {
                    seat.classList.add("booked");
                    seat.disabled = true;
                    seat.innerText = "";
                }
            })
            .catch(error => console.error("Error booking seat:", error));
    });

    // Ootame kõiki broneerimisi ja suuname kasutaja tagasi lennu valiku lehele
    Promise.all(bookingPromises).then(() => {
        alert("Seats booked successfully! Redirecting to flight selection...");
        window.location.href = "/allFlights.html";
    });

}
