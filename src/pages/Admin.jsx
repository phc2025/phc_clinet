// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    } else {
      navigate('/login'); // redirect if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-red-700 mb-8">
        Welcome to Your Admin Dashboard
      </h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <Link to="/users" className="bg-white shadow-md rounded-xl p-6 text-center hover:bg-red-100 transition">
          <h3 className="text-lg font-semibold text-red-700">Users</h3>
        </Link>

        <Link to="/helpingmanage" className="bg-white shadow-md rounded-xl p-6 text-center hover:bg-red-100 transition">
          <h3 className="text-lg font-semibold text-red-700">Helping Hand</h3>
        </Link>

        <Link to="/donatemanage" className="bg-white shadow-md rounded-xl p-6 text-center hover:bg-red-100 transition">
          <h3 className="text-lg font-semibold text-red-700">Donate</h3>
        </Link>

        <Link to="/timemanage" className="bg-white shadow-md rounded-xl p-6 text-center hover:bg-red-100 transition">
          <h3 className="text-lg font-semibold text-red-700">Timings</h3>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-center text-red-700 mb-6">
          {admin?.type === 'admin' ? 'Admin Details' : 'Dashboard'}
        </h3>

        {admin ? (
          <div className="space-y-3 text-gray-800">
            <p><strong>Name:</strong> {admin.name}</p>
            <p><strong>Email:</strong> {admin.email}</p>
            <p><strong>Phone:</strong> {admin.phone}</p>
            <p><strong>Address:</strong> {admin.address}</p>
            <p><strong>Type:</strong> {admin.type}</p>

            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-700 text-white font-semibold py-2 px-4 rounded-xl hover:bg-red-800 transition duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading admin data...</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
