// src/components/AdminSidebar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BoxSeam } from 'react-bootstrap-icons';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const linkBaseClass = "nav-link d-flex align-items-center rounded px-3 py-2 transition-hover";

  return (
    <div
      className="bg-white border border-success vh-100 p-3 shadow-sm"
      style={{ width: '220px', position: 'sticky', top: 0 }}
    >
      <style>
        {`
          .nav-link.transition-hover {
            transition: background-color 0.3s ease, color 0.3s ease;
            cursor: pointer;
          }
          .nav-link.transition-hover:hover {
            background-color: #d4edda;
            color: #155724 !important;
          }
          .btn-logout {
            background-color: #f8d7da;
            color: #842029;
          }
          .btn-logout:hover {
            background-color: #f5c2c7;
            color: #6f1e23 !important;
          }
        `}
      </style>

      <h5 className="mb-4 text-success fw-bold">Admin Panel</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-3">
          {/* <Link
            to="/admin-dashboard"
            className={`${linkBaseClass} ${isActive('/admin-dashboard') ? 'bg-success text-white' : 'text-dark'}`}
          >
            <DashboardIcon fontSize="medium" className="me-2" />
            Dashboard
          </Link> */}
        </li>

        <li className="nav-item mb-3">
          <Link
            to="/admin-pharmacy-management"
            className={`${linkBaseClass} ${isActive('/admin-pharmacy-management') ? 'bg-success text-white' : 'text-dark'}`}
          >
            <BoxSeam className="me-2" size={20} />
            Pharmacy
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link
            to="/admin-doctor-management"
            className={`${linkBaseClass} ${isActive('/admin-doctor-management') ? 'bg-success text-white' : 'text-dark'}`}
          >
            <PeopleIcon fontSize="medium" className="me-2" />
            Doctors
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link
            to="/admin-user-management"
            className={`${linkBaseClass} ${isActive('/admin-user-management') ? 'bg-success text-white' : 'text-dark'}`}
          >
            <GroupIcon className="me-2" size={20} />
            Users
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link
            to="/admin-my-profile"
            className={`${linkBaseClass} ${isActive('/admin-my-profile') ? 'bg-success text-white' : 'text-dark'}`}
          >
            <AccountCircleIcon fontSize="medium" className="me-2" />
            My Profile
          </Link>
        </li>

        <li className="nav-item mt-5">
          <button
            onClick={handleLogout}
            className="nav-link d-flex align-items-center rounded px-3 py-2 fw-semibold w-100 border-0 btn-logout transition-hover"
            style={{ textAlign: 'left' }}
          >
            <LogoutIcon fontSize="medium" className="me-2" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
