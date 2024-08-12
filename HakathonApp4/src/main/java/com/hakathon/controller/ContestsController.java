package com.hakathon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hakathon.entity.Contests;
import com.hakathon.service.ContestsService;

@Controller
@RequestMapping("/contests")
public class ContestsController {

	@Autowired
	ContestsService contestsService;

	@GetMapping(value = "/getAllContests")
	public ResponseEntity<Object> getAllContests() {
		ResponseEntity<Object> entity = new ResponseEntity<>(contestsService.getAllContests(), HttpStatus.OK);
		return entity;
	
	}

	@GetMapping("/getContestById/{contestId}")
	public ResponseEntity<Object> getContestById(@PathVariable Long contestId) {
		
		ResponseEntity<Object> entity = new ResponseEntity<>(contestsService.getContestsByContestId(contestId), HttpStatus.OK);
		return entity;
	}

	@PostMapping(value = "/addContests")
	public ResponseEntity<Object> addContests(@RequestBody Contests contests) {
		
		System.out.println("contests= "+ contests);
		if (contestsService.addContests(contests)) {
			return new ResponseEntity<Object>("Contests added successfully" ,HttpStatus.OK);
		} else {
			return new ResponseEntity<Object>("Contests not added" ,HttpStatus.OK);
		}
	}

	@PutMapping("/updateContests/{contestId}")
	public ResponseEntity<Object> updateContests(@PathVariable Long contestId, @RequestBody Contests contests) {
		contests.setContestId(contestId);
		if (contestsService.updateContests(contests)) {
			return new ResponseEntity<Object>("Contests updated successfully" ,HttpStatus.OK);
		} else {
			return new ResponseEntity<Object>("Contests not updated" ,HttpStatus.OK);
		}
	}

	@DeleteMapping("/deleteContests/{contestId}")
	public ResponseEntity<Object> deleteContests(@PathVariable Long contestId) {
		if (contestsService.deleteContests(contestId)) {
			return new ResponseEntity<Object>("Contests deleted successfully" ,HttpStatus.OK);
		} else {
			return new ResponseEntity<Object>("Contests not deleted" ,HttpStatus.OK);
		}
	}
}
