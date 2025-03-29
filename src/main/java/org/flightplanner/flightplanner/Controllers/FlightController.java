package org.flightplanner.flightplanner.Controllers;

import org.flightplanner.flightplanner.DataObjects.Flight;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin
public class FlightController {

    // Ajapuuduse tõttu on andmed lendude kohta hoitud listis
    // Andmed lendude kohta genereerisin AI-d kasutades
    private final List<Flight> allFlights = List.of(
            new Flight("FL001", "Tallinn", "Riga", "17-03-2025", "08:00", 50),
            new Flight("FL002", "Riga", "London", "17-03-2025", "12:00", 100),
            new Flight("FL003", "London", "Berlin", "17-03-2025", "20:00", 75),
            new Flight("FL004", "Tallinn", "Riga", "18-03-2025", "08:00", 50),
            new Flight("FL005", "Berlin", "Paris", "18-03-2025", "10:30", 90),
            new Flight("FL006", "Paris", "Madrid", "18-03-2025", "15:45", 120),
            new Flight("FL007", "Madrid", "Rome", "19-03-2025", "09:15", 110),
            new Flight("FL008", "Rome", "Vienna", "19-03-2025", "14:30", 85),
            new Flight("FL009", "Vienna", "Stockholm", "20-03-2025", "07:50", 95),
            new Flight("FL010", "Stockholm", "Helsinki", "20-03-2025", "13:20", 70),
            new Flight("FL011", "Helsinki", "Tallinn", "21-03-2025", "18:10", 55),
            new Flight("FL012", "Tallinn", "Copenhagen", "21-03-2025", "20:00", 80),
            new Flight("FL013", "Copenhagen", "Amsterdam", "22-03-2025", "11:45", 100),
            new Flight("FL014", "Amsterdam", "Brussels", "22-03-2025", "16:30", 60)
    );

    @GetMapping
    public List<Flight> getFlights(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String time,
            @RequestParam(required = false) Integer maxPrice) {

        // Stream abil filtreeritakse kõik lennud vastavalt määratud parameetritele
        return allFlights.stream()
                .filter(flight -> (from == null || flight.getFrom().equalsIgnoreCase(from)))
                .filter(flight -> (to == null || flight.getTo().equalsIgnoreCase(to)))
                .filter(flight -> (date == null || flight.getDate().equals(date)))
                .filter(flight -> (time == null || flight.getTime().equals(time)))
                .filter(flight -> (maxPrice == null || flight.getPrice() <= maxPrice))
                .collect(Collectors.toList());
    }
}