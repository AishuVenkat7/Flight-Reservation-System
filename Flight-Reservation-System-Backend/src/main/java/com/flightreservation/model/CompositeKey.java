package com.flightreservation.model;

import java.io.Serializable;
import java.util.Objects;

public class CompositeKey implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String seatNumber;
	private String flight;

	public String getSeatNumber() {
		return seatNumber;
	}

	public void setSeatNumber(String seatNumber) {
		this.seatNumber = seatNumber;
	}

	public String getFlight() {
		return flight;
	}

	public void setFlight(String flight) {
		this.flight = flight;
	}

	@Override
	public int hashCode() {
		return Objects.hash(flight, seatNumber);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CompositeKey other = (CompositeKey) obj;
		return Objects.equals(flight, other.flight) && Objects.equals(seatNumber, other.seatNumber);
	}

}
