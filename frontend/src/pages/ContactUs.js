import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // EmailJS credentials (using your new email via the connected service)
  const EMAILJS_SERVICE_ID = 'service_n66ej8i';    // Replace with your actual Service ID
  const EMAILJS_TEMPLATE_ID = 'template_p4kmhva';
  const EMAILJS_PUBLIC_KEY = 'X9I7g5e25Hx0ujhcU';   // Replace with your actual Public Key

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const templateParams = {
      name: form.name,
      email: form.email,
      subject: form.subject || 'No subject',
      message: form.message,
      to_email: 'trendcart.official04@gmail.com', // new email address
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: '2rem', marginBottom: '3rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Left Column - Contact Info */}
        <div className="vote-section" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Get in touch</h2>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>Questions, collaborations, or just saying hello — reach out anytime.</p>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>📍 Address</h4>
            <p>GLA University<br />Mathura, Uttar Pradesh<br />India</p>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>📞 Phone</h4>
            <p>+91 9528321349</p>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>✉️ Email</h4>
            <p>trendcart.official04@gmail.com</p>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="vote-section" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Send us a message</h2>
          {submitted && <div className="notification" style={{ background: '#d4edda', color: '#155724', marginBottom: '1rem' }}>✓ Message sent! We'll reply within 24 hours.</div>}
          {error && <div className="notification" style={{ background: '#ffcccc', color: 'red', marginBottom: '1rem' }}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Email address *</label>
              <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} />
            </div>
            <div className="form-group">
              <label>How can we help? *</label>
              <textarea rows="4" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Sending...' : 'Send message'}
            </button>
          </form>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', textAlign: 'center', color: '#666' }}>We reply within 24 hours, usually sooner.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;