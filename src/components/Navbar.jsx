import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const admin = localStorage.getItem("admin");
    if (user) setUserType("user");
    else if (admin) setUserType("admin");
    else setUserType(null);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    setUserType(null);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Prayer", path: "/prayer" },
    { name: "Donate", path: "/donate" },
    { name: "Helping Hands", path: "/helping-hand" },
    ...(userType === "user" ? [{ name: "Dashboard", path: "/dashboard" }] : []),
    ...(userType === "admin" ? [{ name: "AdminDashboard", path: "/admin" }] : []),
    {
      name: userType ? "Logout" : "Login",
      path: userType ? "#" : "/login",
      action: userType ? handleLogout : null,
    },
  ];

  return (
    <nav className="bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        
        {/* Logo and Title */}
        <div className="flex items-center space-x-4 perspective-[1200px]">
          <motion.div
            initial={{ rotateY: 180, scale: 2.5, opacity: 0 }}
            animate={{ rotateY: 0, scale: 1, opacity: 1 }}
            transition={{
              duration: 1.6,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
            className="w-12 h-12"
          >
            <img
              src={logo}
              alt="PHC Logo"
              className="w-12 h-12 rounded-full object-cover shadow-lg"
            />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
            PHC <span className="text-yellow-100">CHURCH</span>
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.action ? (
                <button
                  onClick={link.action}
                  className="transition-colors duration-300 hover:text-yellow-300"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  to={link.path}
                  className="transition-colors duration-300 hover:text-yellow-300"
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden px-6 pb-6 space-y-4 text-lg font-medium bg-red-700"
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.action ? (
                  <button
                    onClick={() => {
                      link.action();
                      toggleMenu();
                    }}
                    className="block w-full text-left hover:text-yellow-300 transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    onClick={toggleMenu}
                    className="block w-full hover:text-yellow-300 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
