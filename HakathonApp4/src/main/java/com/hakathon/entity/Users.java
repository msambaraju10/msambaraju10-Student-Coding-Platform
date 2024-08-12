package com.hakathon.entity;

import lombok.Data;

import jakarta.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String firstName;

    private String lastName;

    private String gender;

    private String mobile;

    @Column(unique = true, nullable = false)
    private String email;

    private String qualifications;

    @Column(nullable = false)
    private String password;

    private Date registrationDate;
}

