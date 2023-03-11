const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// add cors middleware
app.use(cors());

const port = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/userdata', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userDataSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const UserData = mongoose.model('UserData', userDataSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  const userData = new UserData({ name, email });
  try {
    await userData.save();
    res.status(201).send({ message: 'User data saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error saving user data.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
