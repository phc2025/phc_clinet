import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'money', label: 'Money' },
  { id: 'clothes', label: 'Clothes' },
  { id: 'books', label: 'Books' },
  { id: 'food', label: 'Food' },
];

const Donate = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('money');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    description: '',
    type: 'Money',
    file: null,
  });
  const [user, setUser] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleChange = (field) => (e) => {
    const value = field === 'file' ? e.target.files[0] : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          const response = await axios.get(`https://phc-vfkt.onrender.com/users/${parsedUser.id}/`);
          setUser(response.data);
          setFormData((prev) => ({
            ...prev,
            name: response.data.name || '',
            email: response.data.email || '',
          }));
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    try {
      const data = new FormData();
      data.append('user', user.id);
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('type', formData.type);

      if (selected === 'money') {
        data.append('amount', formData.amount);
      } else {
        data.append('description', formData.description);
      }

      if (formData.file) {
        data.append('file', formData.file);
      }

      // Debug: log formData entries
      for (let pair of data.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      await axios.post('https://phc-vfkt.onrender.com/donate/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setShowSuccessMessage(true);
      setFormData((prev) => ({
        ...prev,
        amount: '',
        description: '',
        file: null,
      }));
    } catch (error) {
      console.error('Donation submission failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-red-700 mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Support PHC Church
        </motion.h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {categories.map((c) => {
            const active = selected === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelected(c.id);
                  setFormData((prev) => ({ ...prev, type: c.label }));
                }}
                className={[
                  'py-3 rounded-xl font-semibold transition border',
                  active
                    ? 'bg-red-700 text-white border-red-700 shadow-lg scale-105'
                    : 'bg-white text-red-700 border-red-300 hover:border-red-500 hover:shadow',
                ].join(' ')}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {showSuccessMessage && (
          <p className="text-center text-green-600 text-2xl font-bold mb-6">
            ✅ Thank you for your donation!
          </p>
        )}

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleChange('name')}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={handleChange('email')}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <AnimatePresence mode="wait">
              {selected === 'money' ? (
                <motion.div
                  key="money"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <label className="block text-sm font-medium text-gray-700">Amount (INR)</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    required
                    value={formData.amount}
                    onChange={handleChange('amount')}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <br />
                  <div className="bg-slate-100 p-6 rounded-xl shadow-lg">
                    <p className="text-sm text-gray-700 mb-4">
                      Scan QR with PhonePe, GPay, Paytm
                    </p>
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=sabu.kallidakuzhiyil@ybl&pn=EasyHomes&am=100&cu=INR&tn=HelpingHand"
                      alt="UPI QR"
                      className="mx-auto w-52 h-52 rounded-xl"
                    />
                    <p className="mt-4 text-sm">
                      Or{' '}
                      <a
                        href="upi://pay?pa=sabu.kallidakuzhiyil@ybl&pn=EasyHomes&am=100&cu=INR&tn=HelpingHand"
                        className="text-blue-600 underline"
                      >
                        tap here
                      </a>{' '}
                      to pay on mobile
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Optional Photo / List
                    </label>
                    <input
                      type="file"
                      name="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleChange('file')}
                      className="mt-1 w-full text-sm"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="nonmoney"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Describe the {formData.type}
                    </label>
                    <textarea
                      rows="3"
                      required
                      value={formData.description}
                      onChange={handleChange('description')}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md resize-y"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Optional Photo / List
                    </label>
                    <input
                      type="file"
                      name="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleChange('file')}
                      className="mt-1 w-full text-sm"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-red-700 text-white font-semibold py-3 rounded-xl"
            >
              {selected === 'money' ? 'Proceed to Payment' : `Submit ${formData.type} Donation`}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* 🔒 Login Required Modal */}
      {showLoginModal && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="fixed top-28 left-1/2 transform -translate-x-1/2 bg-white border border-red-300 text-red-700 px-6 py-4 rounded-xl shadow-xl z-50"
        >
          <p className="text-lg font-semibold mb-3">You must be logged in to submit a donation.</p>
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
    </div>
  );
};

export default Donate;
