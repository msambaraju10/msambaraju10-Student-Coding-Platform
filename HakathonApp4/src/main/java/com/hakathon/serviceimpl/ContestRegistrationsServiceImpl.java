package com.hakathon.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hakathon.entity.ContestRegistrations;
import com.hakathon.repository.ContestRegistrationsRepository;
import com.hakathon.repository.ContestsRepository;
import com.hakathon.repository.UsersRepository;
import com.hakathon.service.ContestRegistrationsService;

import java.util.List;

@Service
public class ContestRegistrationsServiceImpl implements ContestRegistrationsService {

    @Autowired
    private ContestRegistrationsRepository contestRegistrationsRepository;
    
    @Autowired
    private ContestsRepository contestsRepository;
    
    @Autowired
    private UsersRepository usersRepository; 

    @Override
    public boolean findContestRegistration(Long registrationId) {
        return contestRegistrationsRepository.existsById(registrationId);
    }

    @Override
    public boolean addContestRegistration(ContestRegistrations contestRegistration) {
        if (!isContestRegistrationExist(contestRegistration.getRegistrationId())) {
            contestRegistrationsRepository.save(contestRegistration);
            return true;
        }
        return false;
    }

    @Override
    public List<ContestRegistrations> getAllContestRegistrations() {
        return contestRegistrationsRepository.findAll();
    }

    @Override
    public boolean isContestRegistrationExist(Long registrationId) {
        return contestRegistrationsRepository.existsById(registrationId);
    }

    @Override
    public ContestRegistrations getContestRegistrationById(Long registrationId) {
        return contestRegistrationsRepository.findById(registrationId).orElse(null);
    }

    @Override
    public boolean deleteContestRegistration(Long registrationId) {
        if (isContestRegistrationExist(registrationId)) {
            contestRegistrationsRepository.deleteById(registrationId);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateContestRegistration(ContestRegistrations contestRegistration) {
        if (isContestRegistrationExist(contestRegistration.getRegistrationId())) {
            contestRegistrationsRepository.save(contestRegistration);
            return true;
        }
        return false;
    }
    
    @Override
    public List<ContestRegistrations> getContestRegistrationsByUserId(Long userId) {
        return contestRegistrationsRepository.findByUsers_UserId(userId);
    }

    @Override
    public List<ContestRegistrations> getContestRegistrationsByContestId(Long contestId) {
        return contestRegistrationsRepository.findByContests_ContestId(contestId);
    }

	@Override
	public boolean existsByContestIdAndUserId(Long contestId, Long userId) {
		
		// Assuming contestId and userId are available in your code
		boolean existsRegistration = contestRegistrationsRepository.existsByContestsAndUsers(
		    contestsRepository.findById(contestId).orElse(null),
		    usersRepository.findById(userId).orElse(null)
		);
		return existsRegistration;
	}
    
    
    
    
}

