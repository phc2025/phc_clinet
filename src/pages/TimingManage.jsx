import React, { useState, useEffect } from 'react';
import { CalendarIcon, ClockIcon, PencilIcon, PlusIcon, XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TimingManager = () => {
  const [schedule, setSchedule] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    day: '',
    startTime: '',
    endTime: '',
    description: ''
  });

  const [editForm, setEditForm] = useState({
    day: '',
    startTime: '',
    endTime: '',
    description: ''
  });

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const res = await axios.get('https://phc-vfkt.onrender.com/timingsdata/');
      setSchedule(res.data);
    } catch (err) {
      console.error('Error fetching schedule', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://phc-vfkt.onrender.com/timingdata/${id}/`);
      setSchedule(schedule.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting item', err);
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://phc-vfkt.onrender.com/timingdata/${editingId}/`, editForm);
      setEditingId(null);
      fetchSchedule();
    } catch (err) {
      console.error('Error updating item', err);
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://phc-vfkt.onrender.com/timings/', formData);
      setFormData({ day: '', startTime: '', endTime: '', description: '' });
      setShowModal(false);
      fetchSchedule();
    } catch (err) {
      console.error('Error adding timing', err);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-100 via-white to-pink-100 min-h-screen">
      
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

      <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8 drop-shadow">⛪ Church Timetable Manager</h1>

      {/* Add Entry Button */}
      <div className="text-center mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-lg hover:bg-indigo-700 flex items-center justify-center mx-auto gap-2 font-semibold"
        >
          <PlusIcon className="w-5 h-5" /> Add Timetable Entry
        </motion.button>
      </div>

      {/* Timetable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {schedule.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-xl shadow-md p-5 transition hover:shadow-xl border border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {editingId === item.id ? (
              <div className="space-y-2">
                <input name="day" value={editForm.day} onChange={handleEditChange} className="w-full px-3 py-2 border rounded" />
                <input type="time" name="startTime" value={editForm.startTime} onChange={handleEditChange} className="w-full px-3 py-2 border rounded" />
                <input type="time" name="endTime" value={editForm.endTime} onChange={handleEditChange} className="w-full px-3 py-2 border rounded" />
                <input name="description" value={editForm.description} onChange={handleEditChange} className="w-full px-3 py-2 border rounded" />
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-lg font-semibold text-indigo-700">{item.day}</p>
                <p><span className="text-green-600 font-medium">Start:</span> {item.startTime}</p>
                <p><span className="text-red-600 font-medium">End:</span> {item.endTime}</p>
                <p className="text-gray-700">{item.description}</p>
              </div>
            )}

            <div className="mt-4 flex justify-end gap-3">
              {editingId === item.id ? (
                <button onClick={handleUpdate} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">💾 Save</button>
              ) : (
                <button onClick={() => handleEditClick(item)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md">✏️ Edit</button>
              )}
              <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">🗑️ Delete</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Form */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative space-y-4"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-center text-indigo-700">Add New Timetable Entry</h2>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> Day</label>
                <select name="day" value={formData.day} onChange={handleAddChange} required className="w-full px-3 py-2 border rounded">
                  <option value="">Select Day</option>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold flex items-center gap-1"><ClockIcon className="w-4 h-4 text-green-600" /> Start Time</label>
                <input type="time" name="startTime" value={formData.startTime} onChange={handleAddChange} required className="w-full px-3 py-2 border rounded" />
              </div>

              <div>
                <label className="text-sm font-semibold flex items-center gap-1"><ClockIcon className="w-4 h-4 text-red-600" /> End Time</label>
                <input type="time" name="endTime" value={formData.endTime} onChange={handleAddChange} required className="w-full px-3 py-2 border rounded" />
              </div>

              <div>
                <label className="text-sm font-semibold flex items-center gap-1"><PencilIcon className="w-4 h-4 text-purple-600" /> Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleAddChange} placeholder="e.g. Bible Study" required className="w-full px-3 py-2 border rounded" />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg"
              >
                ➕ Add Entry
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default TimingManager;
