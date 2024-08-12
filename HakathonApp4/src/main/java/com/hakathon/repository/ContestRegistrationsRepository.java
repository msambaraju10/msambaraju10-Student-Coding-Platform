package com.hakathon.repository;

import com.hakathon.entity.ContestRegistrations;
import com.hakathon.entity.Contests;
import com.hakathon.entity.Users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContestRegistrationsRepository extends JpaRepository<ContestRegistrations, Long> {

    List<ContestRegistrations> findByUsers_UserId(Long userId);

    List<ContestRegistrations> findByContests_ContestId(Long contestId);
    
    boolean existsByContestsAndUsers(Contests contest, Users user);

    // Add custom query methods if needed
}
