import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Prayer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    request: '',
  });
  const [user, setUser] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      axios
        .get(`https://phc-vfkt.onrender.com/users/${parsedUser.id}/`)
        .then((response) => {
          setUser(response.data);
          setFormData((prev) => ({
            ...prev,
            name: response.data.name || '',
            mobile: response.data.phone || '',
          }));
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }
  }, []);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🚫 Check login before submit
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      mobile: formData.mobile,
      message: formData.request,
    };

    emailjs
      .send(
        'service_e4rm8pc',
        'template_8gc4u4s',
        templateParams,
        'bRpMi0KcUyKHKVH7S'
      )
      .then(() => {
        setFormData({ name: '', mobile: '', request: '' });
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 3000);
      })
      .catch((error) => {
        console.error('FAILED...', error);
        alert('Something went wrong. Please try again.');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 to-white py-12 px-4 relative">
      <motion.div
        className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-6 text-center">
          Submit Your Prayer Request 🙏
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Our prayer team would love to stand with you in prayer.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={handleChange('name')}
              required
              className="w-full border rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={handleChange('mobile')}
              required
              pattern="[0-9]{10}"
              className="w-full border rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Prayer Request</label>
            <textarea
              rows="4"
              value={formData.request}
              onChange={handleChange('request')}
              required
              className="w-full resize-none border rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-red-400"
            ></textarea>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-red-700 text-white font-semibold py-3 rounded-xl hover:bg-red-800 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Submit Request
          </motion.button>
        </form>
      </motion.div>

      {/* ✅ Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-xl shadow-lg z-50 flex items-center space-x-3"
          >
            <div className="text-xl">✅</div>
            <div className="text-lg font-semibold">Prayer Request Submitted Successfully</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ❌ Login Required Popup */}
      <AnimatePresence>
        {showLoginPopup && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="fixed top-28 left-1/2 transform -translate-x-1/2 bg-white border border-red-300 text-red-700 px-6 py-4 rounded-xl shadow-xl z-50"
          >
            <p className="text-lg font-semibold mb-3">You must be logged in to submit a prayer request.</p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/login')}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Go to Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Prayer;
