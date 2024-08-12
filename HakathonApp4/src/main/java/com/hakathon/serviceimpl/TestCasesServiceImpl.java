package com.hakathon.serviceimpl;

import com.hakathon.entity.TestCases;
import com.hakathon.repository.TestCasesRepository;
import com.hakathon.service.TestCasesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestCasesServiceImpl implements TestCasesService {

    private final TestCasesRepository testCasesRepository;

    @Autowired
    public TestCasesServiceImpl(TestCasesRepository testCasesRepository) {
        this.testCasesRepository = testCasesRepository;
    }

    @Override
    public List<TestCases> getAllTestCases() {
        return testCasesRepository.findAll();
    }

    @Override
    public TestCases getTestCaseById(Long testCaseId) {
        Optional<TestCases> optionalTestCase = testCasesRepository.findById(testCaseId);
        return optionalTestCase.orElse(null);
    }

    @Override
    public boolean addTestCase(TestCases testCase) {
        // Add any validation or business logic here if needed
        testCasesRepository.save(testCase);
        return true;
    }

    @Override
    public boolean updateTestCase(TestCases testCase) {
        // Add any validation or business logic here if needed
        testCasesRepository.save(testCase);
        return true;
    }

    @Override
    public boolean deleteTestCase(Long testCaseId) {
        // Add any validation or business logic here if needed
        testCasesRepository.deleteById(testCaseId);
        return true;
    }
}
