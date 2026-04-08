import React from 'react';

const Home = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9f0 0%, #e6f3ff 100%)',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '20px 0'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    logo: {
      width: '50px',
      height: '50px',
      backgroundColor: '#16a34a',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      color: 'white'
    },
    heroTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#166534',
      marginBottom: '20px',
      lineHeight: '1.2'
    },
    featureCard: {
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      border: '1px solid #dcfce7',
      textAlign: 'center',
      transition: 'transform 0.3s ease'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={styles.logoContainer}>
            <div style={styles.logo}>
              🩺
            </div>
            <div>
              <h1 style={{ margin: 0, color: '#166534', fontSize: '28px' }}>
                Medi Herb
              </h1>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                Traditional Healing, Modern Technology
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={styles.heroTitle}>
            Ancient Wisdom Meets{' '}
            <span style={{ color: '#2563eb' }}>Artificial Intelligence</span>
          </h1>
          
          <p style={{ 
            fontSize: '20px', 
            color: '#374151', 
            marginBottom: '50px',
            lineHeight: '1.6',
            maxWidth: '800px',
            margin: '0 auto 50px'
          }}>
            Experience personalized Ayurvedic healthcare with our AI-powered doctor recommendation system 
            and smart inventory management for authentic herbal medicines.
          </p>

          {/* Feature Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px', 
            marginBottom: '60px' 
          }}>
            {/* AI Doctor Card */}
            <div 
              style={styles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#dcfce7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                margin: '0 auto 20px'
              }}>
                🤖
              </div>
              <h3 style={{ color: '#166534', fontSize: '22px', marginBottom: '15px' }}>
                AI Doctor Matching
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Intelligent system that matches you with the perfect Ayurvedic specialist 
                based on your health profile and symptoms
              </p>
            </div>

            {/* Inventory Card */}
            <div 
              style={styles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#dbeafe',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                margin: '0 auto 20px'
              }}>
                📦
              </div>
              <h3 style={{ color: '#1e40af', fontSize: '22px', marginBottom: '15px' }}>
                Smart Inventory
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Advanced tracking of 200+ herbal medicines ensuring quality, 
                authenticity and real-time availability
              </p>
            </div>

            {/* Traditional Care Card */}
            <div 
              style={styles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#ffedd5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                margin: '0 auto 20px'
              }}>
                🌿
              </div>
              <h3 style={{ color: '#c2410c', fontSize: '22px', marginBottom: '15px' }}>
                Traditional Care
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                5000 years of Ayurvedic knowledge combined with cutting-edge 
                technology for modern healthcare solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '40px', 
            textAlign: 'center' 
          }}>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#16a34a', marginBottom: '10px' }}>
                50+
              </div>
              <div style={{ color: '#6b7280', fontSize: '18px' }}>Expert Doctors</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#16a34a', marginBottom: '10px' }}>
                200+
              </div>
              <div style={{ color: '#6b7280', fontSize: '18px' }}>Herbal Medicines</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#16a34a', marginBottom: '10px' }}>
                10K+
              </div>
              <div style={{ color: '#6b7280', fontSize: '18px' }}>Patients Served</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#16a34a', marginBottom: '10px' }}>
                98%
              </div>
              <div style={{ color: '#6b7280', fontSize: '18px' }}>Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;