package org.flightplanner.flightplanner;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Controller
@RequestMapping("/api/seats")
public class SeatController {
    private final Map<String, Set<String>> flightSeats = new HashMap<>();
}
