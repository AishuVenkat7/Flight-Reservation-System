package com.flightreservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightreservation.dto.PassengerDto;
import com.flightreservation.model.Passenger;
import com.flightreservation.service.PassengerService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/passenger")
public class PassengerController {

	@Autowired
	private PassengerService passengerService;

	// Register the passenger into database and get userID back
	@PostMapping("/savePassenger")
	public PassengerDto savePassengerDetails(@RequestBody Passenger passengerObj) {
		return passengerService.savePassengerDetailsToDB(passengerObj);
	}

	// update passenger details
	@PutMapping("/updatePassenger/{userId}")
	public PassengerDto updatePassengerDetails(@PathVariable int userId, @RequestBody Passenger passenger) {
		return passengerService.updatePassengerDetails(passenger, userId);
	}

	// get passenger by id
	@GetMapping("/getPassenger/{userId}")
	public PassengerDto getPassengerDetailsById(@PathVariable int userId) {
		return passengerService.getPassengerById(userId);
	}

}
