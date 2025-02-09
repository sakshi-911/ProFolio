import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const res = await API.post('/auth/login', { email, password });
      const token = res.data.token; // extract token
      localStorage.setItem('token', token);
      //
      console.log(email, password);
      console.log(token);
      ///
      onLogin(token); // Update navbar
      navigate('/admin');
    } catch (err) {
      console.log(err)
      
      setError(err.response?.data?.message || 'Login failed');
    } 
  };

  return (
    <div className="login-page container mx-auto p-8 max-w-md bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">Login</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleLogin} action="#" method="POST">
        <input
          type="email"
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          autoComplete="username" // Autocomplete for email
        />
        <input
          type="password"
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          autoComplete="current-password" // Autocomplete for password
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-500 focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
