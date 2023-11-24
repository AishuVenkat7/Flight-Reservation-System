package com.flightreservation.model;

import java.util.List;
import java.util.Objects;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class Passenger {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	@Column(unique = true)
	private String emailId;
	// 0 - not admin, 1 - admin
	private int admin;
	private String firstName;
	private String lastName;
	@ManyToMany(cascade = { CascadeType.ALL }, fetch = FetchType.LAZY)
	private List<FlightDetails> flightDetails;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<Payment> payment;

	public Passenger() {
	}

	public Passenger(int userId, String emailId, int admin, String firstName, String lastName,
			List<FlightDetails> flightDetails, List<Payment> payment) {
		super();
		this.userId = userId;
		this.emailId = emailId;
		this.admin = admin;
		this.firstName = firstName;
		this.lastName = lastName;
		this.flightDetails = flightDetails;
		this.payment = payment;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public List<FlightDetails> getFlightDetails() {
		return flightDetails;
	}

	public void setFlightDetails(List<FlightDetails> flightDetails) {
		this.flightDetails = flightDetails;
	}

	public int getAdmin() {
		return admin;
	}

	public void setAdmin(int admin) {
		this.admin = admin;
	}

	public List<Payment> getPayment() {
		return payment;
	}

	public void setPayment(List<Payment> payment) {
		this.payment = payment;
	}

	@Override
	public int hashCode() {
		return Objects.hash(admin, emailId, firstName, flightDetails, lastName, payment, userId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Passenger other = (Passenger) obj;
		return admin == other.admin && Objects.equals(emailId, other.emailId)
				&& Objects.equals(firstName, other.firstName) && Objects.equals(flightDetails, other.flightDetails)
				&& Objects.equals(lastName, other.lastName) && Objects.equals(payment, other.payment)
				&& userId == other.userId;
	}

}
