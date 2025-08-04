import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Donateuser = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    if (!userId) {
      console.error('User ID not found in localStorage.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`https://phc-vfkt.onrender.com/donate/${userId}/`);
      setDonations(res.data);
      console.log(res.data);
    } catch (err) {
      console.error('Error fetching donations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
      <h2 className="text-3xl font-bold text-red-700 text-center mb-8">Your Donations</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading donations...</p>
      ) : donations.length === 0 ? (
        <p className="text-center text-gray-500">No donations found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {donations.map((donation) => (
            <div key={donation.id} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{donation.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Email:</strong> {donation.email}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Category:</strong> {donation.type || 'N/A'}
              </p>
              {donation.Describe && (
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Description:</strong> {donation.Describe}
                </p>
              )}
              {donation.amount !== null && (
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Amount:</strong> ₹{donation.amount}
                </p>
              )}
              {donation.image && (
                <img
                  src={donation.image}
                  alt="Donation"
                  className="mt-2 w-full h-40 object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Donateuser;
