package com.hakathon.service;

import org.springframework.stereotype.Service;

import com.hakathon.entity.Admin;


@Service
public interface AdminService {
	
	boolean findAdmin(Admin admin);

}
