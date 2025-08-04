import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartHandshake, HandCoins, LogOut } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-300 flex items-center justify-center px-4 py-5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-4xl"
      >
        <h2 className="text-4xl font-extrabold text-center text-red-700 mb-2">
          Welcome, {user?.name ? user.name.split(' ')[0] : 'Guest'}!
        </h2>
        <p className="text-center text-gray-600 mb-8">
          You're logged in as
          <span className="ml-1 font-semibold capitalize text-red-600">{user?.type}</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-10">
          <Link to={`/donateuser/${user?.id}`} className="bg-red-50 hover:bg-red-100 rounded-xl p-6 shadow-md flex items-center space-x-4 transition duration-300">
            <HandCoins className="text-red-600 w-8 h-8" />
            <div>
              <h3 className="text-xl font-semibold text-red-700">Donations</h3>
              <p className="text-sm text-gray-500">Support by contributing</p>
            </div>
          </Link>

          <Link to={`/helpinghanduser/${user?.id}`}

  className="bg-red-50 hover:bg-red-100 rounded-xl p-6 shadow-md flex items-center space-x-4 transition duration-300"
>
  <div>
  <h3 className="text-xl font-semibold text-red-700">Helping Hand</h3>
    <p className="text-sm text-gray-500">Request for assistance</p>
    </div>
</Link>

        </div>

        <div className="bg-gray-50 rounded-xl p-6 space-y-4 shadow-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold">{user?.phone}</p>
            </div>
            <div >
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-semibold">{user?.address}</p>
            </div>
               <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold">{user?.name}</p>
            </div> <br />
            
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="mt-6 w-full flex justify-center items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-xl shadow hover:bg-red-700 transition duration-300"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
