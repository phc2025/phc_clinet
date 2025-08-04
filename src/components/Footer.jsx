import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-red-700 text-white px-6 py-12 sm:px-12 mt-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-3">About PHC Church</h3>
          <p className="text-sm leading-relaxed text-white/90">
            PHC is a community-focused church dedicated to spreading faith, hope, and love. We offer
            weekly gatherings, prayer support, and social outreach.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/donate" className="hover:underline">Donate</a></li>
            <li><a href="/prayer" className="hover:underline">Prayer Request</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-bold mb-3">Connect with Us</h3>
          <p className="text-sm">📍 indurthi nagar 3rd line , ongole, 523001</p>
          <p className="text-sm">📞 +91 92464 60461</p>
          <p className="text-sm">✉️ phcchurchind@gmail.com</p>

          <div className="flex gap-4 mt-4 text-lg">
            <a href="https://www.facebook.com/profile.php?id=100005748370756&mibextid=rS40aB7S9Ucbxw6v" className="hover:text-yellow-300 transition-all duration-200">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/sabu_varghese_?igsh=ZmhvNzlsZGdrZHgx" className="hover:text-yellow-300 transition-all duration-200">
              <FaInstagram />
            </a>
            <a href="https://x.com/Sabu_V_K" className="hover:text-yellow-300 transition-all duration-200">
              <FaTwitter />
            </a>
            <a href="https://youtube.com/@sabuvarghesephcchurch?si=dXGzstvVE8LQOiFl" className="hover:text-yellow-300 transition-all duration-200">
              <FaYoutube />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center text-sm text-white/80"
      >
        © {new Date().getFullYear()} PHC Church. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
