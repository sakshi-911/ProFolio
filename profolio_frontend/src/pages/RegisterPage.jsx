import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../utils/api';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    API.post('/register', { name, email, password })
      .then((res) => {
        navigate('/login');
      })
      .catch((err) => setError(err.response?.data?.message || 'Registration failed'));
  };

  return (
    <div className="register-page container mx-auto p-8 max-w-md bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">Register</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <input
        type="text"
        className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleRegister}
        className="bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-500 focus:ring-2 focus:ring-green-400"
      >
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
