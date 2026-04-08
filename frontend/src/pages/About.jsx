import React from 'react';

const About = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9f0 0%, #e6f3ff 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 20px'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '50px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#166534',
      marginBottom: '30px',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '1.8rem',
      fontWeight: '600',
      color: '#2563eb',
      marginBottom: '20px',
      marginTop: '40px'
    },
    paragraph: {
      fontSize: '18px',
      color: '#374151',
      lineHeight: '1.7',
      marginBottom: '20px'
    },
    missionSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      marginTop: '40px'
    },
    missionCard: {
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      padding: '30px',
      border: '2px solid #dcfce7',
      textAlign: 'center'
    },
    missionIcon: {
      fontSize: '48px',
      marginBottom: '20px'
    },
    missionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#166534',
      marginBottom: '15px'
    },
    valuesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '25px',
      marginTop: '30px'
    },
    valueItem: {
      textAlign: 'center',
      padding: '20px'
    },
    valueIcon: {
      fontSize: '36px',
      marginBottom: '15px'
    },
    valueTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#1e40af',
      marginBottom: '10px'
    },
    highlight: {
      color: '#dc2626',
      fontWeight: '600'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>About Medi-Herb</h1>
        
        <p style={styles.paragraph}>
          Welcome to <span style={styles.highlight}>MediHerb</span>, where ancient Ayurvedic wisdom 
          meets cutting-edge artificial intelligence. We are revolutionizing traditional healthcare 
          by combining 5000 years of Ayurvedic knowledge with modern technology to provide 
          personalized, effective, and authentic healing solutions.
        </p>

        <h2 style={styles.subtitle}>Our Mission</h2>
        <p style={styles.paragraph}>
          To make authentic Ayurvedic healthcare accessible to everyone through intelligent 
          technology while preserving the purity and tradition of ancient healing practices.
        </p>

        <div style={styles.missionSection}>
          <div style={styles.missionCard}>
            <div style={styles.missionIcon}>🌿</div>
            <h3 style={styles.missionTitle}>Traditional Roots</h3>
            <p style={{...styles.paragraph, fontSize: '16px', marginBottom: '0'}}>
              Deeply rooted in authentic Ayurvedic principles and traditional healing methods 
              passed down through generations of experienced practitioners.
            </p>
          </div>
          
          <div style={styles.missionCard}>
            <div style={styles.missionIcon}>🤖</div>
            <h3 style={styles.missionTitle}>AI Innovation</h3>
            <p style={{...styles.paragraph, fontSize: '16px', marginBottom: '0'}}>
              Leveraging artificial intelligence to match patients with the perfect Ayurvedic 
              specialists and optimize herbal medicine inventory management.
            </p>
          </div>
          
          <div style={styles.missionCard}>
            <div style={styles.missionIcon}>❤️</div>
            <h3 style={styles.missionTitle}>Patient-Centered</h3>
            <p style={{...styles.paragraph, fontSize: '16px', marginBottom: '0'}}>
              Committed to providing personalized care that addresses individual health needs 
              while maintaining the highest standards of quality and authenticity.
            </p>
          </div>
        </div>

        <h2 style={styles.subtitle}>What We Offer</h2>
        <p style={styles.paragraph}>
          <span style={styles.highlight}>MediHerb</span> provides a comprehensive ecosystem for 
          Ayurvedic healthcare, featuring our innovative AI-powered doctor recommendation system 
          and smart inventory management for herbal medicines.
        </p>

        <h2 style={styles.subtitle}>Our Core Values</h2>
        <div style={styles.valuesGrid}>
          <div style={styles.valueItem}>
            <div style={styles.valueIcon}>🔬</div>
            <h3 style={styles.valueTitle}>Authenticity</h3>
            <p>100% genuine Ayurvedic practices and herbal formulations</p>
          </div>
          <div style={styles.valueItem}>
            <div style={styles.valueIcon}>⚡</div>
            <h3 style={styles.valueTitle}>Innovation</h3>
            <p>Continuous improvement through technology and research</p>
          </div>
          <div style={styles.valueItem}>
            <div style={styles.valueIcon}>🤝</div>
            <h3 style={styles.valueTitle}>Trust</h3>
            <p>Building lasting relationships based on transparency</p>
          </div>
          <div style={styles.valueItem}>
            <div style={styles.valueIcon}>🌍</div>
            <h3 style={styles.valueTitle}>Accessibility</h3>
            <p>Making Ayurvedic care available to all communities</p>
          </div>
        </div>

        <h2 style={styles.subtitle}>Why Choose MediHerb?</h2>
        <p style={styles.paragraph}>
          With over <span style={styles.highlight}>50 certified Ayurvedic doctors</span>, 
          <span style={styles.highlight}> 200+ authentic herbal medicines</span>, and 
          <span style={styles.highlight}> 10,000+ satisfied patients</span>, we have established 
          ourselves as a trusted bridge between traditional Ayurveda and modern healthcare needs.
        </p>

        <p style={{...styles.paragraph, fontStyle: 'italic', textAlign: 'center' , marginTop: '40px'}}>
          "Preserving the past, healing the present, innovating for the future."
        </p>
      </div>
    </div>
  );
};

export default About;