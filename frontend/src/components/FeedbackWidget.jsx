// components/FeedbackWidget.jsx
import React, { useState } from 'react';
import './FeedbackWidget.css';

const FeedbackWidget = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const handleRating = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    if (rating === 0 && comment.trim() === '') return;

    console.log('Feedback Submitted:', { rating, comment });

    // Reset state
    setRating(0);
    setComment('');
    setShowPopup(false);
    setShowThankYou(true);

    // Hide thank you bubble after 4 seconds
    setTimeout(() => {
      setShowThankYou(false);
    }, 4000);
  };

  return (
    <>
      <button className="feedback-fab" onClick={() => setShowPopup(true)}>💬</button>

      {showPopup && (
        <div className="feedback-popup">
          <div className="results-header">
            <h3>Share your feedback</h3>
            <button className="close-btn" onClick={() => setShowPopup(false)}>✖</button>
          </div>

          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`star ${i < rating ? 'active' : ''}`}
                onClick={() => handleRating(i)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            placeholder="Any suggestions or feedback?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />

          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {showThankYou && (
        <div className="thank-you-bubble">
          🎉 Thank you for your feedback!
        </div>
      )}
    </>
  );
};

export default FeedbackWidget;