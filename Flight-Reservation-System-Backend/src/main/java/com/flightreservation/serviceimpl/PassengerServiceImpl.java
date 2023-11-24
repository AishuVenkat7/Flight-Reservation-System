package com.flightreservation.serviceimpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flightreservation.dto.FlightDetailsDto;
import com.flightreservation.dto.PassengerDto;
import com.flightreservation.dto.PaymentDto;
import com.flightreservation.dto.SeatDto;
import com.flightreservation.model.FlightDetails;
import com.flightreservation.model.Passenger;
import com.flightreservation.model.Payment;
import com.flightreservation.model.Seat;
import com.flightreservation.repository.PassengerRepository;
import com.flightreservation.service.PassengerService;

@Service
public class PassengerServiceImpl implements PassengerService {

	@Autowired
	private PassengerRepository passengerRepository;

	@Override
	public PassengerDto savePassengerDetailsToDB(Passenger passengerObj) {
		Passenger passenger = passengerRepository.findByEmailIdAndLastName(passengerObj.getEmailId(),
				passengerObj.getLastName());
		PassengerDto passengerDto = new PassengerDto();
		if (passenger != null) {
			    passengerDto.setUserId( passenger.getUserId()); 
			    passengerDto.setAdmin(passenger.getAdmin());
			    passengerDto.setEmailId(passenger.getEmailId());
			    passengerDto.setFirstName(passenger.getFirstName());
			    passengerDto.setLastName(passenger.getLastName());
		} else {
			Passenger savedPassenger = passengerRepository.save(passengerObj);
			passengerDto.setUserId( savedPassenger.getUserId()); 
		    passengerDto.setAdmin(savedPassenger.getAdmin());
		    passengerDto.setEmailId(savedPassenger.getEmailId());
		    passengerDto.setFirstName(savedPassenger.getFirstName());
		    passengerDto.setLastName(savedPassenger.getLastName());
		}
		return passengerDto;
	}

	@Override
	public PassengerDto updatePassengerDetails(Passenger passenger, int userId) {
		Passenger retrievedPassenger = passengerRepository.findById(userId).get();
		PassengerDto passengerDto = null;
		if (retrievedPassenger != null) {
			retrievedPassenger.setAdmin(passenger.getAdmin());
			retrievedPassenger.setEmailId(passenger.getEmailId());
			retrievedPassenger.setFirstName(passenger.getFirstName());
			retrievedPassenger.setLastName(passenger.getLastName());
			retrievedPassenger.setUserId(userId);
			Passenger passengerResult = passengerRepository.save(retrievedPassenger);
			passengerDto = getPassengerById(passengerResult.getUserId());
		}
		return passengerDto;
	}

	@Override
	public PassengerDto getPassengerById(int userId) {
		Passenger passenger = passengerRepository.findById(userId).get();

		if (passenger != null) {
			PassengerDto passengerDto = new PassengerDto();
			passengerDto.setAdmin(passenger.getAdmin());
			passengerDto.setEmailId(passenger.getEmailId());
			passengerDto.setFirstName(passenger.getFirstName());
			passengerDto.setLastName(passenger.getLastName());
			passengerDto.setUserId(passenger.getUserId());

			List<FlightDetails> flightDetails = passenger.getFlightDetails();
			List<FlightDetailsDto> flightDetailsDtos = new ArrayList<FlightDetailsDto>();

			List<Payment> payments = passenger.getPayment();
			List<PaymentDto> paymentDtos = new ArrayList<PaymentDto>();

			if (flightDetails != null) {
				for (FlightDetails flightDetail : flightDetails) {
					FlightDetailsDto flightDetailsDto = new FlightDetailsDto();
					flightDetailsDto.setArrival(flightDetail.getArrival());
					flightDetailsDto.setArrivalDate(flightDetail.getArrivalDate());
					flightDetailsDto.setArrivalTime(flightDetail.getArrivalTime());
					flightDetailsDto.setDeparture(flightDetail.getDeparture());
					flightDetailsDto.setDepartureDate(flightDetail.getDepartureDate());
					flightDetailsDto.setDepartureTime(flightDetail.getDepartureTime());
					flightDetailsDto.setFlightNumber(flightDetail.getFlightNumber());
					flightDetailsDto.setSeatAvailability(flightDetail.getSeatAvailability());

					List<Seat> seats = flightDetail.getSeats();
					SeatDto seatDto = new SeatDto();
					if (seats != null) {
						for (Seat seat : seats) {
							if (seat.getPassenger() != null
									&& seat.getPassenger().getUserId() == passenger.getUserId()) {
								seatDto.setBooked(seat.isBooked());
								seatDto.setPrice(seat.getPrice());
								seatDto.setSeatClass(seat.getSeatClass());
								seatDto.setSeatNumber(seat.getSeatNumber());
							}
						}
					}

					flightDetailsDto.setSeat(seatDto);
					flightDetailsDtos.add(flightDetailsDto);
				}
			}
			if (payments != null) {
				for (Payment payment : payments) {
					PaymentDto paymentDto = new PaymentDto();
					paymentDto.setPaymentId(payment.getPaymentId());
					paymentDto.setTotalTravelFair(payment.getTotalTravelFair());
					paymentDto.setFlightNumber(payment.getFlightNumber());

					paymentDtos.add(paymentDto);
				}
			}

			passengerDto.setFlightDetails(flightDetailsDtos);
			passengerDto.setPayment(paymentDtos);

			return passengerDto;
		}
		return null;
	}

}
