package com.hakathon.entity;
import lombok.*;

import jakarta.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "contests")
@NoArgsConstructor
@AllArgsConstructor
public class Contests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contestId;

    @Column(nullable = false)
    private String title;

    private String description;

    private Float feeAmount;

    @Column(nullable = false)
    private Date startDate;

    @Column(nullable = false)
    private Date endDate;

    private Date createdAt;
}
