import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("Your quote will appear here...");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const generateQuote = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:5000/api/quote");
      setQuote(response.data.quote);
    } catch (err) {
      setError("❌ Failed to generate quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyQuote = () => {
    navigator.clipboard.writeText(quote);
    alert("✅ Quote copied!");
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="card">

        <div className="top-bar">
          <h1>✨ AI Quote Generator</h1>

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <button
          className="generate-btn"
          onClick={generateQuote}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Quote"}
        </button>

        {error && <p className="error">{error}</p>}

        <div className="quote-box">
          {loading ? (
            <p>⏳ AI is thinking...</p>
          ) : (
            <p>{quote}</p>
          )}
        </div>

        <button
          className="copy-btn"
          onClick={copyQuote}
        >
          📋 Copy Quote
        </button>

      </div>
    </div>
  );
}

export default App;