package com.flightreservation.serviceimpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flightreservation.dto.FlightDetailsDto;
import com.flightreservation.dto.PassengerDto;
import com.flightreservation.dto.PaymentDto;
import com.flightreservation.dto.ReservationDto;
import com.flightreservation.dto.SeatDto;
import com.flightreservation.model.FlightDetails;
import com.flightreservation.model.Passenger;
import com.flightreservation.model.Payment;
import com.flightreservation.model.Reservation;
import com.flightreservation.model.Seat;
import com.flightreservation.repository.BookingRepository;
import com.flightreservation.repository.PassengerRepository;
import com.flightreservation.repository.PaymentRepository;
import com.flightreservation.repository.ReservationRepository;
import com.flightreservation.repository.SeatRepository;
import com.flightreservation.service.ManageReservationService;

@Service
public class ManageReservationServiceImpl implements ManageReservationService {

	@Autowired
	ReservationRepository reservationRepository;

	@Autowired
	private PassengerRepository passengerRepository;

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private SeatRepository seatRepository;

	@Autowired
	PaymentRepository paymentRepository;

	public List<ReservationDto> mapReservationToReservationDto(List<Reservation> reservation) {

		List<ReservationDto> reservationDtos = new ArrayList<ReservationDto>();
		for (Reservation retrievedDBReservation : reservation) {
			ReservationDto reservationdto = new ReservationDto();
			reservationdto.setArrival(retrievedDBReservation.getArrival());
			reservationdto.setDeparture(retrievedDBReservation.getDeparture());
			reservationdto.setBookingId(retrievedDBReservation.getBookingId());

			Passenger passenger = retrievedDBReservation.getPassenger();

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

			for (FlightDetails flightDetail : flightDetails) {
				if (flightDetail.getFlightNumber().equals(retrievedDBReservation.getFlight().getFlightNumber())) {
					FlightDetailsDto flightDetailsDto = new FlightDetailsDto();
					flightDetailsDto.setArrival(flightDetail.getArrival());
					flightDetailsDto.setArrivalDate(flightDetail.getArrivalDate());
					flightDetailsDto.setArrivalTime(flightDetail.getArrivalTime());
					flightDetailsDto.setDeparture(flightDetail.getDeparture());
					flightDetailsDto.setDepartureDate(flightDetail.getDepartureDate());
					flightDetailsDto.setDepartureTime(flightDetail.getDepartureTime());
					flightDetailsDto.setFlightNumber(flightDetail.getFlightNumber());
					flightDetailsDto.setSeatAvailability(flightDetail.getSeatAvailability());
					reservationdto.setFlightNumber(flightDetail.getFlightNumber());

					List<Seat> seats = flightDetail.getSeats();
					SeatDto seatDto = new SeatDto();
					for (Seat seat : seats) {
						if (seat.getPassenger() != null && seat.getPassenger().getUserId() == passenger.getUserId()) {
							seatDto.setBooked(seat.isBooked());
							seatDto.setPrice(seat.getPrice());
							seatDto.setSeatClass(seat.getSeatClass());
							seatDto.setSeatNumber(seat.getSeatNumber());
							seatDto.setPassengerId(passenger.getUserId());
						}
					}

					flightDetailsDto.setSeat(seatDto);
					flightDetailsDtos.add(flightDetailsDto);

					for (Payment payment : payments) {
						if (payment.getFlightNumber().equals(retrievedDBReservation.getFlight().getFlightNumber())) {
							PaymentDto paymentDto = new PaymentDto();
							paymentDto.setPaymentId(payment.getPaymentId());
							paymentDto.setTotalTravelFair(payment.getTotalTravelFair());
							paymentDto.setFlightNumber(flightDetail.getFlightNumber());

							paymentDtos.add(paymentDto);
						}
					}
				}
			}

			passengerDto.setFlightDetails(flightDetailsDtos);
			passengerDto.setPayment(paymentDtos);
			reservationdto.setPassenger(passengerDto);
			reservationDtos.add(reservationdto);
		}

		return reservationDtos;

	}

	@Override
	public List<ReservationDto> getAllReservation(int userId) {
		List<Reservation> reservation = reservationRepository.findReservationByPassengerUserId(userId);
		if (reservation != null)
			return mapReservationToReservationDto(reservation);
		return null;
	}

	@Override
	public List<ReservationDto> getAllReservationBasedOnEmail(String lastName, String emailId) {
		Passenger passenger = passengerRepository.findByEmailIdAndLastName(emailId, lastName);
		if (passenger != null)
			return getAllReservation(passenger.getUserId());
		return null;
	}

	@Override
	public List<ReservationDto> getAllReservationBasedOnFlightNumber(String flightNumber) {

		FlightDetails flightDetails = bookingRepository.findByFlightNumber(flightNumber);
		List<Reservation> reservation = reservationRepository.findByFlight(flightDetails);
		if (reservation != null)
			return mapReservationToReservationDto(reservation);
		return null;
	}

	@Override
	public ReservationDto getOneReservation(int bookingId, int userId) {
		List<ReservationDto> retrievedReservations = getAllReservation(userId);

		for (ReservationDto rdto : retrievedReservations) {
			if (rdto.getBookingId() == bookingId) {
				return rdto;
			}
		}
		return null;
	}

	@Transactional
	@Override
	public ReservationDto updateReservation(ReservationDto updatedReservation, int bookingId, int userId) {

		Passenger existingPassenger = passengerRepository.findById(userId).get();
		Reservation existingReservation = reservationRepository.findByBookingIdAndPassenger(bookingId,
				existingPassenger);
		PassengerDto updatedPassenger = updatedReservation.getPassenger();

		FlightDetailsDto updatedFlightDetails = updatedReservation.getPassenger().getFlightDetails().get(0);
		FlightDetails existingFlightDetails = bookingRepository
				.findByFlightNumber(updatedFlightDetails.getFlightNumber());

		// remove the already booked passenger seat
		List<Seat> bookedSeats = seatRepository.findByPassengerAndFlight(existingPassenger, existingFlightDetails);
		for (Seat bookedSeat : bookedSeats) {
			bookedSeat.setBooked(false);
			bookedSeat.setPassenger(null);
			seatRepository.save(bookedSeat);
		}

		// Update passenger details
		existingPassenger.setFirstName(updatedPassenger.getFirstName());
		existingPassenger.setLastName(updatedPassenger.getLastName());
		existingPassenger.setAdmin(updatedPassenger.getAdmin());
		existingPassenger.setEmailId(updatedPassenger.getEmailId());
		existingPassenger.setUserId(updatedPassenger.getUserId());

		// Update seat details
		SeatDto updatedSeat = updatedFlightDetails.getSeat();
		Seat existingSeat = seatRepository.findSingleSeatNumber(updatedSeat.getSeatNumber(),
				updatedFlightDetails.getFlightNumber());
		if (existingSeat == null) {
			return null;
		}

		existingSeat.setSeatClass(updatedSeat.getSeatClass());
		existingSeat.setPrice(updatedSeat.getPrice());
		existingSeat.setBooked(updatedSeat.isBooked());
		existingSeat.setPassenger(existingSeat.isBooked() ? existingPassenger : null);
		existingSeat.setFlight(existingFlightDetails);

		// update payment details
		List<PaymentDto> updatedPayments = updatedPassenger.getPayment();

		for (PaymentDto updatedPayment : updatedPayments) {
			if (updatedPayment.getFlightNumber().equals(updatedFlightDetails.getFlightNumber())) {
				Payment existingPayment = paymentRepository.findByPaymentIdAndFlightNumber(
						updatedPayment.getPaymentId(), updatedPayment.getFlightNumber());
				existingPayment.setTotalTravelFair(existingSeat.getPrice());
				break;
			}
		}

		// Save changes
		Reservation result = reservationRepository.save(existingReservation);

		return getOneReservation(result.getBookingId(), result.getPassenger().getUserId());
	}

	@Transactional
	@Override
	public String deleteReservation(int bookingId, int userId) {
		ReservationDto existingReservation = getOneReservation(bookingId, userId);
		PassengerDto existingPassenger = existingReservation.getPassenger();
		FlightDetailsDto existingFlightDetail = existingPassenger.getFlightDetails().get(0);

		Passenger passenger = passengerRepository.findById(userId).get();
		int index = 0;
		for (FlightDetails flightDetail : passenger.getFlightDetails()) {
			if (flightDetail.getFlightNumber().equals(existingFlightDetail.getFlightNumber())) {
				flightDetail.setSeatAvailability(existingFlightDetail.getSeatAvailability() + 1);
				for (Seat seat : flightDetail.getSeats()) {
					if (seat.getPassenger() != null
							&& seat.getPassenger().getUserId() == existingFlightDetail.getSeat().getPassengerId()) {
						seat.setBooked(false);
						seat.setPassenger(null);
						break;
					}
				}
				flightDetail = null;
				passenger.getFlightDetails().set(index, flightDetail);
			}
			++index;
		}

		List<Payment> payments = passenger.getPayment();
		index = 0;
		for (Payment payment : payments) {
			if (payment.getPaymentId() == existingPassenger.getPayment().get(0).getPaymentId()) {
				paymentRepository.delete(payment);
				payment = null;
				payments.set(index, payment);
				break;
			}
			++index;
		}

		reservationRepository.deleteByBookingId(bookingId);
		passengerRepository.save(passenger);

		return "Reservation deleted Successfully";
	}

}
