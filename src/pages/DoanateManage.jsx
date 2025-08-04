import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const types = ['All', 'Clothes', 'Books', 'Money', 'Food'];

const DonateManage = () => {
  const [donations, setDonations] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editData, setEditData] = useState({
    id: '',
    name: '',
    email: '',
    amount: '',
    type: '',
    Describe: ''
  });
  const [activeType, setActiveType] = useState('All');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchDonations = async () => {
    try {
      const res = await axios.get('https://phc-vfkt.onrender.com/donate/');
      setDonations(res.data);
    } catch (err) {
      console.error('Error fetching donations');
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const showMessage = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this donation?')) return;
    try {
      await axios.delete('https://phc-vfkt.onrender.com/donate/', { data: { id } });
      setDonations((prev) => prev.filter((item) => item.id !== id));
      showMessage('Donation deleted successfully.');
    } catch (err) {
      showMessage('Error deleting donation.');
    }
  };

  const openEdit = (donation) => {
    setEditItem(donation.id);
    setEditData({
      id: donation.id,
      name: donation.name,
      email: donation.email,
      amount: donation.amount,
      type: donation.type,
      Describe: donation.Describe || '',
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put('https://phc-vfkt.onrender.com/donate/', editData);
      setDonations((prev) =>
        prev.map((item) => (item.id === editData.id ? { ...editData } : item))
      );
      setEditItem(null);
      showMessage('Donation updated successfully.');
    } catch (err) {
      showMessage('Error updating donation.');
    }
  };

  const filteredDonations =
    activeType === 'All'
      ? donations
      : donations.filter((d) => d.type.toLowerCase() === activeType.toLowerCase());

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-yellow-50 via-white to-blue-50">
      
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

      <motion.h1
        className="text-4xl font-extrabold text-center text-blue-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        💝 Manage Donations
      </motion.h1>

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            key="msg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 text-center text-white bg-green-600 px-4 py-2 rounded shadow-md max-w-xl mx-auto"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-3 mb-8">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              activeType === type
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Donation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredDonations.map((donation) => (
            <motion.div
              key={donation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold text-indigo-700 mb-1">{donation.name}</h2>
                <p className="text-sm text-gray-600 mb-1">📧 {donation.email}</p>
                <p className="text-sm text-gray-700 mb-1">💰 ₹{donation.amount}</p>
                <p className="text-sm text-gray-600 mb-1">
                  🏷️ <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs">{donation.type}</span>
                </p>
                <p className="text-sm text-gray-800 mt-2"><strong>📜 Description:</strong> {donation.Describe}</p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => openEdit(donation)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(donation.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  🗑️ Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <motion.div
            className="bg-white p-6 rounded-xl w-[90%] max-w-lg shadow-2xl"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Edit Donation</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                placeholder="Name"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleEditChange}
                placeholder="Email"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="amount"
                value={editData.amount}
                onChange={handleEditChange}
                placeholder="Amount"
                className="w-full border px-3 py-2 rounded"
              />
              <select
                name="type"
                value={editData.type}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Type</option>
                {types.filter(t => t !== 'All').map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <textarea
                name="Describe"
                value={editData.Describe}
                onChange={handleEditChange}
                placeholder="Description"
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setEditItem(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Update
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DonateManage;
