import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { updateEmployee } from "../service";

const UpdateEmployee = ({ employee, closeModal }) => {
    const [updatedEmployee, setUpdatedEmployee] = useState({ ...employee });
    const [errors, setErrors] = useState({
        empname: "",
        department: "",
        location: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (["empname", "department", "location"].includes(name)) {
            const regex = /^[A-Za-z\s]+$/; // Only letters & spaces allowed
            setErrors((prev) => ({
                ...prev,
                [name]: regex.test(value) ? "" : "Only letters and spaces allowed",
            }));
        }

        setUpdatedEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(errors).some((error) => error)) return; 
        try {
            await updateEmployee(updatedEmployee.id, updatedEmployee);
            closeModal();
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control
                    type="text"
                    name="employeeId"
                    value={updatedEmployee.employeeId} // ✅ Ensure employeeId is used
                    readOnly // Employee ID is auto-generated & non-editable
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="empname"
                    value={updatedEmployee.empname}
                    onChange={handleChange}
                    required
                    isInvalid={!!errors.empname}
                />
                <Form.Control.Feedback type="invalid">{errors.empname}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email ID</Form.Label>
                <Form.Control type="email" name="emailId" value={updatedEmployee.emailId} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="text" name="mobileNo" value={updatedEmployee.mobileNo} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Control
                    type="text"
                    name="department"
                    value={updatedEmployee.department}
                    onChange={handleChange}
                    required
                    isInvalid={!!errors.department}
                />
                <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type="text"
                    name="location"
                    value={updatedEmployee.location}
                    onChange={handleChange}
                    required
                    isInvalid={!!errors.location}
                />
                <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-between">
                <Button type="submit" variant="primary">
                    Update Employee
                </Button>
                <Button variant="secondary" onClick={closeModal}>
                    Cancel
                </Button>
            </div>
        </Form>
    );
};


export default UpdateEmployee