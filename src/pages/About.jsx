import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-10">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-red-700 mb-6 text-center">
          About PHC Church
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
          PHC (Pentecostal Holiness Church) is a Christ-centered community of believers passionate
          about worship, prayer, service, and spreading God’s love. Our mission is to help people
          grow in faith, find healing and purpose, and impact the world through the Gospel.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            className="bg-rose-100 p-6 rounded-xl shadow hover:shadow-md transition"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-semibold text-red-700 mb-2">📖 Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To lead people into a growing relationship with Jesus Christ and to build a strong
              foundation of faith through sound biblical teaching, community service, and powerful
              worship.
            </p>
          </motion.div>

          <motion.div
            className="bg-red-50 p-6 rounded-xl shadow hover:shadow-md transition"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-semibold text-red-700 mb-2">🙏 Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be a vibrant church filled with the Holy Spirit, serving our local community and
              the world through compassion, outreach, and the transformative power of prayer and
              the Word.
            </p>
          </motion.div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-center text-red-700 mb-4">🌟 What We Believe</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg max-w-2xl mx-auto">
            <li>Jesus Christ is the Son of God and our Savior</li>
            <li>The Bible is the inspired Word of God</li>
            <li>The Holy Spirit empowers and guides us daily</li>
            <li>Prayer is powerful and central to our lives</li>
            <li>Community, love, and service reflect our faith</li>
          </ul>
        </div>

        {/* Gallery Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-center text-red-700 mb-8">
            📸 Moments from Our Church
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "/images/church1.jpg",
              "/images/church2.jpg",
              "/images/church3.jpg"
            ].map((src, index) => (
              <motion.div
                key={index}
                className="overflow-hidden rounded-xl shadow-lg"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={src}
                  alt={`Church Moment ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
