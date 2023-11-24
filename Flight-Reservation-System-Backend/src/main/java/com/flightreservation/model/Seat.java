package com.flightreservation.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.ManyToOne;

@Entity
@IdClass(CompositeKey.class)
public class Seat {
	@Id
	private String seatNumber;
	private String seatClass;
	private int price;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@Id
	@JsonIgnore
	private FlightDetails flight;

	@ManyToOne
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
	@JsonIdentityReference(alwaysAsId = true)
	private Passenger passenger;

	// 1 = true and 0 = false
	@Column(columnDefinition = "TINYINT(1)")
	private boolean booked;

	public Seat() {
	}

	public Seat(String seatNumber, String seatClass, int price, FlightDetails flight, Passenger passenger,
			boolean booked) {
		super();
		this.seatNumber = seatNumber;
		this.seatClass = seatClass;
		this.price = price;
		this.flight = flight;
		this.passenger = passenger;
		this.booked = booked;
	}

	public String getSeatNumber() {
		return seatNumber;
	}

	public void setSeatNumber(String seatNumber) {
		this.seatNumber = seatNumber;
	}

	public String getSeatClass() {
		return seatClass;
	}

	public void setSeatClass(String seatClass) {
		this.seatClass = seatClass;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public FlightDetails getFlight() {
		return flight;
	}

	public void setFlight(FlightDetails flight) {
		this.flight = flight;
	}

	public boolean isBooked() {
		return booked;
	}

	public void setBooked(boolean booked) {
		this.booked = booked;
	}

	public Passenger getPassenger() {
		return passenger;
	}

	public void setPassenger(Passenger passenger) {
		this.passenger = passenger;
	}

}
