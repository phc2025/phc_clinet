import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HelpingHand = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    image: null,
  });
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [confirmedPayment, setConfirmedPayment] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);


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
            phone: response.data.phone || '',
          }));
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser();
  }, [ ]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

 
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user) {
    setShowLoginModal(true);
    return;
  }

  if (!confirmedPayment) {
    alert("Please confirm you've paid ₹100 before submitting.");
    return;
  }

  // Basic validation
  if (!formData.name || !formData.phone || !formData.email) {
    alert("Please fill in all required fields.");
    return;
  }

  const data = new FormData();
  data.append('user', user.id);  // Important for Django ForeignKey
  data.append('name', formData.name);
  data.append('phone', formData.phone);
  data.append('email', formData.email);
  
  if (formData.image instanceof File) {
    data.append('image', formData.image);
  }

  try {
    const res = await axios.post(
      `https://phc-vfkt.onrender.com/helping/`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (res.status === 201) {
      setMessage('Thank you for supporting Helping Hand!');
      setFormData({ name: '', phone: '', email: '', image: null });
      setConfirmedPayment(false);
    }
  } catch (err) {
    console.error('Submission error:', err.response?.data || err.message);
    setMessage('Something went wrong. Please try again.');
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-50 to-rose-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <motion.h2
          className="text-3xl font-bold text-red-700 mb-6 text-center"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Helping Hands – ₹100 Monthly Support
        </motion.h2>

        <p className="text-gray-600 mb-6 text-center">
          Every member is requested to contribute ₹100 per month to support the unhealthy and needy members of our church family. Your small help can make a big difference. ❤️
        </p>

        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Document (optional)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          {/* UPI QR Section */}
          <div className="bg-slate-100 p-6 rounded-xl shadow-lg max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-center">Complete Your Payment</h3>
            <div className="text-center">
              <p className="text-red-700 text-xl mb-2 font-bold">Pay ₹100 to PHC CHURCH</p>
              <p className="text-sm text-gray-700 mb-4">Scan the QR code with PhonePe, GPay, Paytm, etc.</p>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=sabu.kallidakuzhiyil@ybl&pn=EasyHomes&am=100&cu=INR&tn=HelpingHand"
                alt="UPI QR"
                className="mx-auto w-52 h-52 rounded-xl shadow-md border border-gray-300"
              />
              <p className="mt-4">
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
          </div>

          {/* Confirmation checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="confirm"
              checked={confirmedPayment}
              onChange={() => setConfirmedPayment(!confirmedPayment)}
              className="w-4 h-4 text-red-600"
              required
            />
            <label htmlFor="confirm" className="text-sm text-gray-700">
              I confirm I have paid ₹100 via UPI.
            </label>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            disabled={!confirmedPayment}
          >
            Submit Pledge
          </motion.button>

          {message && (
            <p className="text-center text-green-600 font-medium mt-4">{message}</p>
          )}
        </form>
      </div>

      {/* 🔒 Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="fixed top-28 left-1/2 transform -translate-x-1/2 bg-white border border-red-300 text-red-700 px-6 py-4 rounded-xl shadow-xl z-50"
          >
            <p className="text-lg font-semibold mb-3">You must be logged in to submit.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/login')}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Go to Login
              </button>
              <button
                onClick={() => setShowLoginModal(false)}
                className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HelpingHand;
