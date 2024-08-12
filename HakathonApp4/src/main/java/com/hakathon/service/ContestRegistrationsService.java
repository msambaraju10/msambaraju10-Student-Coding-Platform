package com.hakathon.service;

import java.util.List;

import com.hakathon.entity.ContestRegistrations;

public interface ContestRegistrationsService {

    boolean findContestRegistration(Long registrationId);

    boolean addContestRegistration(ContestRegistrations contestRegistration);

    List<ContestRegistrations> getAllContestRegistrations();

    boolean isContestRegistrationExist(Long registrationId);

    ContestRegistrations getContestRegistrationById(Long registrationId);

    boolean deleteContestRegistration(Long registrationId);

    boolean updateContestRegistration(ContestRegistrations contestRegistration);
    
    List<ContestRegistrations> getContestRegistrationsByUserId(Long userId);

    List<ContestRegistrations> getContestRegistrationsByContestId(Long contestId);
    
     boolean existsByContestIdAndUserId(Long contestId, Long userId);
}

