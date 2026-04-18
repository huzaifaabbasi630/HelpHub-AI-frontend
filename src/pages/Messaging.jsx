import React, { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .msg-page {
    min-height: 100vh;
    background-color: #eee9e0;
    font-family: 'Inter', sans-serif;
  }

  /* NAV */
  .msg-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.5rem;
    height: 60px;
    background: #eee9e0;
  }
  .msg-nav-logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 600;
    font-size: 1rem;
    color: #1a1a1a;
    text-decoration: none;
  }
  .msg-nav-logo-icon {
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
  .msg-nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .msg-nav-link {
    color: #444;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
  }
  .msg-nav-btn {
    background: #f0ece4;
    border: 1.5px solid #d6cfc4;
    color: #1a1a1a;
    padding: 0.45rem 1.1rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
  }

  /* HERO */
  .msg-hero {
    margin: 0 2.5rem 2rem 2.5rem;
    background: #2a2f2e;
    border-radius: 18px;
    padding: 2.8rem 3rem 3rem 3rem;
    position: relative;
    overflow: hidden;
  }
  .msg-hero::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 280px; height: 280px;
    background: radial-gradient(circle, rgba(26,158,143,0.25) 0%, transparent 70%);
    border-radius: 50%;
  }
  .msg-hero::after {
    content: '';
    position: absolute;
    bottom: -40px; right: 180px;
    width: 180px; height: 180px;
    background: radial-gradient(circle, rgba(230,180,100,0.15) 0%, transparent 70%);
    border-radius: 50%;
  }
  .msg-hero-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #9aa3a1;
    text-transform: uppercase;
    margin-bottom: 0.9rem;
  }
  .msg-hero-title {
    font-size: 2.6rem;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.15;
    margin-bottom: 0.9rem;
    max-width: 680px;
  }
  .msg-hero-sub {
    font-size: 0.92rem;
    color: #9aa3a1;
    max-width: 520px;
    line-height: 1.5;
  }

  /* GRID */
  .msg-content {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 1.5rem;
    margin: 0 2.5rem 3rem 2.5rem;
  }

  /* CARD */
  .msg-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 2rem;
  }

  /* LEFT CARD */
  .msg-section-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #1a9e8f;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
  }
  .msg-section-title {
    font-size: 1.85rem;
    font-weight: 800;
    color: #1a1a1a;
    line-height: 1.2;
    margin-bottom: 1.6rem;
  }

  /* MESSAGE ITEM */
  .msg-item {
    border: 1.5px solid #eee9e0;
    border-radius: 12px;
    padding: 1.1rem 1.3rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    cursor: pointer;
    transition: background 0.15s;
  }
  .msg-item:hover { background: #faf9f7; }
  .msg-item-body { flex: 1; }
  .msg-item-from {
    font-size: 0.9rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.35rem;
  }
  .msg-item-preview {
    font-size: 0.85rem;
    color: #666;
    line-height: 1.45;
  }
  .msg-item-time {
    font-size: 0.78rem;
    font-weight: 600;
    color: #555;
    background: #eee9e0;
    border-radius: 999px;
    padding: 0.35rem 0.7rem;
    text-align: center;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* RIGHT CARD — SEND FORM */
  .msg-right-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #1a9e8f;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
  }
  .msg-right-title {
    font-size: 1.85rem;
    font-weight: 800;
    color: #1a1a1a;
    line-height: 1.2;
    margin-bottom: 1.6rem;
  }
  .msg-field-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 0.45rem;
  }
  .msg-select,
  .msg-textarea {
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
  .msg-select:focus, .msg-textarea:focus {
    border-color: #1a9e8f;
    background: #fff;
  }
  .msg-select {
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    padding-right: 2.2rem;
    cursor: pointer;
  }
  .msg-textarea {
    resize: vertical;
    min-height: 130px;
  }
  .msg-textarea::placeholder { color: #aaa; }
  .msg-send-btn {
    width: 100%;
    background: #1a9e8f;
    border: none;
    color: #fff;
    padding: 0.85rem 1.6rem;
    border-radius: 999px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: background 0.15s;
  }
  .msg-send-btn:hover { background: #158a7c; }
`;

const CONVERSATIONS = [
  {
    id: 1,
    from: 'Ayesha Khan',
    to: 'Sara Noor',
    preview: 'I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.',
    time: '09:45 AM',
  },
  {
    id: 2,
    from: 'Hassan Ali',
    to: 'Ayesha Khan',
    preview: 'Your event poster concept is solid. I would tighten the CTA and reduce the background texture.',
    time: '11:10 AM',
  },
];

const CONTACTS = ['Ayesha Khan', 'Hassan Ali', 'Sara Noor', 'Ali Raza'];

const Messaging = () => {
  const [to, setTo] = useState('Ayesha Khan');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setMessage('');
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="msg-page">

        {/* NAV */}
        <nav className="msg-nav">
          <a href="/" className="msg-nav-logo">
            <div className="msg-nav-logo-icon">H</div>
            HelpHub AI
          </a>
          <div className="msg-nav-links">
            <a href="/dashboard" className="msg-nav-link">Dashboard</a>
            <a href="/explore" className="msg-nav-link">Explore</a>
            <button className="msg-nav-btn">Messages</button>
          </div>
        </nav>

        {/* HERO */}
        <div className="msg-hero">
          <p className="msg-hero-label">Interaction / Messaging</p>
          <h1 className="msg-hero-title">Keep support moving through direct communication.</h1>
          <p className="msg-hero-sub">
            Basic messaging gives helpers and requesters a clear follow-up path once a match happens.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="msg-content">

          {/* LEFT — CONVERSATION STREAM */}
          <div className="msg-card">
            <p className="msg-section-label">Conversation Stream</p>
            <h2 className="msg-section-title">Recent messages</h2>

            {CONVERSATIONS.map((c) => (
              <div className="msg-item" key={c.id}>
                <div className="msg-item-body">
                  <p className="msg-item-from">{c.from} → {c.to}</p>
                  <p className="msg-item-preview">{c.preview}</p>
                </div>
                <div className="msg-item-time">{c.time.replace(' ', '\n')}</div>
              </div>
            ))}
          </div>

          {/* RIGHT — SEND MESSAGE */}
          <div className="msg-card">
            <p className="msg-right-label">Send Message</p>
            <h2 className="msg-right-title">Start a conversation</h2>

            <label className="msg-field-label">To</label>
            <select
              className="msg-select"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {CONTACTS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <label className="msg-field-label">Message</label>
            <textarea
              className="msg-textarea"
              placeholder="Share support details, ask for files, or suggest next steps."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button className="msg-send-btn" onClick={handleSend}>
              {sent ? '✓ Sent!' : 'Send'}
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Messaging;