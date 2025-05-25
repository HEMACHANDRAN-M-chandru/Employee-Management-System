package com.example.employeemanagementsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "employee")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "employee_id", unique = true, nullable = false, updatable = false)
	private String employeeId; 

	@Column(name = "employee_name", nullable = false)
	@NotBlank(message = "Employee name is required")
	@Size(min = 2, max = 50, message = "Employee name must be between 2 and 50 characters")
	private String empname;

	@Column(name = "email_id", unique = true, nullable = false)
	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	private String emailId;

	@Column(name = "mobile_no", unique = true, nullable = false)
	@NotBlank(message = "Mobile number is required")
	@Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be exactly 10 digits")
	private String mobileNo;

	@Column(nullable = false)
	@NotBlank(message = "Department is required")
	private String department;

	@Column(nullable = false)
	@NotBlank(message = "Location is required")
	private String location;

	public Employee() {
		
	}

	public Employee(String employeeId, String empname, String emailId, String mobileNo, String department,
			String location) {
		this.employeeId = employeeId;
		this.empname = empname;
		this.emailId = emailId;
		this.mobileNo = mobileNo;
		this.department = department;
		this.location = location;
	}

	public Long getId() {
		return id;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public String getEmpname() {
		return empname;
	}

	public void setEmpname(String empname) {
		this.empname = empname;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}
}
