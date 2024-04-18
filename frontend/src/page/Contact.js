import React from 'react';
import './Contact.css'; 

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1 className="contact-heading">Contact Us</h1>
        <p className="contact-description">Have a question or feedback? We'd love to hear from you! Get in touch with us using the contact information below:</p>
        
        <div className="contact-info">
          <h2 className="contact-subheading">Contact Information</h2>
          <p><strong>Email:</strong> info@example.com</p>
          <p><strong>Phone:</strong> +1 (123) 456-7890</p>
          <p><strong>Address:</strong> 123 Market Street, City, Country</p>
        </div>
        
        <div className="contact-form">
          <h2 className="contact-subheading">Send Us a Message</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
      <footer className="contact-footer">
        <p>&copy; {new Date().getFullYear()} MarketX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;