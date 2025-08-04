import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {useNavigate} from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const [message, setMessage] = useState('');
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://phc-vfkt.onrender.com/register/', formData);

      if (res.status === 201 || res.status === 200) {
        setMessage('Registration successful!');
        navigate('/login')
        setFormData({ name: '', email: '', password: '', phone: '', address: '' });
      } else {
        setMessage('Registration failed.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error during registration.');
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
          Register at PHC Church
        </motion.h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={inputClass}
              required
            />
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
            <label className="block text-sm font-medium text-gray-700">Create Password</label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91-9876543210"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Church Road, Mumbai, MH"
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
            Register
          </motion.button>
        </form>

        {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
      </motion.div>
    </div>
  );
};

export default Register;

const inputClass = `mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200`;
