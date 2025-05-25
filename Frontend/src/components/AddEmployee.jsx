import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { addEmployee, getEmployeeByMobileOrEmail } from "../Service";
import { v4 as uuidv4 } from "uuid";

const AddEmployee = ({ closeModal, fetchEmployees }) => {
    const [employee, setEmployee] = useState({
        employeeId: `EMP-${uuidv4().slice(0, 10)}`,
        empname: "",
        emailId: "",
        mobileNo: "",
        department: "",
        location: "",
    });

    const [existingEmployee, setExistingEmployee] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [mobileError, setMobileError] = useState("");
    const [stringErrors, setStringErrors] = useState({ empname: "", department: "", location: "" });
    const navigate = useNavigate();

    const validateStringFields = (name, value) => {
        const regex = /^[A-Za-z\s]+$/;
        if (!regex.test(value)) {
            setStringErrors((prevErrors) => ({ ...prevErrors, [name]: "Only letters and spaces are allowed." }));
            return false;
        } else {
            setStringErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
            return true;
        }
    };

    const validateMobile = (mobile) => {
        const regex = /^[0-9]{10}$/;
        if (!regex.test(mobile)) {
            setMobileError("Mobile number must be 10 digits.");
            return false;
        } else {
            setMobileError("");
            return true;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleStringFieldChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
        validateStringFields(name, value);
    };

    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setEmployee((prev) => ({ ...prev, mobileNo: value }));
        if (value.length <= 10) {
            validateMobile(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateMobile(employee.mobileNo)) return;
        if (!validateStringFields("empname", employee.empname) ||
            !validateStringFields("department", employee.department) ||
            !validateStringFields("location", employee.location)) {
            return;
        }

        try {
            const existing = await getEmployeeByMobileOrEmail(employee.mobileNo, employee.emailId);
            if (existing) {
                setExistingEmployee(existing);
                setShowPopup(true);
                return;
            }

            await addEmployee(employee);
            closeModal();
            fetchEmployees();
            navigate("/employee-list");
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    return (
        <div style={{ position: "relative" }}>
            <form onSubmit={handleSubmit} style={{ zIndex: 1, position: "relative" }}>
                <TextField
                    fullWidth
                    label="Employee ID"
                    name="employeeId"
                    value={employee.employeeId}
                    disabled margin="dense"
                    autoComplete="off"
                />
                <TextField
                    fullWidth
                    label="Name"
                    name="empname"
                    value={employee.empname}
                    onChange={handleStringFieldChange}
                    required
                    margin="dense"
                    error={!!stringErrors.empname}
                    helperText={stringErrors.empname}
                    autoComplete="off"
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="emailId"
                    value={employee.emailId}
                    onChange={handleChange}
                    required
                    margin="dense"
                    autoComplete="off"
                />
                <TextField
                    fullWidth
                    label="Mobile No"
                    name="mobileNo"
                    value={employee.mobileNo}
                    onChange={handleMobileChange}
                    required
                    margin="dense"
                    error={!!mobileError}
                    helperText={mobileError}
                    autoComplete="off"
                />
                <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    value={employee.department}
                    onChange={handleStringFieldChange}
                    required
                    margin="dense"
                    error={!!stringErrors.department}
                    helperText={stringErrors.department}
                    autoComplete="off"
                />
                <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={employee.location}
                    onChange={handleStringFieldChange}
                    required
                    margin="dense"
                    error={!!stringErrors.location}
                    helperText={stringErrors.location}
                    autoComplete="off"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="mt-3 w-100"
                >
                    Add Employee
                </Button>
            </form>

            <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
                <DialogTitle>Employee Already Exists</DialogTitle>
                <DialogContent>
                    <p><strong>Emp.ID:</strong> {existingEmployee?.employeeId}</p>
                    <p><strong>Name:</strong> {existingEmployee?.empname}</p>
                    <p><strong>Email:</strong> {existingEmployee?.emailId}</p>
                    <p><strong>Mobile No:</strong> {existingEmployee?.mobileNo}</p>
                    <p><strong>Department:</strong> {existingEmployee?.department}</p>
                    <p><strong>Location:</strong> {existingEmployee?.location}</p>
                </DialogContent>
            </Dialog>
        </div>
    );
};
export default AddEmployee