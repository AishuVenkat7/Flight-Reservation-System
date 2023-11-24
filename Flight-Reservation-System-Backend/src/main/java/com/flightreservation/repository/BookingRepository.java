package com.flightreservation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.flightreservation.model.FlightDetails;

import jakarta.transaction.Transactional;

@Repository
public interface BookingRepository extends JpaRepository<FlightDetails, String> {
	
	List<FlightDetails> findByArrivalAndDepartureAndDepartureDate(String arrival, String departure, String departureDate);
	
	FlightDetails findByFlightNumber(String flightNumber);
	
	@Modifying
	@Transactional
	@Query("UPDATE FlightDetails s SET s.seatAvailability = :newAvailability WHERE s.flightNumber = :flightNumber")
	void updateSeatAvailabilityByFlightNumber(@Param("newAvailability") int newAvailability,
			@Param("flightNumber") String flightNumber);
	
}
