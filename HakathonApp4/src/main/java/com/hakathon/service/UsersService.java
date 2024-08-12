package com.hakathon.service;

import java.util.List;

import com.hakathon.entity.Users;

public interface UsersService {

    boolean findUser(Long userId);

    boolean addUser(Users user);

    List<Users> getAllUsers();

    boolean isUserExist(Long userId);

    Users getUserByUserId(Long userId);

    boolean deleteUser(Long userId);

    boolean updateUser(Users user);
    
    Users getUserByEmailAndPass(String email, String password);
    

}
