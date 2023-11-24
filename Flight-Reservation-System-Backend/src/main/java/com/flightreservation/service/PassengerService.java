package com.flightreservation.service;

import com.flightreservation.dto.PassengerDto;
import com.flightreservation.model.Passenger;

public interface PassengerService {

	PassengerDto savePassengerDetailsToDB(Passenger passengerObj);

	PassengerDto updatePassengerDetails(Passenger passenger, int userId);

	PassengerDto getPassengerById(int userId);

}
