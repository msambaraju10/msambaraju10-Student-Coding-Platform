package com.hakathon.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hakathon.entity.Payments;

public interface PaymentsRepository extends JpaRepository<Payments, Long> {
    // You can add custom query methods if needed
	List<Payments> findByContestRegistrations_RegistrationId(Long registrationId);
}
