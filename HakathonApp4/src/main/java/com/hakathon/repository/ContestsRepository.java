package com.hakathon.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hakathon.entity.Contests;

public interface ContestsRepository extends JpaRepository<Contests, Long>{

}
