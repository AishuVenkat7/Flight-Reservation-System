package com.flightreservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightreservation.dto.ReservationDto;
import com.flightreservation.model.Payment;
import com.flightreservation.service.PaymentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/payment")
public class PaymentController {

	@Autowired
	PaymentService paymentService;

	@PostMapping("/createReservation/{flightNumber}/{userId}/{seatNumber}")
	public ReservationDto makePayemntAndCreateReservation(@RequestBody Payment payment, @PathVariable String flightNumber,
			@PathVariable int userId, @PathVariable String seatNumber) {
		return paymentService.makePayemntAndCreateReservation(payment, userId, flightNumber, seatNumber);

	}

}
