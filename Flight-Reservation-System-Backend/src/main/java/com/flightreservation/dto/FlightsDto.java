package com.flightreservation.dto;

import java.util.List;

public class FlightsDto {

	private String flightNumber;
	private String departure;
	private String arrival;
	private String departureDate;
	private String departureTime;
	private String arrivalDate;
	private String arrivalTime;
	private int seatAvailability;
	private List<SeatDto> seats;

	public FlightsDto() {
	}

	public FlightsDto(String flightNumber, String departure, String arrival, String departureDate, String departureTime,
			String arrivalDate, String arrivalTime, int seatAvailability, List<SeatDto> seats) {
		super();
		this.flightNumber = flightNumber;
		this.departure = departure;
		this.arrival = arrival;
		this.departureDate = departureDate;
		this.departureTime = departureTime;
		this.arrivalDate = arrivalDate;
		this.arrivalTime = arrivalTime;
		this.seatAvailability = seatAvailability;
		this.seats = seats;
	}

	public String getFlightNumber() {
		return flightNumber;
	}

	public void setFlightNumber(String flightNumber) {
		this.flightNumber = flightNumber;
	}

	public String getDeparture() {
		return departure;
	}

	public void setDeparture(String departure) {
		this.departure = departure;
	}

	public String getArrival() {
		return arrival;
	}

	public void setArrival(String arrival) {
		this.arrival = arrival;
	}

	public String getDepartureDate() {
		return departureDate;
	}

	public void setDepartureDate(String departureDate) {
		this.departureDate = departureDate;
	}

	public String getDepartureTime() {
		return departureTime;
	}

	public void setDepartureTime(String departureTime) {
		this.departureTime = departureTime;
	}

	public String getArrivalDate() {
		return arrivalDate;
	}

	public void setArrivalDate(String arrivalDate) {
		this.arrivalDate = arrivalDate;
	}

	public String getArrivalTime() {
		return arrivalTime;
	}

	public void setArrivalTime(String arrivalTime) {
		this.arrivalTime = arrivalTime;
	}

	public int getSeatAvailability() {
		return seatAvailability;
	}

	public void setSeatAvailability(int seatAvailability) {
		this.seatAvailability = seatAvailability;
	}

	public List<SeatDto> getSeats() {
		return seats;
	}

	public void setSeats(List<SeatDto> seats) {
		this.seats = seats;
	}

}
