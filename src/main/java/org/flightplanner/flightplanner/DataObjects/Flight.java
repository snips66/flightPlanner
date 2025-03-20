package org.flightplanner.flightplanner.DataObjects;

public class Flight {
    private String flightNumber;
    private String from;
    private String to;
    private String date;
    private String time;
    private double price;

    public Flight(String flightNumber, String from, String to, String date, String time, double price) {
        this.flightNumber = flightNumber;
        this.from = from;
        this.to = to;
        this.date = date;
        this.time = time;
        this.price = price;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public String getFrom() {
        return from;
    }

    public String getTo() {
        return to;
    }

    public String getDate() {
        return date;
    }

    public String getTime() {
        return time;
    }

    public double getPrice() {
        return price;
    }
}
