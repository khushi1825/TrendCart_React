const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// 🔁 YAHAN APNA FAST2SMS API KEY LAGAYEIN
const FAST2SMS_API_KEY = 'iFBXCpIozZ7y4RVKe0n6QsrPtcYwTq9xW1D8HMLmgvAf2lUbkun2x0k3B8pRGvqcTaDZgKtCdXbAPmhf';   // <-- yahan paste karein

//backend krne ke liye daal rhi hu 
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.post('/api/send-vote-sms', async (req, res) => {
  const { friendName, friendNumber, dressName } = req.body;

  if (!friendNumber) {
    return res.status(400).json({ error: 'Friend number missing' });
  }

  // Indian numbers ke liye +91 nahi lagana, bas 10 digit number chahiye
  let toNumber = friendNumber.replace(/\D/g, ''); // sirf digits
  if (toNumber.length === 10) {
    // Fast2SMS 10-digit number leta hai
    toNumber = toNumber;
  } else if (toNumber.startsWith('91') && toNumber.length === 12) {
    toNumber = toNumber.slice(2);
  }

  const message = `Hey ${friendName}, ${dressName} has been added for voting on TrendCart. Please vote! - TrendCart`;

  try {
    const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
      route: 'v3',
      sender_id: 'TXTIND',
      message: message,
      language: 'english',
      numbers: toNumber
    }, {
      headers: {
        'authorization': FAST2SMS_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log(`SMS sent to ${friendName} (${toNumber})`, response.data);
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Fast2SMS error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to send SMS', details: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});