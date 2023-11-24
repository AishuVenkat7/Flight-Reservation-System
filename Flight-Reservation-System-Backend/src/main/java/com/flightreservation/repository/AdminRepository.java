package com.flightreservation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightreservation.model.Passenger;

@Repository
public interface AdminRepository extends JpaRepository<Passenger, Integer> {

	List<Passenger> findByAdmin(int admin);
}
