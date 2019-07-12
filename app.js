const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// Passport config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');

// Use routes
app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send('It works');
});

// ======== Everything above =========
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
