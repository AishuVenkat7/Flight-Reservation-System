package com.flightreservation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightreservation.dto.FlightDetailsDto;
import com.flightreservation.dto.FlightsDto;
import com.flightreservation.dto.PassengerDto;
import com.flightreservation.dto.SeatDto;
import com.flightreservation.model.FlightDetails;
import com.flightreservation.model.Seat;
import com.flightreservation.service.BookingService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/booking")
public class BookingController {

	@Autowired
	private BookingService bookingService;

	@GetMapping("/getAllFlightsAndSeats")
	public List<FlightsDto> getAllFlightsAndSeatsDetails() {
		return bookingService.getAllFlightsAndSeatsDetails();
	}

	@GetMapping("/getFlightsOnArrivalAndDeparture/{departure}/{arrival}/{departureDate}")
	public List<FlightDetailsDto> getFlightByArrivalAndDeparture(@PathVariable String departure,
			@PathVariable String arrival, @PathVariable String departureDate) {
		return bookingService.getFlightByArrivalAndDeparture(departure, arrival, departureDate);
	}

	@GetMapping("/getAllSeats/{flightNumber}")
	public List<SeatDto> getAllSeatsFromAFlight(@PathVariable String flightNumber) {
		return bookingService.getAllSeatsFromAFlight(flightNumber);
	}

	@PostMapping("/bookFlights/{userId}")
	public PassengerDto bookFlightForAPassenger(@RequestBody FlightDetails flightDetails, @PathVariable int userId) {
		return bookingService.bookFlightForAPassenger(flightDetails, userId);
	}

	@PostMapping("/bookSeats/{flightNumber}/{userId}")
	public String bookSeatForAPassenger(@RequestBody Seat seat, @PathVariable String flightNumber,
			@PathVariable int userId) {
		return bookingService.bookSeatForAPassenger(seat, flightNumber, userId);
	}

}
