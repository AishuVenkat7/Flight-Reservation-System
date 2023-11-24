package com.flightreservation.model;

import java.util.List;
import java.util.Objects;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class FlightDetails {

	@Id
	private String flightNumber;
	private String departure;
	private String arrival;
	private String departureDate;
	private String departureTime;
	private String arrivalDate;
	private String arrivalTime;

	private int seatAvailability;

	@OneToMany(mappedBy = "flight", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Seat> seats;

	@ManyToMany(mappedBy = "flightDetails", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	// @JsonIgnore
	private List<Passenger> passengers;

	public FlightDetails() {

	}

	public FlightDetails(String flightNumber, String departure, String arrival, String departureDate,
			String departureTime, String arrivalDate, String arrivalTime, int seatAvailability, List<Seat> seats,
			List<Passenger> passengers) {
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
		this.passengers = passengers;
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

	public List<Seat> getSeats() {
		return seats;
	}

	public void setSeats(List<Seat> seats) {
		this.seats = seats;
	}

	public List<Passenger> getPassengers() {
		return passengers;
	}

	public void setPassengers(List<Passenger> passengers) {
		this.passengers = passengers;
	}

	public int getSeatAvailability() {
		return seatAvailability;
	}

	public void setSeatAvailability(int seatAvailability) {
		this.seatAvailability = seatAvailability;
	}

	@Override
	public int hashCode() {
		return Objects.hash(arrival, arrivalDate, arrivalTime, departure, departureDate, departureTime, flightNumber,
				passengers, seatAvailability, seats);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		FlightDetails other = (FlightDetails) obj;
		return Objects.equals(arrival, other.arrival) && Objects.equals(arrivalDate, other.arrivalDate)
				&& Objects.equals(arrivalTime, other.arrivalTime) && Objects.equals(departure, other.departure)
				&& Objects.equals(departureDate, other.departureDate)
				&& Objects.equals(departureTime, other.departureTime)
				&& Objects.equals(flightNumber, other.flightNumber) && Objects.equals(passengers, other.passengers)
				&& seatAvailability == other.seatAvailability && Objects.equals(seats, other.seats);
	}


}
