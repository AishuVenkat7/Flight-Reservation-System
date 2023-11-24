package com.flightreservation.serviceimpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flightreservation.dto.FlightDetailsDto;
import com.flightreservation.dto.FlightsDto;
import com.flightreservation.dto.PassengerDto;
import com.flightreservation.dto.SeatDto;
import com.flightreservation.model.FlightDetails;
import com.flightreservation.model.Passenger;
import com.flightreservation.model.Seat;
import com.flightreservation.repository.BookingRepository;
import com.flightreservation.repository.PassengerRepository;
import com.flightreservation.repository.SeatRepository;
import com.flightreservation.service.BookingService;
import com.flightreservation.service.PassengerService;

@Service
public class BookingServiceImpl implements BookingService {

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private SeatRepository seatRepository;

	@Autowired
	private PassengerRepository passengerRepository;

	@Autowired
	private PassengerService passengerService;

	public List<FlightsDto> mapFlightAndSeatsToFlightDtoAnsSeatDto(List<FlightDetails> flightDetails) {

		List<FlightsDto> flightDtos = new ArrayList<FlightsDto>();

		for (FlightDetails flightDetail : flightDetails) {
			FlightsDto flightDto = new FlightsDto();
			flightDto.setArrival(flightDetail.getArrival());
			flightDto.setArrivalDate(flightDetail.getArrivalDate());
			flightDto.setArrivalTime(flightDetail.getArrivalTime());
			flightDto.setDeparture(flightDetail.getDeparture());
			flightDto.setDepartureDate(flightDetail.getDepartureDate());
			flightDto.setDepartureTime(flightDetail.getDepartureTime());
			flightDto.setFlightNumber(flightDetail.getFlightNumber());
			flightDto.setSeatAvailability(flightDetail.getSeatAvailability());

			List<Seat> seats = flightDetail.getSeats();
			List<SeatDto> seatDtos = new ArrayList<SeatDto>();
			if (seats != null) {
				for (Seat seat : seats) {
					SeatDto seatDto = new SeatDto();
					seatDto.setBooked(seat.isBooked());
					seatDto.setPrice(seat.getPrice());
					seatDto.setSeatClass(seat.getSeatClass());
					seatDto.setSeatNumber(seat.getSeatNumber());
					if (seat.getPassenger() != null) {
						seatDto.setPassengerId(seat.getPassenger().getUserId());
					} else {
						seatDto.setPassengerId(-1);
					}
					seatDtos.add(seatDto);
				}
			}

			flightDto.setSeats(seatDtos);
			flightDtos.add(flightDto);
		}
		return flightDtos;

	}
	
	public List<FlightDetailsDto> mapFlightToFlightDto(List<FlightDetails> flightDetails) {
		
		List<FlightDetailsDto> flightDtos = new ArrayList<FlightDetailsDto>();

		for (FlightDetails flightDetail : flightDetails) {
			FlightDetailsDto flightDto = new FlightDetailsDto();
			flightDto.setArrival(flightDetail.getArrival());
			flightDto.setArrivalDate(flightDetail.getArrivalDate());
			flightDto.setArrivalTime(flightDetail.getArrivalTime());
			flightDto.setDeparture(flightDetail.getDeparture());
			flightDto.setDepartureDate(flightDetail.getDepartureDate());
			flightDto.setDepartureTime(flightDetail.getDepartureTime());
			flightDto.setFlightNumber(flightDetail.getFlightNumber());
			flightDto.setSeatAvailability(flightDetail.getSeatAvailability());
			
			List<Seat> seats = flightDetail.getSeats();
			int minPrice = Integer.MAX_VALUE;
			if (seats != null) {
				for (Seat seat : seats) {
					if(seat.getSeatClass().equalsIgnoreCase("economy") && minPrice > seat.getPrice()) {
						minPrice = seat.getPrice();
					}
				}
				flightDto.setMinimumSeatPrice(minPrice);
			}
			flightDto.setSeat(null);
			flightDtos.add(flightDto);
		}
		return flightDtos;
		
	}

	@Override
	public List<FlightsDto> getAllFlightsAndSeatsDetails() {

		List<FlightDetails> flightDetails = bookingRepository.findAll();
		if (flightDetails != null)
			return mapFlightAndSeatsToFlightDtoAnsSeatDto(flightDetails);
		return null;

	}

	@Override
	public List<FlightDetailsDto> getFlightByArrivalAndDeparture(String departure, String arrival, String departureDate) {

		List<FlightDetails> flightDetails = bookingRepository.findByArrivalAndDepartureAndDepartureDate(arrival,
				departure, departureDate);
		if (flightDetails != null)
			return mapFlightToFlightDto(flightDetails);
		return null;

	}

	@Override
	public List<SeatDto> getAllSeatsFromAFlight(String flightNumber) {

		FlightDetails flightDetail = bookingRepository.findById(flightNumber).get();

		if (flightDetail != null) {
			List<Seat> seats = flightDetail.getSeats();
			List<SeatDto> seatDtos = new ArrayList<SeatDto>();

			if (seats != null) {
				for (Seat seat : seats) {
					SeatDto seatDto = new SeatDto();
					seatDto.setBooked(seat.isBooked());
					seatDto.setPrice(seat.getPrice());
					seatDto.setSeatClass(seat.getSeatClass());
					seatDto.setSeatNumber(seat.getSeatNumber());
					if (seat.getPassenger() != null) {
						seatDto.setPassengerId(seat.getPassenger().getUserId());
					} else {
						seatDto.setPassengerId(-1);
					}
					seatDtos.add(seatDto);
				}
			}
			return seatDtos;
		}
		return null;

	}

	@Override
	public PassengerDto bookFlightForAPassenger(FlightDetails flightDetails, int userId) {
		if (bookingRepository.findByFlightNumber(flightDetails.getFlightNumber()).getSeatAvailability() <= 0)
			return null;
		Passenger passenger = passengerRepository.findById(userId).get();
		Passenger passengerFlight = null;
		if (passenger != null) {
			passenger.getFlightDetails().add(flightDetails);
			passengerFlight = passengerRepository.save(passenger);
		}

		if (passengerFlight != null) {
			PassengerDto passengerDto = passengerService.getPassengerById(passengerFlight.getUserId());
			return passengerDto;
		}
		return null;
	}

	@Override
	public String bookSeatForAPassenger(Seat seat, String flightNumber, int userId) {
		List<Seat> retrievedSeats = seatRepository.findBySeatNumber(seat.getSeatNumber());
		Passenger passenger = passengerRepository.findById(userId).get();
		Seat seatResult = null;
		if (retrievedSeats != null) {
			for (Seat s : retrievedSeats) {
				if (s.getFlight() != null && s.getFlight().getFlightNumber().equals(flightNumber) && !s.isBooked()) {
					s.setBooked(true);
					s.setPassenger(passenger);
					seatResult = seatRepository.save(s);

					bookingRepository.updateSeatAvailabilityByFlightNumber(s.getFlight().getSeatAvailability() - 1,
							flightNumber);
					break;
				}
			}
		}
		if (seatResult != null)
			return "Seats have been chosen and saved successfully";
		return null;
	}

}
