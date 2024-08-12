package com.hakathon.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hakathon.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Long>{

	  @Query("SELECT c FROM Users c WHERE c.email = :email AND c.password = :password")
	  Optional<Users> findUserByEmailAndPass(@Param("email") String email, @Param("password") String password);

}
