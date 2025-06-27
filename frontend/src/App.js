import React, { useState, useRef } from 'react';
import './style/app.css';
import Header from './components/Header';
import Footer from './components/Footer';
import FeedbackWidget from './components/FeedbackWidget';

function App() {
  const footerRef = useRef(null);
  const scrollToFooter = () => {
    setTimeout(() => {
      if (footerRef.current) {
        footerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  const [showDashboard, setShowDashboard] = useState(false);
  const [form, setForm] = useState({
    useCase: '',
    budget: '',
    volume: '',
    priority: '',
    inputTokens: '',
    outputTokens: ''
  });

  const [results, setResults] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRecommendation = async () => {
    setLoading(true);
    setError(null);

    const useCaseRegex = /^[a-zA-Z ,]+$/;
    const budgetRegex = /^\d+$/;

    if (!form.useCase || !form.budget || !form.volume || !form.priority) {
      setError("Please fill in all the fields before submitting.");
      setLoading(false);
      return;
    }

    if (!useCaseRegex.test(form.useCase.trim())) {
      setError("Use case can only contain letters, spaces, and commas.");
      setLoading(false);
      return;
    }

    if (!budgetRegex.test(form.budget) || parseInt(form.budget) <= 0) {
      setError("Budget must be a positive whole number.");
      setLoading(false);
      return;
    }

    const messages = [
      {
        role: "system",
        content: "You are an AI Cost Optimization Advisor."
      },
      {
        role: "user",
        content: `Use case: ${form.useCase}, Budget: ${form.budget}, Volume: ${form.volume}, Priority: ${form.priority}. Suggest suitable models.`
      }
    ];

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OR_API_KEY}`
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
          messages
        })
      });

      const data = await res.json();

      if (data.choices && data.choices.length > 0) {
        const rawText = data.choices[0].message.content;

        const formatted = rawText
          .replace(/^([\s\S]*?)(?=\n\d+\.\s)/, (match) => `<strong>${match.trim()}</strong><br/><br/>`)
          .replace(/(\d+\.\s)([^\n:]+):/g, (_, num, title) => `<br/><strong>${num}${title.trim()}:</strong>`)
          .replace(/\b(cost-effective|efficient|secure|cloud|AI-based|optimize|recommendation|performance|accuracy|latency|deployment|budget|inference)\b/gi, '<strong>$&</strong>');

        setResults(formatted);
      } else {
        throw new Error("Invalid response from OpenRouter API");
      }
    } catch (err) {
      console.error("OpenRouter error:", err);
      setError("Failed to get recommendation. Please check API key and input.");
    }

    setLoading(false);
  };

  const handleComparison = () => {
    const input = parseInt(form.inputTokens || 0);
    const output = parseInt(form.outputTokens || 0);

    if (input < 0 || output < 0) {
      setError("Input and Output tokens must be positive numbers.");
      setComparison(null);
      return;
    }

    const monthlyTokens = input + output;
    const yearlyTokens = monthlyTokens * 12;

    const models = [
      {
        name: 'GPT-3.5 Turbo',
        cost: 0.001,
        speed: 'Fast',
        useCase: 'Text Generation',
        provider: 'OpenAI'
      },
      {
        name: 'Claude 3 Haiku',
        cost: 0.25,
        speed: 'Very Fast',
        useCase: 'Code Generation',
        provider: 'Anthropic'
      },
      {
        name: 'Mistral 7B Instruct',
        cost: 0.002,
        speed: 'Fast',
        useCase: 'Summarization',
        provider: 'Mistral'
      }
    ];

    const enriched = models.map(model => ({
      ...model,
      monthlyCost: `$${(model.cost * monthlyTokens).toFixed(2)}`,
      yearlyCost: `$${(model.cost * yearlyTokens).toFixed(2)}`
    }));

    setComparison(enriched);
  };

  return (
    <div className="app-container">
      <Header scrollToFooter={scrollToFooter} />
      {!showDashboard ? (
        <div className="welcome-page">
          <div className="video-container">
            <video className="welcome-video" src="/hello.mp4" autoPlay loop muted playsInline></video>
          </div>
          <h1 className="welcome-title">Optimize your enterprise AI costs</h1>
          <p className="welcome-subtitle">with smart recommendations in real-time.</p>
          <button className="start-button" onClick={() => setShowDashboard(true)}>Get Started</button>
        </div>
      ) : (
        <div className="main-section">
          <video className="background-animation" src="background.mp4" autoPlay loop muted />
          <div className="main-content">
            <h2 className="section-heading">AI Cost Optimization Dashboard</h2>

            <div className="form-2col">
              <div className="form-left">
                <select className="input-box" name="useCase" value={form.useCase} onChange={handleInputChange}>
                  <option value="">Select Use Case</option>
                  <option value="Text Generation">Text Generation</option>
                  <option value="Code Generation">Code Generation</option>
                  <option value="Translation">Translation</option>
                  <option value="Summarization">Summarization</option>
                </select>

                <select className="input-box" name="priority" value={form.priority} onChange={handleInputChange}>
                  <option value="">Select Priority</option>
                  <option value="Cost Optimization">Cost Optimization</option>
                  <option value="Speed">Speed</option>
                  <option value="Accuracy">Accuracy</option>
                </select>

                <select className="input-box" name="volume" value={form.volume} onChange={handleInputChange}>
                  <option value="">Select Volume</option>
                  <option value="Low">Low (&lt;100K tokens/month)</option>
                  <option value="Medium">Medium (100K–1M tokens/month)</option>
                  <option value="High">High (&gt;1M tokens/month)</option>
                </select>
              </div>

              <div className="form-right">
                <input className="input-box" type="number" name="budget" min="0" placeholder="Monthly Budget ($)" value={form.budget} onChange={handleInputChange} />
                <input className="input-box" type="number" name="inputTokens" min="0" placeholder="Input Tokens/Month" value={form.inputTokens} onChange={handleInputChange} />
                <input className="input-box" type="number" name="outputTokens" min="0" placeholder="Output Tokens/Month" value={form.outputTokens} onChange={handleInputChange} />
              </div>
            </div>

            <div className="button-group">
              <button className="smart-recommend-btn" onClick={handleRecommendation}>Get Smart Recommendation</button>
              <button className="compare-btn" onClick={handleComparison}>Compare Model Costs</button>
            </div>

            {loading && <p className="status-text">Fetching recommendation...</p>}
            {error && <p className="error-text">{error}</p>}

            {results && (
              <div className="results-box">
                <div className="results-header">
                  <h3>Smart Recommendation</h3>
                  <button className="close-btn" onClick={() => setResults(null)}>✖</button>
                </div>
                <div className="formatted-results" dangerouslySetInnerHTML={{ __html: results }} />
              </div>
            )}

          {comparison && (
  <div className="results-box">
    <div className="results-header">
      <h3>Model Cost Comparison</h3>
      <button className="close-btn" onClick={() => setComparison(null)}>✖</button>
    </div>
    <table className="cost-table">
      <thead>
        <tr>
          <th>Model Name</th>
          <th>Cost/1K Tokens</th>
          <th>Speed</th>
          <th>Use Case</th>
          <th>Provider</th>
          <th>Monthly Cost</th>
          <th>Yearly Cost</th>
        </tr>
      </thead>
      <tbody>
        {comparison.map((model, idx) => (
          <tr key={idx}>
            <td><strong>{model.name}</strong></td>
            <td><strong>${model.cost}</strong></td>
            <td>{model.speed}</td>
            <td>{model.useCase}</td>
            <td>{model.provider}</td>
            <td><strong>{model.monthlyCost}</strong></td>
            <td><strong>{model.yearlyCost}</strong></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

          </div>
        </div>
      )}
      <Footer ref={footerRef} />
      {showDashboard && <FeedbackWidget />}
    </div>
  );
}

export default App;
