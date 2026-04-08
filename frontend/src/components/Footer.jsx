import React from 'react';

const Footer = () => {
  const footerStyles = {
    footer: {
      backgroundColor: '#166534',
      color: 'white',
      padding: '40px 20px',
      textAlign: 'center',
      marginTop: 'auto'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    text: {
      margin: '0 0 20px 0',
      color: '#bbf7d0',
      fontSize: '16px'
    },
    socialLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      alignItems: 'center'
    },
    socialIcon: {
      color: '#bbf7d0',
      fontSize: '24px',
      textDecoration: 'none',
      transition: 'color 0.3s ease'
    }
  };

  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.container}>
        <p style={footerStyles.text}>
          &copy; {new Date().getFullYear()} MediHerb. All rights reserved.
        </p>
        
        {/* Social icons */}
        <div style={footerStyles.socialLinks}>
          <a 
            href="#" 
            style={footerStyles.socialIcon}
            onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#bbf7d0'}
          >
            📘
          </a>
          <a 
            href="#" 
            style={footerStyles.socialIcon}
            onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#bbf7d0'}
          >
            🐦
          </a>
          <a 
            href="#" 
            style={footerStyles.socialIcon}
            onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#bbf7d0'}
          >
            📷
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;