package com.hakathon.controller;

import com.hakathon.entity.TestCases;
import com.hakathon.service.TestCasesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/testcases")
public class TestCasesController {

    private final TestCasesService testCasesService;

    @Autowired
    public TestCasesController(TestCasesService testCasesService) {
        this.testCasesService = testCasesService;
    }

    @GetMapping("/getAllTestCases")
    public List<TestCases> getAllTestCases() {
        return testCasesService.getAllTestCases();
    }

    @GetMapping("/getTestCaseById/{testCaseId}")
    public TestCases getTestCaseById(@PathVariable Long testCaseId) {
        return testCasesService.getTestCaseById(testCaseId);
    }

    @PostMapping("/addTestCase")
    public boolean addTestCase(@RequestBody TestCases testCase) {
        return testCasesService.addTestCase(testCase);
    }

    @PutMapping("/updateTestCase")
    public boolean updateTestCase(@RequestBody TestCases testCase) {
        return testCasesService.updateTestCase(testCase);
    }

    @DeleteMapping("/deleteTestCase/{testCaseId}")
    public boolean deleteTestCase(@PathVariable Long testCaseId) {
        return testCasesService.deleteTestCase(testCaseId);
    }
}
