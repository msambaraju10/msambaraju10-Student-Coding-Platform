package com.hakathon.service;

import com.hakathon.entity.Questions;

import java.util.List;

public interface QuestionsService {

    List<Questions> getAllQuestions();

    List<Questions> getQuestionsByContestId(Long contestId);

    Questions getQuestionById(Long questionId);

    boolean addQuestion(Questions question);

    boolean updateQuestion(Questions question);

    boolean deleteQuestion(Long questionId);
}
