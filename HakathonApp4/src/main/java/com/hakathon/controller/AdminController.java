package com.hakathon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hakathon.entity.Admin;
import com.hakathon.service.AdminService;


@RestController
public class AdminController {

	@Autowired
	AdminService adminService;
	
	@PostMapping(value = "/adminLogin")
	public ResponseEntity<Object> adminLogin(@RequestBody Admin admin)
	{
		boolean flag = adminService.findAdmin(admin);
		return new ResponseEntity<Object>(flag, HttpStatus.OK);
	}
	
}
