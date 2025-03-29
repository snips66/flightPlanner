package org.flightplanner.flightplanner.Controllers;

import org.flightplanner.flightplanner.DataObjects.Seat;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/seats")
public class SeatController {

    // Lennuistmete salvestamiseks kasutatakse Map-i, kus key on lennu number ja value on istmete nimekiri
    private final Map<String, List<Seat>> flightSeats = new HashMap<>();

    // Juhuslike väärtuste genereerimiseks kasutame Random klassi
    private final Random random = new Random();

    // Meetod, mis genereerib 120 istet iga lennu jaoks
    private List<Seat> generateSeats() {
        List<Seat> seats = new ArrayList<>();
        int totalSeats = 120;

        // Loome 120 istet (A kuni F, rida 1 kuni 20)
        for (int i = 1; i <= totalSeats; i++) {
            char seatLetter = (char) ('A' + ((i - 1) % 6));
            int rowNumber = (i - 1) / 6 + 1;

            String seatNumber = seatLetter + String.valueOf(rowNumber);
            boolean isBooked = random.nextBoolean();

            // Kui iste on broneeritud, lisame selle broneeritud olekuga istme nimekirja
            if(isBooked) {
                seats.add(new Seat("", true, false, false, false));
            }

            // Kui iste on A või F, siis lisame selle akna all omadusega
            else if (seatLetter == ('A') ||seatLetter == ('F'))
                seats.add(new Seat(seatNumber, false, true, false, false));

            // Kui iste on real 8 või 18, lisame selle rohkema jalaruumi omadusega
            else if (rowNumber == 8 || rowNumber == 18)
                seats.add(new Seat(seatNumber, false, false, true, false));

            // Kui iste on real 1 või 10, lisame selle lähedal väljapääsule omadusega
            else if (rowNumber == 1 ||rowNumber == 10)
                seats.add(new Seat(seatNumber, false, false, false, true));

            // Muul juhul on tegemist tavalise istekohaga
            else
                seats.add(new Seat(seatNumber, false, false, false, false));
        }
        return seats;
    }

    @GetMapping("/{flightNumber}")
    public List<Seat> getSeats(@PathVariable String flightNumber) {
        // Kui selle lennu kohta pole veel istmeid loodud, genereeritakse need
        flightSeats.putIfAbsent(flightNumber, generateSeats());
        return flightSeats.get(flightNumber);
    }

    @PostMapping("/{flightNumber}/book/{seatNumber}")
    public String bookSeat(@PathVariable String flightNumber, @PathVariable String seatNumber) {

        // Saame vastava lennu istmed või genereerime need, kui neid veel pole
        List<Seat> seats = flightSeats.getOrDefault(flightNumber, generateSeats());

        // Otsime istet, mille number vastab seatNumber-le
        for (Seat seat : seats) {
            if (seat.getSeatNumber().equals(seatNumber)) {
                // Kui iste on juba broneeritud, tagastame vastava sõnumi
                if (seat.isBooked()) {
                    return "Seat already booked!";
                }
                // Kui iste pole veel broneeritud, broneerime selle
                seat.setBooked(true);
                seat.setSeatNumber("");
                return "Seat " + seat.getSeatNumber() + " booked successfully!";
            }
        }
        return "Seat not found!";
    }
}