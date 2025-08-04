import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Prayer from './pages/Prayer';
import Donate from './pages/Donate';
import Login from './pages/Login';
import Register from './pages/Register';
import HelpingHand from './pages/HelpingHand';

import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Users from './pages/Users';
import HelpingManage from './pages/HelpingManage';
import DonateManage from './pages/DoanateManage';
import TimingManage from './pages/TimingManage';
import Donateuser from './pages/Donateuser';

import Helpinghanduser from './pages/Helpinghanduser';

import { AuthProvider, AuthContext } from './context/AuthContext';

// 🔐 Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <>
        <Navbar />
        <hr className="border-2 text-white" />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/prayer" element={<Prayer />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/helping-hand" element={<HelpingHand />} />
          <Route path="/helpinghanduser/:id" element={<Helpinghanduser />} />


          {/* Admin and Manage Routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/users" element={<Users />} />
          <Route path="/timemanage" element={<TimingManage />} />
          <Route path="/helpingmanage" element={<HelpingManage />} />
          <Route path="/donatemanage" element={<DonateManage />} />
          <Route path="/dashboard" element={<Dashboard />} />
<Route path="/donateuser/:userId" element={<Donateuser />} />
          


          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </>
    </AuthProvider>
  );
}

export default App;
