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

                rowDiv.appendChild(seatBtn);
            });
        })
        .catch(error => console.error("Error loading seats:", error));
});

function bookSeat(flightNumber, seatNumber, seatBtn) {
    fetch(`/api/seats/${flightNumber}/book/${seatNumber}`, { method: "POST" })
        .then(response => response.text())
        .then(message => {
            alert(message);
            if (message === "Seat booked successfully!") {
                seatBtn.classList.add("booked");
                seatBtn.disabled = true;
            }
        })
        .catch(error => console.error("Error booking seat:", error));
}
