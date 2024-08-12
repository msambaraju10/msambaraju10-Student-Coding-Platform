package com.hakathon.controller;

import com.hakathon.entity.ContestRegistrations;
import com.hakathon.service.ContestRegistrationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contestRegistrations")
public class ContestRegistrationsController {

    @Autowired
    private ContestRegistrationsService contestRegistrationsService;

    @GetMapping("/getAllContestRegistrations")
    public ResponseEntity<List<ContestRegistrations>> getAllContestRegistrations() {
        List<ContestRegistrations> registrations = contestRegistrationsService.getAllContestRegistrations();
        
        return new ResponseEntity<>(registrations, HttpStatus.OK);
    }

    @GetMapping("/getContestRegistrationById/{registrationId}")
    public ResponseEntity<ContestRegistrations> getContestRegistrationById(@PathVariable Long registrationId) {
        ContestRegistrations registration = contestRegistrationsService.getContestRegistrationById(registrationId);
        if (registration != null) {
            return new ResponseEntity<>(registration, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/addContestRegistration")
    public ResponseEntity<String> addContestRegistration(@RequestBody ContestRegistrations contestRegistration) {
    	
    	Long contestId = contestRegistration.getContests().getContestId();
    	Long userId = contestRegistration.getUsers().getUserId();
    	if(contestRegistrationsService.existsByContestIdAndUserId(contestId,userId)) {
    		System.out.println("Contest registered already!!!");
    		return new ResponseEntity<>("Contest registered already!!!", HttpStatus.OK);
    	}
    	
    	
        if (contestRegistrationsService.addContestRegistration(contestRegistration)) {
            return new ResponseEntity<>("Contest registration successfully", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Contest registration Failed. Try again!!!", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/updateContestRegistration/{registrationId}")
    public ResponseEntity<String> updateContestRegistration(@PathVariable Long registrationId, @RequestBody ContestRegistrations contestRegistration) {
        if (contestRegistrationsService.isContestRegistrationExist(registrationId)) {
            contestRegistration.setRegistrationId(registrationId);
            if (contestRegistrationsService.updateContestRegistration(contestRegistration)) {
                return new ResponseEntity<>("Contest registration updated successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Failed to update contest registration", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>("Contest registration not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteContestRegistration/{registrationId}")
    public ResponseEntity<String> deleteContestRegistration(@PathVariable Long registrationId) {
        if (contestRegistrationsService.isContestRegistrationExist(registrationId)) {
            if (contestRegistrationsService.deleteContestRegistration(registrationId)) {
                return new ResponseEntity<>("Contest registration deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Failed to delete contest registration", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>("Contest registration not found", HttpStatus.NOT_FOUND);
        }
    }
}
