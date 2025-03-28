package org.flightplanner.flightplanner.DataObjects;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Seat {
    private String seatNumber;
    private boolean isBooked;
    private boolean isWindow;
    private boolean hasExtraLegroom;
    private boolean isExitRow;

    public Seat(String seatNumber, boolean isBooked, boolean isWindow, boolean hasExtraLegroom, boolean isExitRow) {
        this.seatNumber = seatNumber;
        this.isBooked = isBooked;
        this.isWindow = isWindow;
        this.hasExtraLegroom = hasExtraLegroom;
        this.isExitRow = isExitRow;
    }

    @JsonProperty("isWindow")
    public boolean isWindow() {
        return isWindow;
    }

    @JsonProperty("isHasExtraLegroom")
    public boolean isHasExtraLegroom() {
        return hasExtraLegroom;
    }

    @JsonProperty("isExitRow")
    public boolean isExitRow() {
        return isExitRow;
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
