package com.hakathon.serviceimpl;

import com.hakathon.entity.Leaderboard;
import com.hakathon.repository.LeaderboardRepository;
import com.hakathon.service.LeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaderboardServiceImpl implements LeaderboardService {

    @Autowired
    private LeaderboardRepository leaderboardRepository;

    @Override
    public List<Leaderboard> getAllLeaderboardEntries() {
        return leaderboardRepository.findAll();
    }

    @Override
    public Leaderboard getLeaderboardById(Long leaderboardId) {
        Optional<Leaderboard> optionalLeaderboard = leaderboardRepository.findById(leaderboardId);
        return optionalLeaderboard.orElse(null);
    }

    @Override
    public List<Leaderboard> getLeaderboardByContestId(Long contestId) {
        return leaderboardRepository.findByContests_ContestId(contestId);
    }

    @Override
    public List<Leaderboard> getLeaderboardByUserId(Long userId) {
        return leaderboardRepository.findByUsers_UserId(userId);
    }

    @Override
    public Leaderboard saveLeaderboardEntry(Leaderboard leaderboard) {
        return leaderboardRepository.save(leaderboard);
    }

    @Override
    public void deleteLeaderboardEntry(Long leaderboardId) {
        leaderboardRepository.deleteById(leaderboardId);
    }

	@Override
	public List<Leaderboard> getLeaderboardByQuestionId(Long questionId) {
		return leaderboardRepository.findByQuestions_QuestionId(questionId);
	}
}
