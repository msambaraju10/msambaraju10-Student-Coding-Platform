package com.hakathon.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hakathon.entity.Admin;



public interface AdminRepo extends JpaRepository<Admin, String> {

}
