// Node.js Example
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const apiKey = process.env.OPENAI_API_KEY;

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',
    messages: [{ role: 'user', content: message }],
  }, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });
  res.json(response.data);
});

app.listen(3000, () => console.log('Server running on port 3000'));