const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let userData = [];

app.get('/api/users', (req, res) => {
  res.json(userData);
});

app.post('/api/users', (req, res) => {
  const { walletAddress, discordId, discordUsername } = req.body;
  if (!walletAddress || !discordId || !discordUsername) {
    res.status(400).json({ message: 'Missing user data' });
  } else {
    userData.push({ walletAddress, discordId, discordUsername });
    res.json({ message: 'User data saved successfully' });
  }
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
