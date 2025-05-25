import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, getEmployees } from "../service";
import { Button, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const fetchEmployees = useCallback(async () => {
        try {
            const { data } = await getEmployees();
            setEmployees([...data]); 
            setFilteredEmployees([...data]); 
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const filterEmployees = useCallback(() => {
        const searchLower = searchText.toLowerCase();
        setFilteredEmployees(
            employees.filter((employee) =>
                employee.employeeId.toLowerCase().includes(searchLower) ||
                employee.empname.toLowerCase().includes(searchLower) ||
                employee.department.toLowerCase().includes(searchLower)
            )
        );
    }, [searchText, employees]);

    useEffect(() => {
        filterEmployees();
    }, [filterEmployees]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await deleteEmployee(id);
                fetchEmployees(); 
            } catch (error) {
                console.error("Error deleting employee:", error);
            }
        }
    };

    const handleUpdateClick = (employee) => {
        setSelectedEmployee(employee);
        setShowUpdateModal(true);
    };

    return (
        <div>
            <div className="container">
                <div className="text-center my-3">
                    <h2 className="display-5 font-weight-bold text-uppercase">Employee List</h2>
                </div>

                <div className="row mb-3 d-flex align-items-center">
                    <div className="col-md-2">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setShowAddModal(true)}
                            fullWidth
                        >
                            Add Employee
                        </Button>
                    </div>
                    <div className="col-md-2">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleLogout}
                            fullWidth
                        >
                            Logout
                        </Button>
                    </div>
                    <div className="col-md-2">
                        <TextField
                            fullWidth
                            // label="Search"
                            value={searchText}
                            onChange={handleSearchChange}
                            // margin="dense"
                            variant="outlined"
                            sx={{
                                height: "25px", "& .MuiInputBase-root": { height: "35px" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "black" }, 
                                    "&:hover fieldset": { borderColor: "darkblue" },
                                    "&.Mui-focused fieldset": { borderColor: "green" }, 
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Email Id</th>
                                <th>Mobile No</th>
                                <th>Department</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((employee, index) => (
                                <tr key={employee.id}>
                                    <td>{index + 1}</td>
                                    <td>{employee.employeeId}</td>
                                    <td>{employee.empname}</td>
                                    <td>{employee.emailId}</td>
                                    <td>{employee.mobileNo}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.location}</td>
                                    <td>
                                        <div className="d-flex gap-2 flex-wrap justify-content-center">
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                onClick={() => handleUpdateClick(employee)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleDelete(employee.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Modal.Header closeButton={false}>
                    <Modal.Title className="mb-1">Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddEmployee closeModal={() => setShowAddModal(false)} fetchEmployees={fetchEmployees} />
                </Modal.Body>
            </Modal>

            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
                <Modal.Header closeButton={false}>
                    <Modal.Title className="mb-1">Update Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEmployee && (
                        <UpdateEmployee
                            employee={selectedEmployee}
                            closeModal={() => {
                                setShowUpdateModal(false);
                                fetchEmployees(); 
                            }}
                            fetchEmployees={fetchEmployees}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};


export default EmployeeList