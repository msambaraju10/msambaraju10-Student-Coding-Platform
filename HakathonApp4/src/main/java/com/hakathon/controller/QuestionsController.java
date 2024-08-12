package com.hakathon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hakathon.entity.Questions;
import com.hakathon.service.QuestionsService;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionsController {

    private final QuestionsService questionsService;

    @Autowired
    public QuestionsController(QuestionsService questionsService) {
        this.questionsService = questionsService;
    }

    @GetMapping("/getAllQuestions")
    public List<Questions> getAllQuestions() {
        return questionsService.getAllQuestions();
    }

    @GetMapping("/getQuestionsByContestId/{contestId}")
    public List<Questions> getQuestionsByContestId(@PathVariable Long contestId) {
        return questionsService.getQuestionsByContestId(contestId);
    }

    @GetMapping("/getQuestionById/{questionId}")
    public Questions getQuestionById(@PathVariable Long questionId) {
        return questionsService.getQuestionById(questionId);
    }

    @PostMapping("/addQuestion")
    public boolean addQuestion(@RequestBody Questions question) {
        return questionsService.addQuestion(question);
    }

    @PutMapping("/updateQuestion")
    public boolean updateQuestion(@RequestBody Questions question) {
        return questionsService.updateQuestion(question);
    }

    @DeleteMapping("/deleteQuestion/{questionId}")
    public boolean deleteQuestion(@PathVariable Long questionId) {
        return questionsService.deleteQuestion(questionId);
    }
}