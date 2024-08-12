package com.hakathon.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hakathon.entity.Users;
import com.hakathon.repository.UsersRepository;
import com.hakathon.service.UsersService;

import java.util.List;
import java.util.Optional;

@Service
public class UsersServiceImpl implements UsersService {

	@Autowired
	private UsersRepository usersRepository;

	@Override
	public Users getUserByEmailAndPass(String email, String password) {
		Optional<Users> user = usersRepository.findUserByEmailAndPass(email, password);
		return user.orElse(null);
	}

	@Override
	public boolean findUser(Long userId) {
		return usersRepository.existsById(userId);
	}

	@Override
	public boolean addUser(Users user) {
		if (!isUserExist(user.getUserId())) {
			usersRepository.save(user);
			return true;
		}
		return false;
	}

	@Override
	public List<Users> getAllUsers() {
		return usersRepository.findAll();
	}

	@Override
	public boolean isUserExist(Long userId) {
		return usersRepository.existsById(userId);
	}

	@Override
	public Users getUserByUserId(Long userId) {
		return usersRepository.findById(userId).orElse(null);
	}

	@Override
	public boolean deleteUser(Long userId) {
		if (isUserExist(userId)) {
			usersRepository.deleteById(userId);
			return true;
		}
		return false;
	}

	@Override
	public boolean updateUser(Users user) {
		if (isUserExist(user.getUserId())) {
			usersRepository.save(user);
			return true;
		}
		return false;
	}

}
