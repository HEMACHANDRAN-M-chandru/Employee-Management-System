import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeLogin = () => {
    const [emailId, setEmailId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:8080/login', {
          emailId,
          mobileNo
        });
  
        if (response.data.success) {
          localStorage.setItem('isEmployeeAuthenticated', true);
          navigate('/employee-dashboard');
        } else {
          setError('Invalid email or mobile number');
        }
      } catch (error) {
        setError('Failed to login. Please try again later.');
      }
    };
  
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h3 className="text-center">Employee Login</h3>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleLogin} className="border p-4 rounded bg-light shadow">
              <div className="mb-3">
                <label>Email ID</label>
                <input
                  type="email"
                  className="form-control"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

export default EmployeeLogin