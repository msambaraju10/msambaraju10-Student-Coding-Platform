package com.hakathon.repository;

import com.hakathon.entity.Leaderboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaderboardRepository extends JpaRepository<Leaderboard, Long> {

    List<Leaderboard> findByContests_ContestId(Long contestId);

    List<Leaderboard> findByUsers_UserId(Long userId);
    
    List<Leaderboard> findByQuestions_QuestionId(Long questionId);
    
  

    // Add custom query methods if needed
}
