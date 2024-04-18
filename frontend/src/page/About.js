import React from 'react';
import './About.css'; // Import your CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-heading">Welcome to Our Marketplace</h1>
        <p className="about-description">At <span className="brand-name">Market Place</span>, we're on a mission to revolutionize the way you shop and experience delivery. Our platform is dedicated to providing you with the best products and services, delivered to your doorstep at lightning speed.</p>
        
        <div className="about-section">
          <h2 className="about-subheading">Our Vision</h2>
          <p className="about-vision">We envision a world where convenience meets quality. Where shopping is not just a task, but an experience that delights and surprises you at every turn. Our marketplace is built with this vision in mind, striving to exceed your expectations every step of the way.</p>
        </div>
        
        <div className="about-section">
          <h2 className="about-subheading">Why Choose Us?</h2>
          <ul className="about-list">
            <li><b>Fastest Delivery:</b> Say goodbye to long wait times! We ensure your orders reach you in record time.</li>
            <li><b>Wide Selection:</b> Discover a diverse range of products curated to meet your every need and desire.</li>
            <li><b>Quality Assurance:</b> Each product undergoes rigorous testing to meet our standards of excellence.</li>
            <li><b>Exceptional Customer Service:</b> Our support team is here to assist you with any questions or concerns.</li>
          </ul>
        </div>
        
        <div className="about-section">
          <h2 className="about-subheading">Join Us Today</h2>
          <p className="about-join">Experience the future of shopping with <span className="brand-name">Market Place</span>. Join our community of savvy shoppers and discover a world of convenience, quality, and unbeatable service. Start exploring now!</p>
        </div>

        <div className="about-section">
          <h2 className="about-subheading">Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src="team-member-1.jpg" className="team-member-img" />
              <h3 className="team-member-name">Utkarsh Bharadia</h3>
              <p className="team-member-role">CEO & Founder</p>
            </div>
            <div className="team-member">
              <img src="team-member-2.jpg" className="team-member-img" />
              <h3 className="team-member-name">Adarsh Pathak</h3>
              <p className="team-member-role">Sr ML Engineer</p>
            </div>
            <div className="team-member">
              <img src="team-member-3.jpg" className="team-member-img" />
              <h3 className="team-member-name">Abhishek Singh</h3>
              <p className="team-member-role">Head of Product</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="about-footer">
        <p>&copy; {new Date().getFullYear()} Market Place. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;