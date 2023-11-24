package com.flightreservation.service;

import com.flightreservation.dto.ReservationDto;
import com.flightreservation.model.Payment;

public interface PaymentService {

	ReservationDto makePayemntAndCreateReservation(Payment payment, int userId, String flightNumber,
			String seatNumber);

}
