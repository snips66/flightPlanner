package org.flightplanner.flightplanner.DataObjects;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Seat {
    private String seatNumber;
    private boolean isBooked;

    public Seat(String seatNumber, boolean isBooked) {
        this.seatNumber = seatNumber;
        this.isBooked = isBooked;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    @JsonProperty("isBooked")
    public boolean isBooked() {
        return isBooked;
    }

    public void setBooked(boolean booked) {
        isBooked = booked;
    }
}
