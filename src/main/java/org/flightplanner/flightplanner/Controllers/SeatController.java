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
            String seatNumber = (char) ('A' + ((i - 1) % 6)) + String.valueOf((i - 1) / 6 + 1);
            boolean isBooked = random.nextBoolean();
            seats.add(new Seat(seatNumber, isBooked));
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
                return "Seat booked successfully!";
            }
        }
        return "Seat not found!";
    }
}