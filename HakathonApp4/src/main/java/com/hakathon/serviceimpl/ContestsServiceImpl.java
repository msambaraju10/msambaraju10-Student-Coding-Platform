package com.hakathon.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hakathon.entity.Contests;
import com.hakathon.repository.ContestsRepository;
import com.hakathon.service.ContestsService;

import java.util.List;

@Service
public class ContestsServiceImpl implements ContestsService {

    @Autowired
    private ContestsRepository contestsRepository;

    @Override
    public boolean findContests(Contests contests) {
    	return contestsRepository.existsById(contests.getContestId());
    }

    @Override
    public boolean addContests(Contests contests) {
    	
        if (!isContestsExist(contests.getContestId())) {
            contestsRepository.save(contests);
            return true;
        }
        return false;
    }

    @Override
    public List<Contests> getAllContests() {
        return contestsRepository.findAll();
    }

    @Override
    public boolean isContestsExist(Long contestId) {
        return contestsRepository.existsById(contestId);
    }

    @Override
    public Contests getContestsByContestId(Long contestId) {
        return contestsRepository.findById(contestId).orElse(null);
    }

    @Override
    public boolean deleteContests(Long contestId) {
        if (isContestsExist(contestId)) {
            contestsRepository.deleteById(contestId);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateContests(Contests contests) {
        if (isContestsExist(contests.getContestId())) {
            contestsRepository.save(contests);
            return true;
        }
        return false;
    }
}
