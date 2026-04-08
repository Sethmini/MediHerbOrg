import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import AdminDashboardLayout from './layouts/AdminDashboardLayout';
import PharmacyDashboardLayout from './layouts/PhamacyDashboardLayout';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import Profile from './pages/Profile';
import AdminUserManagement from './pages/admin/UserManagement';
import AdminDoctorManagement from './pages/admin/DoctorManagement';
import PharmacyManagement from './pages/admin/PharmacyManagement';
import PharmacyDashboard from './pages/phamacy/DrugManagement';
import Doctors from './pages/Doctors';
import Drugs from './pages/Drugs';



function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all public pages inside PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/drugs" element={<Drugs />} />
        </Route>

        <Route element={<AdminDashboardLayout />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-my-profile" element={<Profile />} />
          <Route path="/admin-user-management" element={<AdminUserManagement />} />
          <Route path="/admin-doctor-management" element={<AdminDoctorManagement />} />
          <Route path="/admin-pharmacy-management" element={<PharmacyManagement />} />
        </Route>

        <Route element={<PharmacyDashboardLayout />}>
          <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
