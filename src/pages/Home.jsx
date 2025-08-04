import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Youtube } from 'lucide-react'; // Install via: npm install lucide-react

const Home = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get("https://phc-vfkt.onrender.com/timingsdata/");
        setSchedule(response.data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-red-700 text-white py-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
          
          {/* Image */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-lg border-4 border-lime-400">
            <img
              src="sv.jpg" // Replace with your actual image path
              alt="PHC"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 rounded-full border-4 border-lime-200 animate-pulse opacity-20"></div>
          </div>

          {/* Text */}
          <div className="text-center lg:text-left flex-1">
            <motion.h1
              className="text-4xl sm:text-5xl font-extrabold mb-4"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Welcome to PHC CHURCH
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              A place of worship, healing, and hope. Join our family and grow in faith through prayer,
              fellowship, and God’s Word.
            </motion.p>

            <motion.a
              href="/prayer"
              className="inline-block mt-8 bg-white text-red-700 font-bold py-3 px-8 rounded-full shadow-md hover:bg-red-100 transition"
              whileHover={{ scale: 1.05 }}
            >
              Request a Prayer
            </motion.a>

            {/* YouTube CTA Box */}
            <div className="mt-6 flex justify-center lg:justify-start">
              <a
                href="https://youtube.com/@sabuvarghesephcchurch?si=dXGzstvVE8LQOiFll" // Replace with your actual YouTube link
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border-2 border-red-600 text-red-700 rounded-xl px-6 py-4 flex items-center gap-4 shadow-md hover:bg-red-600 hover:text-white transition duration-300"
              >
                <div className="bg-red-600 text-white p-2 rounded-full group-hover:bg-white group-hover:text-red-600 transition duration-300">
                  <Youtube className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-lg font-bold">Subscribe to PHC on YouTube</p>
                  <p className="text-sm opacity-80">Watch sermons, worship, and live streams</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Schedule Section */}
      <section className="py-16 px-4 sm:px-10 bg-gray-100">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-red-700 mb-12">
          Weekly Timetable
        </h2>

        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {schedule.length > 0 ? (
            schedule.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-red-500 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-2 sm:mb-0">
                  <p className="text-xl font-bold text-red-700">{item.day}</p>
                  <p className="text-gray-700 text-sm">{item.description}</p>
                </div>
                <div className="text-sm font-medium text-gray-600 sm:text-right">
                  {item.startTime} - {item.endTime}
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-2">Loading schedule...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
