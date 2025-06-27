import React from 'react';
import './footer.css';

const Footer = React.forwardRef((props, ref) => (
  <footer ref={ref} className="footer">
    <div className="footer-section">
      <h3>About Us</h3>
      <p>
        At <strong>AI Cost Advisor</strong>, we specialize in helping enterprises make smarter decisions
        about their Large Language Model (LLM) usage. From optimizing model selection based on cost,
        performance, and ROI to tracking budget consumption in real time, our goal is to maximize
        AI value while minimizing spend.
      </p>
      <p>
        Our smart agent-based recommendations make it easy to adapt, compare models, and align AI
        investments with business objectives — all in one dashboard.
      </p>
    </div>

    <div className="footer-section">
      <h3>Contact Us</h3>
      <p>Email: <a href="mailto:support@aicostadvisor.com">support@aicostadvisor.com</a></p>
      <p>Phone: +91-9876543210</p>
      <p>Location: Banasthali Vidyapith, Rajasthan, India</p>
      <p>Support Hours: Mon - Fri, 10am - 6pm IST</p>
    </div>

    <div className="footer-bottom">
      <p>&copy; 2025 AI Cost Advisor. API powered by OpenRouter.</p>
    </div>
  </footer>
));
export default Footer;
