package com.hakathon.repository;

import com.hakathon.entity.TestCases;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestCasesRepository extends JpaRepository<TestCases, Long> {
    // You can add custom query methods if needed
}
