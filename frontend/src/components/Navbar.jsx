import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const styles = {
    navbar: { backgroundColor: '#166534', padding: '0.75rem 1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 1000 },
    container: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' },
    brand: { color: 'white', fontSize: '28px', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' },
    navLinks: { display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' },
    navLink: { color: '#bbf7d0', textDecoration: 'none', fontSize: '16px', fontWeight: '500', padding: '8px 12px', borderRadius: '6px', transition: 'all 0.3s ease' },
    buttonGroup: { display: 'flex', gap: '10px', alignItems: 'center' },
    outlineButton: { backgroundColor: 'transparent', color: 'white', border: '2px solid white', padding: '8px 18px', borderRadius: '25px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', transition: 'all 0.3s ease', cursor: 'pointer' },
    primaryButton: { backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '25px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', transition: 'all 0.3s ease', cursor: 'pointer' },
    dropdown: { position: 'relative', display: 'inline-block' },
    dropdownContent: { position: 'absolute', backgroundColor: '#1f2937', minWidth: '160px', boxShadow: '0px 8px 16px rgba(0,0,0,0.2)', zIndex: 1, borderRadius: '6px', overflow: 'hidden', top: '100%', right: 0 },
    dropdownItem: { color: 'white', padding: '12px 16px', textDecoration: 'none', display: 'block', fontSize: '14px', transition: '0.2s', cursor: 'pointer' }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Brand */}
        <Link to="/" style={styles.brand}>
          <span style={{ fontSize: '32px' }}>🌿</span> MediHerb
        </Link>

        {/* Links */}
        <div style={styles.navLinks}>
          <Link style={styles.navLink} to="/">Home</Link>
          <Link style={styles.navLink} to="/doctors">Doctors</Link>
          <Link style={styles.navLink} to="/drugs">Find Drugs</Link>
          <Link style={styles.navLink} to="/about">About Us</Link>
          <Link style={styles.navLink} to="/contact">Contact Us</Link>

          <div style={styles.buttonGroup}>
            {!user ? (
              <>
                <Link style={styles.outlineButton} to="/login">Login</Link>
                <Link style={styles.primaryButton} to="/register">Register</Link>
              </>
            ) : (
              <div
                style={styles.dropdown}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button style={{ ...styles.outlineButton, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  Hi, {user.name || 'User'} ▼
                </button>

                {dropdownOpen && (
                  <div style={styles.dropdownContent}>
                    {user.role === 'admin' && <Link style={styles.dropdownItem} to="/admin-pharmacy-management">Admin Dashboard</Link>}
                    {user.role === 'user' && <Link style={styles.dropdownItem} to="/user-dashboard">User Dashboard</Link>}
                    {user.role === 'pharmacist' && <Link style={styles.dropdownItem} to="/pharmacy-dashboard">Pharmacy Dashboard</Link>}
                    <button
                      onClick={handleLogout}
                      style={{ ...styles.dropdownItem, background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
