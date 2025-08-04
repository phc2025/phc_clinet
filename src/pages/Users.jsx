import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const apiBase = 'https://phc-vfkt.onrender.com/users';

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${apiBase}/`);
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCount = async () => {
    try {
      const res = await axios.get('https://phc-vfkt.onrender.com/count/');
      setUserCount(res.data.user_count);
      console.log(res.data.user_count);
      
    } catch (err) {
      console.error('Failed to fetch user count:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchUserCount();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, phone: user.phone });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${apiBase}/${editingUser.id}/`, formData);
      fetchUsers();
      setEditingUser(null);
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${apiBase}/${id}/`);
        fetchUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  return (
       <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      {/* Navigation Links */}
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

      {/* Summary Section */}
      <h2 className="text-4xl font-bold text-center text-red-700 mb-10">Registered Users</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        {[
          { label: 'Total Users', value: userCount, color: 'text-green-600' },
          { label: 'Donations', value: '₹0', color: 'text-blue-600' },
          { label: 'Pending Requests', value: '0', color: 'text-yellow-600' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">{item.label}</h3>
            <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* User List or Loader */}
      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-xl shadow p-5 relative">
              <div className="flex flex-col gap-1 mb-4">
                <h4 className="text-lg font-bold text-gray-800">{user.name}</h4>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="flex items-center gap-1 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded"
                  onClick={() => handleEdit(user)}
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  <TrashIcon className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded"
              placeholder="Email"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-2 border rounded"
              placeholder="Phone"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setEditingUser(null)}
                className="mr-3 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
