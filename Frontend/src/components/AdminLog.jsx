import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/admin_log.jpeg";

const AdminLog = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === 'admin' && password === 'password') {
            localStorage.setItem('isAuthenticated', true);
            navigate('/employee-list');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <div
                style={{
                    padding: '2rem',
                    border: '1px solid #ced4da',
                    borderRadius: '5px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    width: '400px'
                }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Admin Login</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', textAlign: 'left' }}>
                            Username:</label>
                        <input
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ced4da',
                                borderRadius: '5px'
                            }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', textAlign: 'left' }}>
                            Password:</label>
                        <input
                            type="password"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ced4da',
                                borderRadius: '5px'
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}>
                        Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLog