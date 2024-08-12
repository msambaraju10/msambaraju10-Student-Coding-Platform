package com.hakathon.service;

import com.hakathon.entity.Leaderboard;

import java.util.List;

public interface LeaderboardService {

    List<Leaderboard> getAllLeaderboardEntries();

    Leaderboard getLeaderboardById(Long leaderboardId);

    List<Leaderboard> getLeaderboardByContestId(Long contestId);

    List<Leaderboard> getLeaderboardByUserId(Long userId);
    
    List<Leaderboard> getLeaderboardByQuestionId(Long questionId);

    Leaderboard saveLeaderboardEntry(Leaderboard leaderboard);

    void deleteLeaderboardEntry(Long leaderboardId);
}
