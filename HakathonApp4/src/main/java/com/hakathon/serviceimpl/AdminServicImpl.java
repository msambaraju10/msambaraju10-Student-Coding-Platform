package com.hakathon.serviceimpl;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hakathon.entity.Admin;
import com.hakathon.repository.AdminRepo;
import com.hakathon.service.AdminService;

@Service
public class AdminServicImpl implements AdminService{

	@Autowired
	AdminRepo adminRepo;
	
	@Override
	public boolean findAdmin(Admin admin) {
		Optional<Admin> adminObj = adminRepo.findById(admin.getUserName());
		
		if(adminObj.isPresent())
		{
			Admin obj = adminObj.get();
			String DBpass = obj.getPassword();
			if(DBpass.equals(admin.getPassword()))
			{
				return true;
			}else {
				return false;
			}
		}
		return false;
	}	
}


