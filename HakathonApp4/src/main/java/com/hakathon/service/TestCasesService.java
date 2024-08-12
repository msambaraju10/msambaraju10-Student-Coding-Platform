package com.hakathon.service;

import com.hakathon.entity.TestCases;

import java.util.List;

public interface TestCasesService {
    List<TestCases> getAllTestCases();
    TestCases getTestCaseById(Long testCaseId);
    boolean addTestCase(TestCases testCase);
    boolean updateTestCase(TestCases testCase);
    boolean deleteTestCase(Long testCaseId);
}
