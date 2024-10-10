import React from 'react';
import './AboutPage.css'; // Import the CSS file

export function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>We’re passionate about delivering the best services to our customers and driving innovation.</p>
        </div>
      </section>

      {/* Company Mission Section */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to empower businesses with cutting-edge technology and create value that drives long-term success.
        </p>
      </section>

      {/* Company Values Section */}
      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-cards">
          <div className="value-card">
            <h3>Innovation</h3>
            <p>We embrace change and constantly push the boundaries to improve and innovate.</p>
          </div>
          <div className="value-card">
            <h3>Integrity</h3>
            <p>We act with honesty, transparency, and respect in every interaction.</p>
          </div>
          <div className="value-card">
            <h3>Excellence</h3>
            <p>We are committed to delivering high-quality services that exceed expectations.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-cards">
          <div className="team-card">
            <img src="team-member1.jpg" alt="Team Member" />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-card">
            <img src="team-member2.jpg" alt="Team Member" />
            <h3>Jane Smith</h3>
            <p>Head of Marketing</p>
          </div>
          <div className="team-card">
            <img src="team-member3.jpg" alt="Team Member" />
            <h3>David Lee</h3>
            <p>Lead Developer</p>
          </div>
        </div>
      </section>
    </div>
  );
}
