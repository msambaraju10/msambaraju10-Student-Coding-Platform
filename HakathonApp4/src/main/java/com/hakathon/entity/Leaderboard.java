package com.hakathon.entity;


import jakarta.persistence.*;
import java.util.Date;

import lombok.Data;

@Data
@Entity
@Table(name = "leaderboard")
public class Leaderboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leaderboardId;

    @ManyToOne
    @JoinColumn(name = "contestId")
    private Contests contests;

    @ManyToOne
    @JoinColumn(name = "userId")
    private Users users;

    @Column(nullable = false, columnDefinition = "int default 0")
    private Integer score;
    
    @ManyToOne
    @JoinColumn(name = "questionId")
    private Questions questions;

    private Date submissionDate;
}

