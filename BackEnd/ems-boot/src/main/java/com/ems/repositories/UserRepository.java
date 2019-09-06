package com.ems.repositories;

import com.ems.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
	
	public User findByUserId(String userId);
	public User findByUsername(String username);
	public void deleteById(String userId);

}