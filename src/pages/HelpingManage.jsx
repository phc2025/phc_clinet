import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HelpingManager = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get('https://phc-vfkt.onrender.com/helping/');
      setData(res.data);
    } catch (err) {
      alert('Error fetching data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete('https://phc-vfkt.onrender.com/helping/', { data: { id } });
      fetchData();
    } catch (err) {
      alert('Error deleting entry');
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-pink-100">
      
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
        className="text-4xl font-extrabold text-center text-indigo-800 mb-10 drop-shadow"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🙏 Helping Hand Submissions
      </motion.h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No entries found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white shadow-xl rounded-2xl p-5 flex flex-col justify-between hover:shadow-2xl transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-indigo-700">{item.name}</h2>
                <p className="text-gray-700"><span className="font-semibold">📧 Email:</span> {item.email}</p>
                <p className="text-gray-700"><span className="font-semibold">📞 Phone:</span> {item.phone}</p>

                {item.image && (
                  <div className="mt-3">
                    <img
                      src={`https://phc-vfkt.onrender.com${item.image}`}
                      alt="Uploaded"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(item.id)}
                className="mt-5 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
              >
                🗑️ Delete Entry
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpingManager;
