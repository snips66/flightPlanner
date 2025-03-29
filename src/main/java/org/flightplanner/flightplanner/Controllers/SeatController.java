package org.flightplanner.flightplanner.Controllers;

import org.flightplanner.flightplanner.DataObjects.Seat;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/seats")
public class SeatController {
    private final Map<String, List<Seat>> flightSeats = new HashMap<>();
    private final Random random = new Random();
    private List<Seat> generateSeats() {
        List<Seat> seats = new ArrayList<>();
        int totalSeats = 120;

        for (int i = 1; i <= totalSeats; i++) {
            char seatLetter = (char) ('A' + ((i - 1) % 6)); // A to F
            int rowNumber = (i - 1) / 6 + 1; // Row number (1 to 20)

            String seatNumber = seatLetter + String.valueOf(rowNumber);
            boolean isBooked = random.nextBoolean();
            if(isBooked) {
                seats.add(new Seat("", true, false, false, false));
            }
            else if (seatLetter == ('A') ||seatLetter == ('F')) seats.add(new Seat(seatNumber, false, true, false, false));
            else if (rowNumber == 8 || rowNumber == 18) seats.add(new Seat(seatNumber, false, false, true, false));
            else if (rowNumber == 1 ||rowNumber == 10) seats.add(new Seat(seatNumber, false, false, false, true));
            else seats.add(new Seat(seatNumber, false, false, false, false));
        }
        return seats;
    }
    @GetMapping("/{flightNumber}")
    public List<Seat> getSeats(@PathVariable String flightNumber) {
        flightSeats.putIfAbsent(flightNumber, generateSeats());
        return flightSeats.get(flightNumber);
    }
    @PostMapping("/{flightNumber}/book/{seatNumber}")
    public String bookSeat(@PathVariable String flightNumber, @PathVariable String seatNumber) {
        List<Seat> seats = flightSeats.getOrDefault(flightNumber, generateSeats());

        for (Seat seat : seats) {
            if (seat.getSeatNumber().equals(seatNumber)) {
                if (seat.isBooked()) {
                    return "Seat already booked!";
                }
                seat.setBooked(true);
                seat.setSeatNumber("");
                return "Seat " + seat.getSeatNumber() + " booked successfully!";
            }
        }
        return "Seat not found!";
    }
}