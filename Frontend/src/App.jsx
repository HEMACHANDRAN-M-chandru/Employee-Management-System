import React from 'react'
import "./App.css";
import { Navigate, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import EmployeeLogin from './components/EmployeeLogin';
import AdminLog from './components/AdminLog';

const App = () => {
   return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<AdminLog />} />
        <Route path='/employee-login' element={<EmployeeLogin />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/update/:id" element={<UpdateEmployee />} />
      </Routes>
    </div>

    // <div className="App">
    //   <Routes>
    //     <Route path="/" element={<Navigate to="/login" />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/employee-list" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
    //     <Route path="/add" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
    //     <Route path="/update/:id" element={<ProtectedRoute><UpdateEmployee /></ProtectedRoute>} />
    //   </Routes>
    // </div>
  );
};


export default App