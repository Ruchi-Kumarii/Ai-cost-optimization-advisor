const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  rating: Number,
  comment: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
