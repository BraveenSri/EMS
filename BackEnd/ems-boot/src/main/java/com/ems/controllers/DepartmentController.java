package com.ems.controllers;

import com.ems.models.Department;
import com.ems.repositories.DepartmentRepository;
import java.util.ArrayList;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ems/departments")
@CrossOrigin(origins="http://localhost:4200")
public class DepartmentController {
	
	private static Logger log = LogManager.getLogger(DepartmentController.class.getName());

	private DepartmentRepository departmentRepository;
	
	public DepartmentController(DepartmentRepository departmentRepository) {
		this.departmentRepository = departmentRepository;
	}
	
	@GetMapping()
	public List<Department> getDepartments() {
		List<Department> departments = new ArrayList<>();
		try {
			departmentRepository.findAll().forEach(departments::add);
			log.info("Department details are successfully retrieved.");
		} catch (Exception e) {
			log.error("Error occured while retrieving Department details from the database." + e.getMessage());
		}
		return departments;
	}
	
	@PostMapping()
	public Department addDepartment(@RequestBody Department department) {
		try {
			log.info("Department detail is successfully added to the database.");
			return departmentRepository.save(department);
		} catch (Exception e) {
			log.error("Error occured while adding Department to the database." + e.getMessage());
			return null;
		}
	}
}