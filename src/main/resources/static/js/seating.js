document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const flightNumber = params.get("flight");

    document.getElementById("flightInfo").innerText = `Flight: ${flightNumber}`;

    fetch(`/api/seats/${flightNumber}`)
        .then(response => response.json())
        .then(seats => {
            const seatingContainer = document.getElementById("seating");
            let rowDiv;

            seats.forEach((seat, index) => {
                console.log(seat)
                if (index % 6 === 0) {
                    rowDiv = document.createElement("div");
                    rowDiv.classList.add("seat-row");
                    seatingContainer.appendChild(rowDiv);
                }

                if (index % 6 === 3) {
                    const aisle = document.createElement("div");
                    aisle.classList.add("aisle");
                    rowDiv.appendChild(aisle);
                }

                const seatBtn = document.createElement("button");
                seatBtn.classList.add("seat");
                seatBtn.innerText = seat.seatNumber;

                console.log(seat.isBooked)
                if (seat.isBooked) {
                    seatBtn.disabled = true;
                    seatBtn.classList.add("booked");
                } else {
                    if (seat.isWindow) seatBtn.classList.add("window");
                    else if (seat.isHasExtraLegroom) seatBtn.classList.add("hasExtraLegroom");
                    else if (seat.isExitRow) seatBtn.classList.add("exitRow");
                    seatBtn.onclick = () => bookSeat(flightNumber, seat.seatNumber, seatBtn);
                }

                seatBtn.addEventListener("click", function () {
                   toggleSeatSelection(seatBtn);
                });

                rowDiv.appendChild(seatBtn);
            });
        })
        .catch(error => console.error("Error loading seats:", error));
});

function toggleSeatSelection(seat) {
    if (!seat.classList.contains("booked")) {
        seat.classList.toggle("suggested");
        document.getElementById("bookButton").style.display = "inline-block";
    }
}

function applyFilters() {
    let numTickets = parseInt(document.getElementById("filterNumberOfTickets").value, 10);
    if (isNaN(numTickets) || numTickets <= 0) {
        alert("Please select at least one ticket.");
        return;
    }

    let selectedFilter = document.querySelector("input[name='seatFilter']:checked")?.value;
    let allSeats = document.querySelectorAll(".seat");
    let availableSeats = [...allSeats].filter(seat => !seat.classList.contains("booked"));

    if (selectedFilter) {
        availableSeats = availableSeats.filter(seat => seat.classList.contains(selectedFilter));
    }

    if (availableSeats.length < numTickets) {
        alert("Not enough seats available with the selected criteria.");
        return;
    }

    document.querySelectorAll(".seat.suggested").forEach(seat => seat.classList.remove("suggested"));

    let selectedSeats = availableSeats.slice(0, numTickets);
    selectedSeats.forEach(seat => seat.classList.add("suggested"));

    document.getElementById("bookButton").style.display = "inline-block";
}

function resetFilters() {
    document.getElementById("filterNumberOfTickets").value = 1;
    document.querySelectorAll("input[name='seatFilter']").forEach(radio => radio.checked = false);

    document.querySelectorAll(".seat.suggested").forEach(seat => seat.classList.remove("suggested"));

    document.getElementById("bookButton").style.display = "none";
}

function bookSelectedSeats() {
    let selectedSeats = document.querySelectorAll(".seat.suggested");
    if (selectedSeats.length === 0) {
        alert("No seats selected!");
        return;
    }

    let flightNumber = new URLSearchParams(window.location.search).get("flight");
    let bookingPromises = [...selectedSeats].map(seat => {
        let seatNumber = seat.innerText;
        return fetch(`/api/seats/${flightNumber}/book/${seatNumber}`, { method: "POST" })
            .then(response => response.text())
            .then(message => {
                if (message === "Seat booked successfully!") {
                    seat.classList.add("booked");
                    seat.disabled = true;
                    seat.innerText = "";  // Set seat number to empty string as requested
                }
            })
            .catch(error => console.error("Error booking seat:", error));
    });

    Promise.all(bookingPromises).then(() => {
        alert("Seats booked successfully! Redirecting to flight selection...");
        window.location.href = "/allFlights.html"; // Redirect back to flight list
    });

}
