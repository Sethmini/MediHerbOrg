import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="flex-fill container py-4">
        <Outlet /> {/* Renders the current page (Home, About, etc.) */}
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicLayout;
