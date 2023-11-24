package com.flightreservation.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Reservation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int bookingId;
	private String Departure;
	private String arrival;
	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	private Passenger passenger;
	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	private FlightDetails flight;

	public Reservation() {
	}

	public Reservation(int bookingId, String departure, String arrival, Passenger passenger, FlightDetails flight) {
		super();
		this.bookingId = bookingId;
		Departure = departure;
		this.arrival = arrival;
		this.passenger = passenger;
		this.flight = flight;
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

	public Passenger getPassenger() {
		return passenger;
	}

	public void setPassenger(Passenger passenger) {
		this.passenger = passenger;
	}

	public FlightDetails getFlight() {
		return flight;
	}

	public void setFlight(FlightDetails flight) {
		this.flight = flight;
	}

}
