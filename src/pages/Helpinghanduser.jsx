import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { HandCoins } from 'lucide-react';

const Helpinghanduser = () => {
  const { id: userId } = useParams();  // renamed for clarity
  const [helpings, setHelpings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!userId) {
      console.log("No user ID in route params");
      return;
    }

    axios.get(`https://phc-vfkt.onrender.com/helping/${userId}/`)
      .then((res) => {
        setHelpings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching helping hand data:", err);
      });
  }, [userId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Helping Hand Entries</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-10">
        <Link
          to="/donateuser"
          className="bg-red-50 hover:bg-red-100 rounded-xl p-6 shadow-md flex items-center space-x-4 transition duration-300"
        >
          <HandCoins className="text-red-600 w-8 h-8" />
          <div>
            <h3 className="text-xl font-semibold text-red-700">Donations</h3>
            <p className="text-sm text-gray-500">Support by contributing</p>
          </div>
        </Link>

        <Link
          to={`/helpinghanduser/${user?.id}`}
          className="bg-red-50 hover:bg-red-100 rounded-xl p-6 shadow-md flex items-center space-x-4 transition duration-300"
        >
          <div>
            <h3 className="text-xl font-semibold text-red-700">Helping Hand</h3>
            <p className="text-sm text-gray-500">Request for assistance</p>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {helpings.map((item) => (
          <div key={item.id} className="bg-white shadow rounded p-4">
            <img
              src={`https://phc-vfkt.onrender.com${item.image}`}
              alt={item.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.email}</p>
            <p className="text-sm text-gray-600">{item.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Helpinghanduser;
