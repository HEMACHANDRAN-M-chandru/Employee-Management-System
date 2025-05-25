import axios from "axios";

const API_URL = 'http://localhost:4041/api/employees';

export const getEmployees = () => 
    axios.get(`${API_URL}?timestamp=${new Date().getTime()}`);

export const getEmployeeById = (id) => 
    axios.get(`${API_URL}/${id}`);

export const getEmployeeByMobileOrEmail = async (mobileNo, emailId) => {
    try {
        const response = await axios.get(`${API_URL}/find`, { params: { mobileNo, emailId } });
        return response.data.length > 0 ? response.data[0] : null;  
    } catch (error) {
        return null; 
    }
};

export const addEmployee = async (employee) => {
    try {
        const existingEmployee = await getEmployeeByMobileOrEmail(employee.mobileNo, employee.emailId);
        if (existingEmployee) {
            throw new Error("Employee with this Mobile No or Email already exists.");
        }
        return await axios.post(API_URL, employee, { headers: { "Cache-Control": "no-cache" } });
    } catch (error) {
        throw error;
    }
};

export const updateEmployee = (id, employee) => 
    axios.put(`${API_URL}/${id}`, employee, { headers: { "Cache-Control": "no-cache" } });

export const deleteEmployee = (id) => 
    axios.delete(`${API_URL}/${id}`, { headers: { "Cache-Control": "no-cache" } });
