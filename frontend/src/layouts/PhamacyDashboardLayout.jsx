import React from 'react'
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function PhamacyDashboardLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="d-flex flex-grow-1">
        <main className="flex-grow-1 p-4 bg-light">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default PhamacyDashboardLayout