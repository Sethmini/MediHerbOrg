import React, { useState } from 'react';
import AxiosInstance from '../AxiosInstance'; // Adjust the path if needed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();


  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9f0 0%, #e6f3ff 100%)',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      maxWidth: '400px',
      width: '100%',
      border: '1px solid #dcfce7',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    icon: {
      fontSize: '48px',
      color: '#16a34a',
      marginBottom: '15px',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#166534',
      margin: '0',
    },
    formGroup: {
      marginBottom: '25px',
    },
    label: {
      display: 'block',
      fontSize: '16px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px',
    },
    inputGroup: {
      display: 'flex',
      alignItems: 'center',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
    },
    inputIcon: {
      padding: '12px 16px',
      backgroundColor: '#f8fafc',
      color: '#6b7280',
      fontSize: '20px',
      borderRight: '2px solid #d1d5db',
    },
    input: {
      flex: '1',
      padding: '12px 16px',
      border: 'none',
      fontSize: '16px',
      outline: 'none',
      fontFamily: 'Arial, sans-serif',
    },
    submitButton: {
      backgroundColor: '#16a34a',
      color: 'white',
      border: 'none',
      padding: '14px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
    },
    loginLink: {
      textAlign: 'center',
      marginTop: '20px',
      paddingTop: '20px',
      borderTop: '1px solid #e5e7eb',
    },
    loginText: {
      color: '#6b7280',
      fontSize: '14px',
      margin: '0',
    },
    loginAnchor: {
      color: '#16a34a',
      textDecoration: 'none',
      fontWeight: '600',
    },
  };

  const handleInputFocus = (e) => {
    e.target.parentElement.style.borderColor = '#16a34a';
    e.target.parentElement.style.boxShadow = '0 0 0 3px rgba(22, 163, 74, 0.1)';
  };

  const handleInputBlur = (e) => {
    e.target.parentElement.style.borderColor = '#d1d5db';
    e.target.parentElement.style.boxShadow = 'none';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await AxiosInstance.post('/auth/register', {
        useremail: email,
        password,
      });

      const data = response.data;

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.user)

       navigate('/login');

    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      console.error('Registration error:', err.response?.data || err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.icon}>📝</div>
          <h3 style={styles.title}>Create Account</h3>
          <p style={{ color: '#6b7280', marginTop: '10px' }}>
            Sign up to start using MediHerb
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <div style={styles.inputGroup}>
              <div style={styles.inputIcon}>📧</div>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                style={styles.input}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <div style={styles.inputGroup}>
              <div style={styles.inputIcon}>🔒</div>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                style={styles.input}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
            <div style={styles.inputGroup}>
              <div style={styles.inputIcon}>🔒</div>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Re-enter your password"
                style={styles.input}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            style={styles.submitButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#15803d';
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#16a34a';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Register
          </button>

          <div style={styles.loginLink}>
            <p style={styles.loginText}>
              Already have an account?{' '}
              <a
                href="/login"
                style={styles.loginAnchor}
                onMouseEnter={(e) => {
                  e.target.style.color = '#15803d';
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#16a34a';
                  e.target.style.textDecoration = 'none';
                }}
              >
                Sign in here
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer position="top-right"  style={{marginTop: '50px'}}/>
    </div>
  );
};

export default Register;
