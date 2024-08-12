package com.hakathon.entity;

import lombok.Data;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "test_cases")
public class TestCases {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long testCaseId;

    @ManyToOne
    @JoinColumn(name = "questionId")
    private Questions questions;

    @Column(nullable = false)
    private String inputData;

    @Column(nullable = false)
    private String expectedOutput;
}
