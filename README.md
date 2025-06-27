# Ai-cost-optimization-advisor
A React-based AI Cost Optimization Dashboard with smart recommendations, cost comparison, and feedback widget


✨ Features
@ Smart recommendations for selecting cost-effective AI models  
@ Model cost comparison table with dynamic calculation  
@ Clean and modern UI with responsive design  
@ Background animations and welcome screen  
@ Feedback widget with rating and suggestions  
@ Header with Documentation, About, and Help sections  
@ Fully modular React components and organized CSS

📸 Screenshots
![Screenshot 2025-06-27 185523](https://github.com/user-attachments/assets/693a5052-86fd-42cf-a2b9-f56c9b9a2c75)
![Screenshot 2025-06-27 185451](https://github.com/user-attachments/assets/592e669f-c177-492c-861f-af0a8d9245b0)
![Screenshot 2025-06-27 185434](https://github.com/user-attachments/assets/adca5d9c-f595-43b9-8571-2eb3cecacc44)

🛠️ Tech Stack
-Frontend:  React.js, HTML5, CSS3  
- Styling:  Custom CSS (`app.css`)  
- API:      OpenRouter AI for recommendations  
- Backend:  Express.js + MongoDB for storing feedback

🚀 Getting Started

Follow these steps to run the project locally:

```bash
# Clone the repository
git clone https://github.com/Ruchi-Kumarii/Ai-cost-optimization-advisor.git


# Move into the project folder
cd ai-cost-optimization-advisor

# Install dependencies
npm install

# Run the app
npm start
**The app will run at http://localhost:3000**

Create a .env file in your frontend root and add:
REACT_APP_OR_API_KEY=YOUR_OPENROUTER_API_KEY


📁 Folder Structure
ai-cost-advisor/
│
├── backend/                        # Node.js + Express backend for feedback handling
│   ├── models/
│   │   └── feedback.js             # Mongoose schema for storing user feedback
│   ├── routes/
│   │   └── feedbackRoutes.js       # API routes to handle feedback submissions
│   ├── node_modules/              # Backend dependencies (created via npm install)
│   ├── .env                        # Environment variables (Mongo URI etc.)
│   ├── package.json                # Backend scripts and dependencies
│   └── server.js                   # Main Express server file
│
├── frontend/                       # React frontend for AI Cost Advisor Dashboard
│   ├── build/
│   │   ├── background.mp4          # Background video for UI
│   │   ├── favicon.ico             # App favicon
│   │   └── hello.mp4               # Welcome animation video           
│   ├── public/                     # Public assets and HTML template
│   ├── src/                        # React components, App.js, styling etc.
│   ├── .env                        # Environment variables (REACT_APP_OR_API_KEY)
│   ├── package.json                # Frontend scripts and dependencies
│   └── package-lock.json           # Frontend dependency lock file
│
├── docs/                           # Optional: for additional documentation/screenshots
│
└── README.md                       # Project documentation (this file)


📬 Feedback & Contributions
Feel free to fork the project, submit pull requests, or open issues for feature requests and bug fixes.
Your feedback is welcome! ⭐

 Author
**Ruchi Mishra**
- 📧 Email: 32kuamriruchi@gmail.com
- 🌐 LinkedIn: [https://linkedin.com/in/ruchi-mishra]
- 🏆 Made with ❤️ for hackathons and learning


