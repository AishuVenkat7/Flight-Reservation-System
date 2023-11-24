package com.flightreservation.service;

import java.util.List;

import com.flightreservation.dto.FlightDetailsDto;
import com.flightreservation.dto.FlightsDto;
import com.flightreservation.dto.PassengerDto;
import com.flightreservation.dto.SeatDto;
import com.flightreservation.model.FlightDetails;
import com.flightreservation.model.Seat;

public interface BookingService {

	List<FlightsDto> getAllFlightsAndSeatsDetails();

	List<FlightDetailsDto> getFlightByArrivalAndDeparture(String departure, String arrival, String departureDate);

	List<SeatDto> getAllSeatsFromAFlight(String flightNumber);

	PassengerDto bookFlightForAPassenger(FlightDetails flightDetails, int userId);
	
	String bookSeatForAPassenger(Seat seat, String flightNumber, int userId);

}
