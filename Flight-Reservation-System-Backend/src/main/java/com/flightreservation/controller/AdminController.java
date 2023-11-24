package com.flightreservation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightreservation.dto.FlightsDto;
import com.flightreservation.dto.ReservationDto;
import com.flightreservation.model.FlightDetails;
import com.flightreservation.service.AdminService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/adminControl")
public class AdminController {

	@Autowired
	private AdminService adminservice;

	@PostMapping("/saveflight/{admin}")
	public String saveFlightDetails(@RequestBody FlightDetails flightobj, @PathVariable int admin) {
		// Passenger passenger = adminservice.getPassengerAdmin(admin);
		return adminservice.saveFlightDetailsToDB(flightobj, admin);
	}

	@GetMapping("/getAllFlights/{admin}")
	public List<FlightsDto> getAllFlightsDetails(@PathVariable int admin) {
		return adminservice.getAllFlightsDetails(admin);
	}

	@PutMapping("/updateFlight/{admin}/{flightNumber}")
	public String updateFlightsDetailsAsAdmin(@RequestBody FlightDetails flightobj, @PathVariable int admin,
			@PathVariable String flightNumber) {
		return adminservice.updateFlightsDetailsAsAdminToDB(flightobj, admin, flightNumber);
	}

	@DeleteMapping("/deleteFlight/{admin}/{flightNumber}")
	public String DeleteFlightDetails(@RequestBody FlightDetails flightobj, @PathVariable int admin,
			@PathVariable String flightNumber) {
		return adminservice.deleteFlightFromDB(flightobj, admin, flightNumber);
	}

	@GetMapping("/viewAllReservation/{flightNumber}")
	public List<ReservationDto> getAllReservation(@PathVariable String flightNumber) {
		return adminservice.getAllReservation(flightNumber);
	}

}
