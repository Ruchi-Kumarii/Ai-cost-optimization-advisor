const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const newFeedback = new Feedback({ rating, comment });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving feedback', error });
  }
});

module.exports = router;
