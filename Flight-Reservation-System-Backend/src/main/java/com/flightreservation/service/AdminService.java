package com.flightreservation.service;

import java.util.List;
import com.flightreservation.dto.FlightsDto;
import com.flightreservation.dto.ReservationDto;
import com.flightreservation.model.FlightDetails;

public interface AdminService {

	String saveFlightDetailsToDB(FlightDetails flightobj, int admin);

	List<FlightsDto> getAllFlightsDetails(int admin);

	String updateFlightsDetailsAsAdminToDB(FlightDetails flightobj, int admin, String flightNumber);

	String deleteFlightFromDB(FlightDetails flightobj, int admin, String flightNumber);

	List<ReservationDto> getAllReservation(String flightNumber);

}
