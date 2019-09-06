package com.ems.controllers;

import com.ems.models.User;
import com.ems.repositories.UserRepository;
import java.util.ArrayList;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ems/users")
@CrossOrigin(origins="http://localhost:4200")
public class UserController {
	
	private static Logger log = LogManager.getLogger(UserController.class.getName());
	
	private UserRepository userRepository;
	
	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@GetMapping()
	public List<User> getUsers() {
		List<User> users = new ArrayList<>();
		try {
			userRepository.findAll().forEach(users::add);
			log.info("User details are successfully retrieved.");
		} catch (Exception e) {
			log.error("Error occured while retrieving User details from the database." + e.getMessage());
		}
		return users;
	}
	
	@GetMapping("/{userId}")
	public User findByEmployeeId(@PathVariable String userId) {
		User user = null;
		try {
			user = userRepository.findByUserId(userId);
			if (user == null) {
				log.info("User does not exist.");
			} else {
				log.info("User exists.");
			}
		} catch (Exception e) {
			log.error("Error occured while searching for User." + e.getMessage());
		}
		return user;
	}
	
	@GetMapping("/{username}")
	public User findByUsername(@PathVariable String username) {
		User user = null;
		try {
			user = userRepository.findByUsername(username);
			if (user == null) {
				log.info("User username does not exist.");
			} else {
				log.info("User username exists.");
			}
		} catch (Exception e) {
			log.error("Error occured while searching for User." + e.getMessage());
		}
		return user;
	}
	
	@PostMapping()
	public User addOrUpdateUser(@RequestBody User user) {
		try {
			log.info("User is successfully added to the database.");
			return userRepository.save(user);
		} catch (Exception e) {
			log.error("Error occured while adding User to the database." + e.getMessage());
			return null;
		}
	}
	
	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable String userId) {
		try {
			userRepository.deleteById(userId);
			log.info("User is successfully deleted.");
		} catch (Exception e) {
			log.error("Error occured while deleting User." + e.getMessage());
		}
	}
}
