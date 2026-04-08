import React, { useState } from 'react';
import AxiosInstance from '../AxiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AxiosInstance.post('/auth/login', {
        useremail: email,
        password,
      });

      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') {
        window.location.href = '/admin-pharmacy-management';
      } else if (user.role === 'user') {
        window.location.href = '/doctors';
      } else if (user.role === 'pharmacist') {
        window.location.href = '/pharmacy-dashboard';
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
      console.error('Login error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-gradient" style={{background: 'linear-gradient(135deg, #f0f9f0 0%, #e6f3ff 100%)'}}>
      <div className="card shadow-sm rounded-4 border border-success p-4" style={{maxWidth: '400px', width: '100%'}}>
        <div className="text-center mb-4">
          <div style={{ fontSize: '48px', color: '#16a34a' }}>🔐</div>
          <h3 className="fw-bold text-success mt-3">Welcome Back</h3>
          <p className="text-secondary">Sign in to your MediHerb account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label fw-semibold text-secondary">
              Email Address
            </label>
            <div className="input-group border border-2 rounded-2">
              <span className="input-group-text bg-light text-muted" id="email-addon" style={{ borderRight: '2px solid #d1d5db' }}>
                📧
              </span>
              <input
                type="email"
                id="email"
                aria-describedby="email-addon"
                placeholder="Enter your email address"
                className="form-control border-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold text-secondary">
              Password
            </label>
            <div className="input-group border border-2 rounded-2">
              <span className="input-group-text bg-light text-muted" id="password-addon" style={{ borderRight: '2px solid #d1d5db' }}>
                🔒
              </span>
              <input
                type="password"
                id="password"
                aria-describedby="password-addon"
                placeholder="Enter your password"
                className="form-control border-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-bold"
            style={{ transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#15803d';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#16a34a';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Sign In
          </button>

          <div className="text-center mt-3">
            <a
              href="#"
              className="text-success fw-medium small"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#15803d';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#16a34a';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Forgot your password?
            </a>
          </div>

          <div className="text-center mt-4 pt-3 border-top">
            <p className="text-secondary small mb-0">
              Don't have an account?{' '}
              <a
                href="/register"
                className="text-success fw-semibold"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#15803d';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#16a34a';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Create one here
              </a>
            </p>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" style={{ marginTop: '50px' }} />
    </div>
  );
};

export default Login;
