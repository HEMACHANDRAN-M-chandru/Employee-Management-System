package com.example.employeemanagementsystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.employeemanagementsystem.model.*;
import com.example.employeemanagementsystem.repository.*;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private EntityManager entityManager;

	// Get all employees
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}

	// Get employee by ID
	public Optional<Employee> getEmployeeById(Long id) {
		return employeeRepository.findById(id);
	}

	// Add a new employee
	public Employee addEmployee(Employee employee) {
		// Fetch existing employees with the same email or mobile
		List<Employee> existingEmployees = employeeRepository.findByMobileNoOrEmailId(employee.getEmailId(),
				employee.getMobileNo());

		if (!existingEmployees.isEmpty()) {
			throw new RuntimeException("Employee already exists with email: " + employee.getEmailId() + " or mobile: "
					+ employee.getMobileNo());
		}

		// Generate a unique employee ID before saving
		String generatedId = generateEmployeeId();
		employee.setEmployeeId(generatedId);

		// Save the employee to the repository
		return employeeRepository.save(employee);
	}

	// Update employee details
	public Employee updateEmployee(Long id, Employee employeeDetails) {
		// Check if employee exists
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Employee not found with id :" + id));

		// Update the employee fields
		employee.setEmpname(employeeDetails.getEmpname());
		employee.setEmailId(employeeDetails.getEmailId());
		employee.setDepartment(employeeDetails.getDepartment());
		employee.setLocation(employeeDetails.getLocation());

		// Save updated employee
		return employeeRepository.save(employee);
	}

	// Delete an employee
	@Transactional
	public void deleteEmployee(Long id) {
		// Ensure employee exists
		if (!employeeRepository.existsById(id)) {
			throw new EntityNotFoundException("Employee not found with ID: " + id);
		}

		// Delete employee
		employeeRepository.deleteById(id);

		// Reset auto-increment value after deletion
		resetAutoIncrement();
	}

	// Reset the auto-increment value after deletion
	@Transactional
	public void resetAutoIncrement() {
		try {

			entityManager.createNativeQuery("ALTER TABLE employee DROP PRIMARY KEY, MODIFY id INT;").executeUpdate();
			entityManager.createNativeQuery("SET @new_id = 0;").executeUpdate();
			entityManager.createNativeQuery("UPDATE employee SET id = (@new_id := @new_id + 1);").executeUpdate();
			entityManager.createNativeQuery("ALTER TABLE employee MODIFY id INT PRIMARY KEY AUTO_INCREMENT;")
					.executeUpdate();

		} catch (Exception e) {

			throw new RuntimeException("Error resetting auto-increment value: " + e.getMessage());
		}
	}

	
	public String generateEmployeeId() {
		// Generate ID based on timestamp (example: EMP-20250218-123456)
		long timestamp = System.currentTimeMillis();
		String employeeId = "EMP-" + String.format("%010d", timestamp % 10000000000L);
		return employeeId;
	}
}

