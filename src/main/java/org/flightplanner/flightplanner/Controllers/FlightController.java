package org.flightplanner.flightplanner.Controllers;

import org.flightplanner.flightplanner.DataObjects.Flight;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin
public class FlightController {

    private final List<Flight> allFlights = List.of(
            new Flight("FL001", "Tallinn", "Riga", "17-03-2025", "08:00", 50),
            new Flight("FL002", "Riga", "London", "17-03-2025", "12:00", 100),
            new Flight("FL003", "London", "Berlin", "17-03-2025", "20:00", 75),
            new Flight("FL004", "Tallinn", "Riga", "18-03-2025", "08:00", 50)
    );

    @GetMapping
    public List<Flight> getFlights(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String time,
            @RequestParam(required = false) Integer maxPrice) {

        return allFlights.stream()
                .filter(flight -> (from == null || flight.getFrom().equalsIgnoreCase(from)))
                .filter(flight -> (to == null || flight.getTo().equalsIgnoreCase(to)))
                .filter(flight -> (date == null || flight.getDate().equals(date)))
                .filter(flight -> (time == null || flight.getTime().equals(time)))
                .filter(flight -> (maxPrice == null || flight.getPrice() <= maxPrice))
                .collect(Collectors.toList());
    }
}