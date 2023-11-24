package com.flightreservation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.flightreservation.model.Passenger;
import com.flightreservation.model.Reservation;
import com.flightreservation.model.FlightDetails;


@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

	@Query("SELECT r FROM Reservation r WHERE r.passenger.userId = :userId")
	List<Reservation> findReservationByPassengerUserId(@Param("userId") int userId);

	Reservation findByBookingIdAndPassenger(int bookingId, Passenger passenger);
	
	List<Reservation> findByFlight(FlightDetails flight);
	
	void deleteByBookingId(int bookingId);

}
