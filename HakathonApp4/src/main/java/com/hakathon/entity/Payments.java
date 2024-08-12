package com.hakathon.entity;

import lombok.Data;

import jakarta.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "payments")
public class Payments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @ManyToOne
    @JoinColumn(name = "registrationId")
    private ContestRegistrations contestRegistrations;

    private Float amount;

    private Date paymentDate;

    private String paymentMethod;
}


