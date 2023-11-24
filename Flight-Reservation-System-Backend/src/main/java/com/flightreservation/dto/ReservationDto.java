package com.flightreservation.dto;

public class ReservationDto {

	private int bookingId;
	private String Departure;
	private String arrival;
	private PassengerDto passenger;
	private String flightNumber;
	
	public ReservationDto() {
	
	}
	
	public ReservationDto(int bookingId, String departure, String arrival, PassengerDto passenger,
			String flightNumber) {
		super();
		this.bookingId = bookingId;
		Departure = departure;
		this.arrival = arrival;
		this.passenger = passenger;
		this.flightNumber = flightNumber;
	}

	public int getBookingId() {
		return bookingId;
	}

	public void setBookingId(int bookingId) {
		this.bookingId = bookingId;
	}

	public String getDeparture() {
		return Departure;
	}

	public void setDeparture(String departure) {
		Departure = departure;
	}

	public String getArrival() {
		return arrival;
	}

	public void setArrival(String arrival) {
		this.arrival = arrival;
	}

	public PassengerDto getPassenger() {
		return passenger;
	}

	public void setPassenger(PassengerDto passenger) {
		this.passenger = passenger;
	}

	public String getFlightNumber() {
		return flightNumber;
	}

	public void setFlightNumber(String flightNumber) {
		this.flightNumber = flightNumber;
	}

}
