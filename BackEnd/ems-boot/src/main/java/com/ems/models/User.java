package com.ems.models;

import com.ems.converter.PasswordConverter;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="user")
public class User {
	
	@Column(name="user_id")
	@GeneratedValue(generator = "sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(sequenceName = "auto_inc", name = "sequence", allocationSize = 1)
	@Id
	private String userId;
	
	@Column(name="first_name")
	@NotNull
	private String firstName;
	
	@Column(name="last_name")
	@NotNull
	private String lastName;
	
	@Column(name="username")
	@NotNull
	private String username;
	
	@Column(name="password")
	@Convert(converter=PasswordConverter.class)
	@NotNull
	private String password;
	
	@Column(name="dob")
	@Temporal(TemporalType.DATE)
	@NotNull
	private Date dob;
	
	@Column(name="gender")
	@NotNull
	private String gender;
	
	@Column(name="role")
	@NotNull
	private String role;
	
	@Column(name="department")
	private String department;
	
	@Column(name="address")
	@NotNull
	private String address;
	
	@Column(name="contact_no")
	@NotNull
	private String contactNo;
	
	public User() {}

	public User(String userId, @NotNull String firstName, @NotNull String lastName, @NotNull String username,
			@NotNull String password, @NotNull Date dob, @NotNull String gender, @NotNull String role,
			String department, @NotNull String address, @NotNull String contactNo) {
		this.userId = userId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.password = password;
		this.dob = dob;
		this.gender = gender;
		this.role = role;
		this.department = department;
		this.address = address;
		this.contactNo = contactNo;
	}
}