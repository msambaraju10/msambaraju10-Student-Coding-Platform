package com.hakathon.controller;

import com.hakathon.entity.Leaderboard;
import com.hakathon.service.LeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leaderboards")
public class LeaderboardController {

    @Autowired
    private LeaderboardService leaderboardService;

    @GetMapping("/getAllLeaderboardEntries")
    public List<Leaderboard> getAllLeaderboardEntries() {
        return leaderboardService.getAllLeaderboardEntries();
    }

    @GetMapping("/getLeaderboardById/{leaderboardId}")
    public ResponseEntity<Leaderboard> getLeaderboardById(@PathVariable Long leaderboardId) {
        Leaderboard leaderboard = leaderboardService.getLeaderboardById(leaderboardId);
        return ResponseEntity.ok(leaderboard);
    }

    @GetMapping("/getLeaderboardByContestId/contest/{contestId}")
    public List<Leaderboard> getLeaderboardByContestId(@PathVariable Long contestId) {
        return leaderboardService.getLeaderboardByContestId(contestId);
    }

    @GetMapping("/getLeaderboardByUserId/user/{userId}")
    public List<Leaderboard> getLeaderboardByUserId(@PathVariable Long userId) {
        return leaderboardService.getLeaderboardByUserId(userId);
    }

    @GetMapping("/getLeaderboardByQuestionId/question/{questionId}")
    public List<Leaderboard> getLeaderboardByQuestionId(@PathVariable Long questionId) {
        return leaderboardService.getLeaderboardByQuestionId(questionId);
    }

    @PostMapping("/saveLeaderboardEntry")
    public ResponseEntity<Leaderboard> saveLeaderboardEntry(@RequestBody Leaderboard leaderboard) {
        Leaderboard savedLeaderboard = leaderboardService.saveLeaderboardEntry(leaderboard);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLeaderboard);
    }

    @DeleteMapping("/deleteLeaderboardEntry/{leaderboardId}")
    public ResponseEntity<Void> deleteLeaderboardEntry(@PathVariable Long leaderboardId) {
        leaderboardService.deleteLeaderboardEntry(leaderboardId);
        return ResponseEntity.noContent().build();
    }
}
