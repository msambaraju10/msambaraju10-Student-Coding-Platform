package com.hakathon.entity;

import lombok.Data;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "questions")
public class Questions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @ManyToOne
    @JoinColumn(name = "contestId")
    private Contests contests;

    @Column(nullable = false)
    private String languageName;
    
    @Column(nullable = true)
    private Integer minutes;
    
    @Column(nullable = false, length=1000)
    private String questionText;

    private Integer score;
}
