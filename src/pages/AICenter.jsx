import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const aiInsights = {
    trendPulse: {
        category: 'Web Development',
        description: 'Most common support area based on active community requests.',
    },
    urgencyWatch: {
        count: 2,
        description: 'Requests currently flagged high priority by the urgency detector.',
    },
    mentorPool: {
        count: 2,
        description: 'Trusted helpers with strong response history and contribution signals.',
    },
};

const recommendations = [
    {
        id: 1,
        title: 'Need help',
        summary: 'AI summary: Web Development request with high urgency. Best suited for members with relevant expertise.',
        tags: ['Web Development', 'High'],
    },
    {
        id: 2,
        title: 'Need help making my portfolio responsive before demo day',
        summary: 'Responsive layout issue with a short deadline. Best helpers are frontend mentors comfortable with CSS grids and media queries.',
        tags: ['Web Development', 'High'],
    },
    {
        id: 3,
        title: 'Looking for Figma feedback on a volunteer event poster',
        summary: 'A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value.',
        tags: ['Design', 'Medium'],
    },
    {
        id: 4,
        title: 'Need mock interview support for internship applications',
        summary: 'Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews.',
        tags: ['Career', 'Low'],
    },
];

const tagColors = {
    High: { bg: '#e8f5f0', color: '#0d6a50' },
    Medium: { bg: '#e8f5f0', color: '#0d6a50' },
    Low: { bg: '#e8f5f0', color: '#0d6a50' },
    'Web Development': { bg: '#e8f5f0', color: '#0d6a50' },
    Design: { bg: '#e8f5f0', color: '#0d6a50' },
    Career: { bg: '#e8f5f0', color: '#0d6a50' },
};

const AICenter = () => {
    return (
        <>
            <style>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }

                body {
                    font-family: 'Segoe UI', sans-serif;
                    background: linear-gradient(135deg, #e0f0e8 0%, #f5f0e8 45%, #fce8d8 100%);
                    min-height: 100vh;
                }

                .ai-page { min-height: 100vh; display: flex; flex-direction: column; }

                /* ── Hero Banner ── */
                .hero-banner {
                    background: #0d2a22;
                    border-radius: 1.4rem;
                    margin: 2rem 2.5rem 0;
                    padding: 2.8rem 3rem;
                    color: white;
                }

                .hero-eyebrow {
                    text-transform: uppercase;
                    font-size: 0.72rem;
                    letter-spacing: 2.5px;
                    font-weight: 700;
                    opacity: 0.6;
                    margin-bottom: 1rem;
                }

                .hero-title {
                    font-size: 3rem;
                    font-weight: 800;
                    line-height: 1.1;
                    margin-bottom: 1rem;
                    letter-spacing: -0.5px;
                    max-width: 680px;
                }

                .hero-subtitle {
                    font-size: 0.95rem;
                    opacity: 0.7;
                    line-height: 1.6;
                }

                /* ── Navbar ── */
                .navbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.1rem 2.5rem;
                    background: transparent;
                }

                .navbar-brand {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                    color: #111;
                    font-weight: 700;
                    font-size: 1rem;
                }

                .brand-icon {
                    width: 36px;
                    height: 36px;
                    background: #0f7b5e;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 800;
                    font-size: 1rem;
                }

                .navbar-links {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    list-style: none;
                }

                .navbar-links a {
                    text-decoration: none;
                    color: #555;
                    font-size: 0.9rem;
                    font-weight: 500;
                    padding: 0.45rem 1rem;
                    border-radius: 2rem;
                    transition: background 0.2s, color 0.2s;
                }

                .navbar-links a:hover { color: #0f7b5e; }

                .navbar-links a.active {
                    background: #e8f5f0;
                    color: #0d6a50;
                    font-weight: 600;
                }

                /* ── Content Area ── */
                .content-area {
                    padding: 0 2.5rem 3rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                /* ── Stat Cards Row ── */
                .stat-cards {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .stat-card {
                    flex: 1;
                    min-width: 220px;
                    background: #fcfaf2;
                    border-radius: 1.2rem;
                    padding: 2rem;
                    border: 1px solid rgba(0,0,0,0.05);
                }

                .stat-card .card-eyebrow {
                    text-transform: uppercase;
                    font-size: 0.68rem;
                    letter-spacing: 2px;
                    font-weight: 700;
                    color: #0f7b5e;
                    margin-bottom: 1rem;
                }

                .stat-card .card-value {
                    font-size: 2.8rem;
                    font-weight: 800;
                    color: #111827;
                    line-height: 1;
                    margin-bottom: 0.7rem;
                }

                .stat-card .card-label {
                    font-size: 1.35rem;
                    font-weight: 800;
                    color: #111827;
                    line-height: 1.2;
                    margin-bottom: 0.7rem;
                }

                .stat-card .card-desc {
                    font-size: 0.85rem;
                    color: #6b7280;
                    line-height: 1.55;
                }

                /* ── Recommendations Section ── */
                .recommendations {
                    background: #f7f5ed;
                    border-radius: 1.4rem;
                    padding: 2.5rem;
                }

                .rec-eyebrow {
                    text-transform: uppercase;
                    font-size: 0.68rem;
                    letter-spacing: 2px;
                    font-weight: 700;
                    color: #0f7b5e;
                    margin-bottom: 0.8rem;
                }

                .rec-title {
                    font-size: 2rem;
                    font-weight: 800;
                    color: #111827;
                    margin-bottom: 1.8rem;
                    letter-spacing: -0.3px;
                }

                .rec-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .rec-card {
                    background: #fff;
                    border-radius: 1rem;
                    padding: 1.4rem 1.6rem;
                    border: 1px solid rgba(0,0,0,0.05);
                }

                .rec-card-title {
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 0.5rem;
                }

                .rec-card-summary {
                    font-size: 0.85rem;
                    color: #6b7280;
                    line-height: 1.55;
                    margin-bottom: 1rem;
                }

                .tag-row {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .tag {
                    font-size: 0.78rem;
                    font-weight: 500;
                    padding: 0.3rem 0.85rem;
                    border-radius: 2rem;
                    border: 1.5px solid #b2d8cc;
                    color: #0d6a50;
                    background: transparent;
                }

                @media (max-width: 700px) {
                    .hero-banner { margin: 1rem 1rem 0; padding: 2rem; }
                    .hero-title { font-size: 2rem; }
                    .navbar { padding: 1rem 1rem; }
                    .content-area { padding: 0 1rem 2rem; }
                    .stat-cards { flex-direction: column; }
                    .recommendations { padding: 1.5rem; }
                }
            `}</style>

            <div className="ai-page">

                {/* Hero Banner */}
                <div className="hero-banner">
                    <p className="hero-eyebrow">AI Center</p>
                    <h1 className="hero-title">See what the platform intelligence is noticing.</h1>
                    <p className="hero-subtitle">AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations.</p>
                </div>

                {/* Navbar */}
                <nav className="navbar">
                    <a href="/" className="navbar-brand">
                        <div className="brand-icon">H</div>
                        HelpHub AI
                    </a>
                    <ul className="navbar-links">
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/create-request">Create Request</Link></li>
                        <li><Link to="/ai-center" className="active">AI Center</Link></li>
                    </ul>
                </nav>

                {/* Content */}
                <div className="content-area">

                    {/* Stat Cards */}
                    <div className="stat-cards">
                        <div className="stat-card">
                            <p className="card-eyebrow">Trend Pulse</p>
                            <p className="card-label">{aiInsights.trendPulse.category}</p>
                            <p className="card-desc">{aiInsights.trendPulse.description}</p>
                        </div>

                        <div className="stat-card">
                            <p className="card-eyebrow">Urgency Watch</p>
                            <p className="card-value">{aiInsights.urgencyWatch.count}</p>
                            <p className="card-desc">{aiInsights.urgencyWatch.description}</p>
                        </div>

                        <div className="stat-card">
                            <p className="card-eyebrow">Mentor Pool</p>
                            <p className="card-value">{aiInsights.mentorPool.count}</p>
                            <p className="card-desc">{aiInsights.mentorPool.description}</p>
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="recommendations">
                        <p className="rec-eyebrow">AI Recommendations</p>
                        <h2 className="rec-title">Requests needing attention</h2>

                        <div className="rec-list">
                            {recommendations.map((item) => (
                                <div key={item.id} className="rec-card">
                                    <p className="rec-card-title">{item.title}</p>
                                    <p className="rec-card-summary">{item.summary}</p>
                                    <div className="tag-row">
                                        {item.tags.map((tag) => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default AICenter;