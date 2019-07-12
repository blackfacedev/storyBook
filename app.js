const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// load User Model
require('./models/User');

// Passport config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');

// Use routes
app.use('/auth', auth);

// load keys
const keys = require('./config/keys');

// mongoDB connect
mongoose
  .connect(keys.mongoURI)
  .then(() => {
    console.log('==> MongoDB Connected....');
  })
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

app.get('/', (req, res) => {
  res.send('It works');
});

// ======== Everything above =========
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`==> Server running on port ${port}`);
});
