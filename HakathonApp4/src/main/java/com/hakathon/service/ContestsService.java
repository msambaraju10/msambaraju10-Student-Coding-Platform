package com.hakathon.service;

import java.util.List;

import com.hakathon.entity.Contests;



public interface ContestsService {
	boolean findContests(Contests contests);
	boolean addContests(Contests contests);
	List<Contests> getAllContests();
	boolean isContestsExist(Long customerId);
	Contests getContestsByContestId(Long customerId);
	boolean deleteContests(Long customerId);
	boolean updateContests(Contests contests);
}
