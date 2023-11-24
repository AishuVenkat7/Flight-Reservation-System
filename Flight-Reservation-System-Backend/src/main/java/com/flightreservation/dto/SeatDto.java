package com.flightreservation.dto;

public class SeatDto {

	private String seatNumber;
	private String seatClass;
	private int price;
	private boolean booked;
	private int passengerId;

	public SeatDto() {

	}

	public SeatDto(String seatNumber, String seatClass, int price, boolean booked, int passengerId) {
		super();
		this.seatNumber = seatNumber;
		this.seatClass = seatClass;
		this.price = price;
		this.booked = booked;
		this.passengerId = passengerId;
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

	public boolean isBooked() {
		return booked;
	}

	public void setBooked(boolean booked) {
		this.booked = booked;
	}

	public int getPassengerId() {
		return passengerId;
	}

	public void setPassengerId(int passengerId) {
		this.passengerId = passengerId;
	}

}
