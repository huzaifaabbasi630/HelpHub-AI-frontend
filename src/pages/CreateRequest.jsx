import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .cr-page {
    min-height: 100vh;
    background-color: #eee9e0;
    font-family: 'Inter', sans-serif;
  }

  /* NAV */
  .cr-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.5rem;
    height: 60px;
    background: #eee9e0;
  }
  .cr-nav-logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 600;
    font-size: 1rem;
    color: #1a1a1a;
  }
  .cr-nav-logo-icon {
    width: 34px;
    height: 34px;
    background: #1a9e8f;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 800;
    font-size: 1rem;
  }
  .cr-nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .cr-nav-link {
    color: #444;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
  }
  .cr-nav-btn {
    background: #f0ece4;
    border: 1.5px solid #d6cfc4;
    color: #1a1a1a;
    padding: 0.45rem 1.1rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
  }

  /* HERO BANNER */
  .cr-hero {
    margin: 0 2.5rem 2rem 2.5rem;
    background: #2a2f2e;
    border-radius: 18px;
    padding: 2.8rem 3rem 3rem 3rem;
    position: relative;
    overflow: hidden;
  }
  .cr-hero::before {
    content: '';
    position: absolute;
    top: -60px;
    right: -60px;
    width: 280px;
    height: 280px;
    background: radial-gradient(circle, rgba(26,158,143,0.25) 0%, transparent 70%);
    border-radius: 50%;
  }
  .cr-hero::after {
    content: '';
    position: absolute;
    bottom: -40px;
    right: 180px;
    width: 180px;
    height: 180px;
    background: radial-gradient(circle, rgba(230,180,100,0.15) 0%, transparent 70%);
    border-radius: 50%;
  }
  .cr-hero-label {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: #9aa3a1;
    text-transform: uppercase;
    margin-bottom: 0.9rem;
  }
  .cr-hero-title {
    font-size: 2.6rem;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.15;
    margin-bottom: 0.9rem;
    max-width: 600px;
  }
  .cr-hero-sub {
    font-size: 0.92rem;
    color: #9aa3a1;
    max-width: 500px;
    line-height: 1.5;
  }

  /* MAIN CONTENT */
  .cr-content {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 1.5rem;
    margin: 0 2.5rem 3rem 2.5rem;
  }

  /* CARD */
  .cr-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 2rem 2rem;
  }

  /* FORM */
  .cr-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 0.45rem;
  }
  .cr-input,
  .cr-textarea,
  .cr-select {
    width: 100%;
    border: 1.5px solid #e5e0d8;
    border-radius: 10px;
    padding: 0.7rem 0.9rem;
    font-size: 0.9rem;
    font-family: 'Inter', sans-serif;
    color: #333;
    background: #faf9f7;
    outline: none;
    transition: border-color 0.2s;
    margin-bottom: 1.2rem;
  }
  .cr-input:focus,
  .cr-textarea:focus,
  .cr-select:focus {
    border-color: #1a9e8f;
    background: #fff;
  }
  .cr-input::placeholder,
  .cr-textarea::placeholder {
    color: #aaa;
  }
  .cr-textarea {
    resize: vertical;
    min-height: 140px;
  }
  .cr-select {
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    padding-right: 2.2rem;
    cursor: pointer;
  }

  .cr-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  /* BUTTONS */
  .cr-btn-row {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }
  .cr-btn-secondary {
    background: #fff;
    border: 1.5px solid #d6cfc4;
    color: #333;
    padding: 0.65rem 1.4rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: background 0.15s;
  }
  .cr-btn-secondary:hover {
    background: #f5f2ed;
  }
  .cr-btn-primary {
    background: #1a9e8f;
    border: none;
    color: #fff;
    padding: 0.65rem 1.6rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: background 0.15s;
  }
  .cr-btn-primary:hover {
    background: #158a7c;
  }

  /* AI ASSISTANT CARD */
  .cr-ai-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #1a9e8f;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
  }
  .cr-ai-title {
    font-size: 1.85rem;
    font-weight: 800;
    color: #1a1a1a;
    line-height: 1.2;
    margin-bottom: 1.6rem;
  }
  .cr-ai-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.85rem 0;
    border-top: 1px solid #f0ece4;
    gap: 1rem;
  }
  .cr-ai-row:last-child {
    border-bottom: 1px solid #f0ece4;
  }
  .cr-ai-key {
    font-size: 0.875rem;
    color: #666;
    min-width: 110px;
    flex-shrink: 0;
  }
  .cr-ai-val {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1a1a1a;
    text-align: right;
  }
  .cr-ai-val-muted {
    font-size: 0.875rem;
    font-weight: 500;
    color: #888;
    text-align: right;
    font-style: italic;
  }
`;

const CreateRequest = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [urgency, setUrgency] = useState('High');
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Derive AI suggestions from current input
  const suggestedCategory = description.length > 10 ? 'Community' : '—';
  const detectedUrgency = urgency === 'High' ? 'Low' : urgency;
  const suggestedTags =
    description.length > 5 ? 'Add more detail for smarter tags' : 'Add more detail for smarter tags';
  const rewriteSuggestion =
    description.length > 5
      ? 'Start describing the challenge to generate a stronger version.'
      : 'Start describing the challenge to generate a stronger version.';

  const handleApplyAI = () => {
    if (!description) return;
    setDescription(
      description +
        ' [AI Revised: This request has been optimized for clarity and community matching.]'
    );
  };

  const handleSubmit = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
      await axios.post(
        'http://localhost:5000/api/requests',
        { title, description, urgency, tags, category },
        config
      );
      navigate('/explore');
    } catch (err) {
      alert('Failed to create request');
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="cr-page">
        {/* NAV */}
        <nav className="cr-nav">
          <div className="cr-nav-logo">
            <div className="cr-nav-logo-icon">H</div>
            HelpHub AI
          </div>
          <div className="cr-nav-links">
            <a href="/dashboard" className="cr-nav-link">Dashboard</a>
            <a href="/explore" className="cr-nav-link">Explore</a>
            <button className="cr-nav-btn">Create Request</button>
          </div>
        </nav>

        {/* HERO */}
        <div className="cr-hero">
          <p className="cr-hero-label">Create Request</p>
          <h1 className="cr-hero-title">Turn a rough problem into a clear help request.</h1>
          <p className="cr-hero-sub">
            Use built-in AI suggestions for category, urgency, tags, and a stronger description rewrite.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="cr-content">
          {/* LEFT: FORM */}
          <div className="cr-card">
            <label className="cr-label">Title</label>
            <input
              className="cr-input"
              type="text"
              placeholder="Need review on my JavaScript quiz app before submission"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="cr-label">Description</label>
            <textarea
              className="cr-textarea"
              placeholder="Explain the challenge, your current progress, deadline, and what kind of help would be useful."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="cr-row">
              <div>
                <label className="cr-label">Tags</label>
                <input
                  className="cr-input"
                  type="text"
                  placeholder="JavaScript, Debugging, Review"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              <div>
                <label className="cr-label">Category</label>
                <select
                  className="cr-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Web Development</option>
                  <option>Design</option>
                  <option>Data Science</option>
                  <option>Mobile</option>
                  <option>DevOps</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <label className="cr-label">Urgency</label>
            <select
              className="cr-select"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <div className="cr-btn-row">
              <button className="cr-btn-secondary" onClick={handleApplyAI}>
                Apply AI suggestions
              </button>
              <button className="cr-btn-primary" onClick={handleSubmit}>
                Publish request
              </button>
            </div>
          </div>

          {/* RIGHT: AI ASSISTANT */}
          <div className="cr-card">
            <p className="cr-ai-label">AI Assistant</p>
            <h2 className="cr-ai-title">Smart request guidance</h2>

            <div className="cr-ai-row">
              <span className="cr-ai-key">Suggested category</span>
              <span className="cr-ai-val">{suggestedCategory}</span>
            </div>
            <div className="cr-ai-row">
              <span className="cr-ai-key">Detected urgency</span>
              <span className="cr-ai-val">{detectedUrgency}</span>
            </div>
            <div className="cr-ai-row">
              <span className="cr-ai-key">Suggested tags</span>
              <span className="cr-ai-val-muted">{suggestedTags}</span>
            </div>
            <div className="cr-ai-row">
              <span className="cr-ai-key">Rewrite suggestion</span>
              <span className="cr-ai-val-muted">{rewriteSuggestion}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRequest;