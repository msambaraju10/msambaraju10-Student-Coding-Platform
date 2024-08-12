package com.hakathon.repository;

import com.hakathon.entity.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionsRepository extends JpaRepository<Questions, Long> {

    List<Questions> findByContests_ContestId(Long contestId);

    // Add custom query methods if needed
}
