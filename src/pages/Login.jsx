import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    type: 'user' // Default type
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://phc-vfkt.onrender.com/login/', formData);

      if (res.status === 200) {
        setMessage('Login successful!');
        
        

        if (res.data.type === 'admin') {
          localStorage.setItem("admin", JSON.stringify(res.data));
          navigate('/admin');
        } else {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate('/dashboard');
        }
      } else {
        setMessage('Login failed!');
      }
    } catch (err) {
      console.error(err);
      setMessage('User not registered or invalid credentials.');
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 to-red-300 px-4">
      <motion.div
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-red-700 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Login to PHC Church
        </motion.h2>

        {message && (
          <p className="mt-4 text-center text-sm text-green-900 font-bold border-2 rounded-2xl p-2">
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">User Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={inputClass}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-red-700 text-white font-semibold py-2 px-4 rounded-xl hover:bg-red-800 transition duration-300 shadow-sm"
          >
            Login
          </motion.button>

          <div className="text-center mt-4">
            <span className="text-sm">Not registered? </span>
            <Link to="/register" className="text-red-600 font-semibold hover:underline">
              Register
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;

const inputClass = `mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200`;
