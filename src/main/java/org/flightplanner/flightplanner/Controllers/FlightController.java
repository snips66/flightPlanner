package org.flightplanner.flightplanner.Controllers;

import org.flightplanner.flightplanner.DataObjects.Flight;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/flights")
public class FlightController {
    @GetMapping
    public List<Flight> getAllFlights() {
        return Arrays.asList(
                new Flight("FL001", "Tallinn", "Riga", "17-03-2025", "08:00", 50),
                new Flight("FL002", "Riga", "London", "17-03-2025", "12:00", 100),
                new Flight("FL003", "London", "Berlin", "17-03-2025", "20:00", 75)
        );
    }
}
