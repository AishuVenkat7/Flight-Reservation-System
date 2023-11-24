package com.flightreservation.serviceimpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flightreservation.dto.FlightsDto;
import com.flightreservation.dto.ReservationDto;
import com.flightreservation.dto.SeatDto;
import com.flightreservation.model.FlightDetails;
import com.flightreservation.model.Passenger;
import com.flightreservation.model.Seat;
import com.flightreservation.repository.AdminRepository;
import com.flightreservation.repository.BookingRepository;
import com.flightreservation.repository.ReservationRepository;
import com.flightreservation.service.AdminService;
import com.flightreservation.service.ManageReservationService;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private BookingRepository bookingRepository;
	@Autowired
	ReservationRepository reservationRepository;

	@Autowired
	ManageReservationService manageReservationService;

	@Override
	public String saveFlightDetailsToDB(FlightDetails flightobj, int admin) {
		List<Passenger> passenger = adminRepository.findByAdmin(admin);
		for (Passenger passengerobj : passenger) {
			if (passengerobj.getAdmin() == 1) {
				bookingRepository.save(flightobj);
				return "Admin checked! new Flight details is been added successfully";
			}
		}
		return "Admin not checked! Cannot add Flights!";
	}

	@Override
	public List<FlightsDto> getAllFlightsDetails(int admin) {
		List<Passenger> passenger = adminRepository.findByAdmin(admin);
		List<FlightsDto> flightDtos = new ArrayList<FlightsDto>();
		List<FlightDetails> flightDetail = bookingRepository.findAll();
		for (Passenger passengerobj : passenger) {
			if (passengerobj.getAdmin() == 1) {
				for (FlightDetails flightDetailnew : flightDetail) {
					FlightsDto flightDto = new FlightsDto();
					flightDto.setArrival(flightDetailnew.getArrival());
					flightDto.setArrivalDate(flightDetailnew.getArrivalDate());
					flightDto.setArrivalTime(flightDetailnew.getArrivalTime());
					flightDto.setDeparture(flightDetailnew.getDeparture());
					flightDto.setDepartureDate(flightDetailnew.getDepartureDate());
					flightDto.setDepartureTime(flightDetailnew.getDepartureTime());
					flightDto.setFlightNumber(flightDetailnew.getFlightNumber());
					flightDto.setSeatAvailability(flightDetailnew.getSeatAvailability());
					List<Seat> seats = flightDetailnew.getSeats();
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
			}
		}
		return flightDtos;
	}

	@Override
	public String updateFlightsDetailsAsAdminToDB(FlightDetails flightobj, int admin, String flightNumber) {
		List<Passenger> passenger = adminRepository.findByAdmin(admin);
		FlightDetails flightold = bookingRepository.findById(flightNumber).get();
		for (Passenger passengerobj : passenger) {
			if (passengerobj.getAdmin() == 1) {
				if (flightold.getSeatAvailability() == 30) {
					flightold.setFlightNumber(flightobj.getFlightNumber());
					flightold.setDeparture(flightobj.getDeparture());
					flightold.setArrival(flightobj.getArrival());
					flightold.setDepartureDate(flightobj.getDepartureDate());
					flightold.setDepartureTime(flightobj.getDepartureTime());
					flightold.setArrivalDate(flightobj.getArrivalDate());
					flightold.setArrivalTime(flightobj.getArrivalTime());
					flightold.setSeatAvailability(flightobj.getSeatAvailability());
					bookingRepository.save(flightold);
					return "Adminchecked! Flight Deatails Updated";
				}
				return "Flight details cannot update as it already allowed to be booked";
			}
		}
		return "Cannot Update Flight!";
	}

	@Override
	public String deleteFlightFromDB(FlightDetails flightobj, int admin, String flightNumber) {
		List<Passenger> passenger = adminRepository.findByAdmin(admin);
		// List<FlightDetails> flightsDeat = bookingRepository.findAll();
		FlightDetails flightold = bookingRepository.findById(flightNumber).get();
		for (Passenger passengerobj : passenger) {
			if (passengerobj.getAdmin() == 1) {
				if (flightobj.getSeatAvailability() == 30) {
					bookingRepository.delete(flightold);
					return "Admin checked! Flight Deatails Deleted Successfully";
				}
				return "Flight details cannot be deleted as this flight already exists bookings";
			}
		}
		return "Sorry! Cannot Delete Flight Details";
	}

	@Override
	public List<ReservationDto> getAllReservation(String flightNumber) {
		return manageReservationService.getAllReservationBasedOnFlightNumber(flightNumber);
	}

}
