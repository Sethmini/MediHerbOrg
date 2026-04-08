import React from 'react';

const Contact = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9f0 0%, #e6f3ff 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 20px'
    },
    content: {
      maxWidth: '1000px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '50px',
      alignItems: 'start'
    },
    leftPanel: {
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },
    rightPanel: {
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#166534',
      marginBottom: '10px',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#6b7280',
      marginBottom: '30px',
      textAlign: 'center'
    },
    formGroup: {
      marginBottom: '25px'
    },
    label: {
      display: 'block',
      fontSize: '16px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      minHeight: '120px',
      resize: 'vertical',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif'
    },
    submitButton: {
      backgroundColor: '#16a34a',
      color: 'white',
      border: 'none',
      padding: '14px 32px',
      borderRadius: '25px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%'
    },
    contactTitle: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#166534',
      marginBottom: '25px'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '25px',
      padding: '20px',
      backgroundColor: '#f8fafc',
      borderRadius: '10px',
      border: '1px solid #dcfce7'
    },
    contactIcon: {
      fontSize: '24px',
      marginRight: '15px',
      minWidth: '30px'
    },
    contactInfo: {
      flex: '1'
    },
    contactType: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#166534',
      marginBottom: '5px'
    },
    contactDetail: {
      fontSize: '16px',
      color: '#374151',
      lineHeight: '1.5'
    },
    hoursSection: {
      marginTop: '30px',
      padding: '20px',
      backgroundColor: '#f0fdf4',
      borderRadius: '10px',
      border: '1px solid #bbf7d0'
    },
    hoursTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#166534',
      marginBottom: '15px'
    },
    hoursItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px',
      fontSize: '14px',
      color: '#374151'
    }
  };

  // Remove TypeScript types from event handlers
  const handleInputFocus = (e) => {
    e.target.style.borderColor = '#16a34a';
    e.target.style.boxShadow = '0 0 0 3px rgba(22, 163, 74, 0.1)';
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = '#d1d5db';
    e.target.style.boxShadow = 'none';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.');
  };

  // Add responsive styles for mobile
  const responsiveStyles = {
    ...styles,
    content: {
      ...styles.content,
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr'
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Contact Form */}
        <div style={styles.leftPanel}>
          <h1 style={styles.title}>Get In Touch</h1>
          <p style={styles.subtitle}>
            Have questions about our AI doctor recommendations or herbal medicine inventory? 
            We're here to help!
          </p>
          
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>Full Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter your full name"
                style={styles.input}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email address"
                style={styles.input}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label htmlFor="subject" style={styles.label}>Subject</label>
              <input 
                type="text" 
                id="subject" 
                placeholder="e.g., AI Doctor Consultation, Medicine Inquiry"
                style={styles.input}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label htmlFor="message" style={styles.label}>Message</label>
              <textarea 
                id="message" 
                placeholder="Tell us how we can help you..."
                style={styles.textarea}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              ></textarea>
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
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div style={styles.rightPanel}>
          <h2 style={styles.contactTitle}>Contact Information</h2>
          
          <div style={styles.contactItem}>
            <div style={styles.contactIcon}>📍</div>
            <div style={styles.contactInfo}>
              <div style={styles.contactType}>Main Hospital</div>
              <div style={styles.contactDetail}>
                123 Ayurveda Road<br />
                Colombo 07<br />
                Sri Lanka
              </div>
            </div>
          </div>
          
          <div style={styles.contactItem}>
            <div style={styles.contactIcon}>📞</div>
            <div style={styles.contactInfo}>
              <div style={styles.contactType}>Phone Numbers</div>
              <div style={styles.contactDetail}>
                Emergency: +94 11 234 5678<br />
                Appointments: +94 11 234 5679<br />
                General Inquiries: +94 11 234 5680
              </div>
            </div>
          </div>
          
          <div style={styles.contactItem}>
            <div style={styles.contactIcon}>✉️</div>
            <div style={styles.contactInfo}>
              <div style={styles.contactType}>Email Addresses</div>
              <div style={styles.contactDetail}>
                AI Doctors: ai-doctors@mediherb.lk<br />
                Medicine: inventory@mediherb.lk<br />
                General: info@mediherb.lk
              </div>
            </div>
          </div>
          
          <div style={styles.contactItem}>
            <div style={styles.contactIcon}>🌐</div>
            <div style={styles.contactInfo}>
              <div style={styles.contactType}>Online Services</div>
              <div style={styles.contactDetail}>
                AI Doctor Consultation<br />
                Medicine Inventory Check<br />
                Online Appointments
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div style={styles.hoursSection}>
            <div style={styles.hoursTitle}>Operating Hours</div>
            <div style={styles.hoursItem}>
              <span>Monday - Friday:</span>
              <span>7:00 AM - 9:00 PM</span>
            </div>
            <div style={styles.hoursItem}>
              <span>Saturday:</span>
              <span>8:00 AM - 6:00 PM</span>
            </div>
            <div style={styles.hoursItem}>
              <span>Sunday:</span>
              <span>9:00 AM - 4:00 PM</span>
            </div>
            <div style={styles.hoursItem}>
              <span>Emergency:</span>
              <span>24/7 Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;