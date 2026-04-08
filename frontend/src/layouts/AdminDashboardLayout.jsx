// src/layouts/AdminDashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/AdminSidebar';
import Footer from '../components/Footer';

const AdminDashboardLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <main className="flex-grow-1 p-4 bg-light">
          {/* 👇 This is where your nested pages (Dashboard, UserManagement, etc.) will render */}
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboardLayout;
