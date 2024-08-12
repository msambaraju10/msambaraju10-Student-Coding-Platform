package com.hakathon.serviceimpl;

import com.hakathon.entity.Questions;
import com.hakathon.repository.QuestionsRepository;
import com.hakathon.service.QuestionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionsServiceImpl implements QuestionsService {

    @Autowired
    private QuestionsRepository questionsRepository;

    @Override
    public List<Questions> getAllQuestions() {
        return questionsRepository.findAll();
    }

    @Override
    public List<Questions> getQuestionsByContestId(Long contestId) {
        return questionsRepository.findByContests_ContestId(contestId);
    }

    @Override
    public Questions getQuestionById(Long questionId) {
        Optional<Questions> optionalQuestion = questionsRepository.findById(questionId);
        return optionalQuestion.orElse(null);
    }

    @Override
    public boolean addQuestion(Questions question) {
        try {
            questionsRepository.save(question);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateQuestion(Questions question) {
        try {
            questionsRepository.save(question);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteQuestion(Long questionId) {
        try {
            questionsRepository.deleteById(questionId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
