const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/wl-app', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the User schema
const userSchema = new mongoose.Schema({
  walletAddress: String,
  discordId: String,
  discordUsername: String,
});

const User = mongoose.model('User', userSchema);

// Use body-parser middleware to extract request body
app.use(bodyParser.json());

// Define the API endpoint
app.post('/api/users', async (req, res) => {
  const { walletAddress, discordId, discordUsername } = req.body;

  // Create a new User document and save it to the database
  const user = new User({
    walletAddress,
    discordId,
    discordUsername,
  });

  try {
    await user.save();
    res.status(201).json({ message: 'User data saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving user data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
