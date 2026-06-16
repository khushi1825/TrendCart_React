const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// CORS - Allow frontend URLs
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://trendcart.vercel.app',
    'https://trendcart-*.vercel.app',
    'https://trendcart-react.onrender.com'
  ],
  credentials: true
}));

app.use(express.json());

// ============================================
// TEST API - Check if backend is working
// ============================================
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!',
    timestamp: new Date().toISOString(),
    status: 'online'
  });
});

// ============================================
// ✅ ONLY WHATSAPP SHARE LINK API
// ============================================
app.post('/api/send-whatsapp-link', async (req, res) => {
  const { friendName, friendNumber, dressName, dressLink } = req.body;
  
  const whatsappLink = `https://wa.me/${friendNumber}?text=${encodeURIComponent(
    `👗 ${dressName} has been added for voting!\nVote here: ${dressLink}`
  )}`;
  
  res.json({ 
    success: true, 
    whatsappLink 
  });
});

// ============================================
// 📧 EMAILJS CONTACT FORM API
// ============================================
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

app.post('/api/send-contact-email', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  try {
    const response = await axios.post(
      'https://api.emailjs.com/api/v1.0/email/send',
      {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          name: name,
          email: email,
          subject: subject || 'No subject',
          message: message
        }
      }
    );
    
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('EmailJS error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// ============================================
// Start Server
// ============================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`✅ Test API: http://localhost:${PORT}/api/test`);
});