import React from 'react';
import './MenuPage.css';

export function MenuPage() {
  return (
    <div className="menu-page">
      <h1>Our Services</h1>
      <p className="intro-text">
        We offer a wide range of IT services tailored to meet your business needs. From website optimization to e-commerce solutions, explore our offerings below.
      </p>
      <nav className="services-nav">
        <ul className="services-list">
          <li className="service-item">
            <a href="#optimization">Site Optimization</a>
            <p className="service-description">
              Improve your website's performance, speed, and SEO rankings with our expert optimization services.
            </p>
          </li>
          <li className="service-item">
            <a href="#ecommerce">E-commerce Development</a>
            <p className="service-description">
              We build high-performing, fully customized e-commerce platforms that scale with your business.
            </p>
          </li>
          <li className="service-item">
            <a href="#custom-apps">Custom Application Development</a>
            <p className="service-description">
              Tailor-made software solutions that fit your unique business needs and help streamline your operations.
            </p>
          </li>
          <li className="service-item">
            <a href="#consulting">IT Consulting</a>
            <p className="service-description">
              Our experts provide strategic advice to optimize your tech infrastructure and guide your business to success.
            </p>
          </li>
          <li className="service-item">
            <a href="#support">24/7 Support</a>
            <p className="service-description">
              Get round-the-clock support for all your IT-related issues with our dedicated support team.
            </p>
          </li>
        </ul>
      </nav>
    </div>
  );
}
