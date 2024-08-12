package com.hakathon.entity;
import lombok.Data;

import jakarta.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "contestRegistrations")
public class ContestRegistrations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long registrationId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "contestId")
    private Contests contests;

    private Date registrationDate;

    private String paymentStatus;
}
