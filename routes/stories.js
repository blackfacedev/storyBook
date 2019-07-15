const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');

// get all sttories
router.get('/', (req, res) => {
  res.render('stories/index');
});

// add an story
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

// post a story
router.post('/', (req, res) => {
  let allowComments;

  if (req.body.allowComments) {
    allowComments: true;
  } else {
    allowComments: false;
  }
  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  };

  // create story
  new Story(newStory).save().then(story => {
    res.redirect(`/stories/show/${story.id}`);
  });
});

module.exports = router;
