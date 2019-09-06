package com.ems.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="department")
public class Department {
	@Column(name="department_id")
	@Id
	private String departmentId;
	
	@Column(name="name")
	@NotNull
	private String name;
	
	@Column(name="location")
	@NotNull
	private String location;

	public Department() {}

	public Department(String departmentId, @NotNull String name, @NotNull String location) {
		this.departmentId = departmentId;
		this.name = name;
		this.location = location;
	}
}