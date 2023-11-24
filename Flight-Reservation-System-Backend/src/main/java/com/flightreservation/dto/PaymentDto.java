package com.flightreservation.dto;

public class PaymentDto {

	private int paymentId;
	private int totalTravelFair;
	private String flightNumber;

	public PaymentDto() {

	}

	public PaymentDto(int paymentId, int totalTravelFair, String flightNumber) {
		super();
		this.paymentId = paymentId;
		this.totalTravelFair = totalTravelFair;
		this.flightNumber = flightNumber;
	}

	public int getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(int paymentId) {
		this.paymentId = paymentId;
	}

	public int getTotalTravelFair() {
		return totalTravelFair;
	}

	public void setTotalTravelFair(int totalTravelFair) {
		this.totalTravelFair = totalTravelFair;
	}

	public String getFlightNumber() {
		return flightNumber;
	}

	public void setFlightNumber(String flightNumber) {
		this.flightNumber = flightNumber;
	}

}
