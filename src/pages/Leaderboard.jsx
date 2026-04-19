import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/apiConfig';

const avatarColors = [
    '#0d2a22', '#e97316', '#3b82f6', '#8b5cf6', '#ec4899', '#0f7b5e',
];

const getInitials = (name = '') =>
    name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

const TrustBar = ({ score }) => {
    const pct = Math.min(100, Math.max(0, score));
    return (
        <div style={{ width: '100%', height: 6, background: '#e5e7eb', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{
                height: '100%',
                width: `${pct}%`,
                borderRadius: 99,
                background: 'linear-gradient(to right, #eab308 0%, #4d7c0f 50%, #0f7b5e 100%)',
            }} />
        </div>
    );
};

const Leaderboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const { data } = await API.get('/api/user/leaderboard');
                setUsers(data);
            } catch (err) {
                console.error("Error fetching leaderboard:", err);
                // Fallback data agar API fail ho jaye
                setUsers([
                    { _id: '1', name: 'Ayesha Khan', trustScore: 95, contributions: 32, skills: ['Figma', 'UI/UX', 'HTML/CSS'], badges: ['Design Ally', 'Fast Responder', 'Top Mentor'] },
                    { _id: '2', name: 'Hassan Ali', trustScore: 88, contributions: 24, skills: ['JavaScript', 'React', 'Git/GitHub'], badges: ['Code Rescuer', 'Bug Hunter'] },
                    { _id: '3', name: 'Sara Noor', trustScore: 74, contributions: 11, skills: ['Python', 'Data Analysis'], badges: ['Community Voice'] },
                ]);
            }
        };
        fetchRankings();
    }, []);

    const ranked = [...users].sort((a, b) => (b.trustScore || 0) - (a.trustScore || 0));

    return (
        <div style={{ background: 'linear-gradient(135deg,#e0f0e8 0%,#f5f0e8 45%,#fce8d8 100%)', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
            <style>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }

                /* Navbar */
                .lb-nav {
                    display: flex; align-items: center;
                    justify-content: space-between;
                    padding: 1.2rem 2.5rem;
                }
                .nav-brand {
                    display: flex; align-items: center; gap: 10px;
                    text-decoration: none;
                }
                .brand-box {
                    width: 36px; height: 36px; background: #0f7b5e;
                    border-radius: 8px; display: flex; align-items: center;
                    justify-content: center; color: white; font-weight: 800;
                }
                .nav-links { display: flex; gap: 0.5rem; list-style: none; align-items: center; }
                .nav-links a {
                    text-decoration: none; color: #555; font-size: 0.9rem;
                    font-weight: 500; padding: 0.5rem 1.2rem; border-radius: 2rem;
                    transition: all 0.2s ease;
                }
                .nav-links a:hover { color: #0f7b5e; background: rgba(15, 123, 94, 0.05); }
                .nav-links a.active {
                    background: #e8f5f0; color: #0d6a50; font-weight: 700;
                }

                /* Hero Section */
                .hero-banner {
                    background: #1a2e2a; border-radius: 1.8rem;
                    margin: 0.5rem 2.5rem 2rem;
                    padding: 3.5rem 4rem; color: white;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                }
                .hero-eyebrow {
                    font-size: 0.7rem; font-weight: 800;
                    letter-spacing: 2.5px; opacity: 0.6;
                    text-transform: uppercase; margin-bottom: 1.2rem;
                }
                .hero-title {
                    font-size: 3.2rem; font-weight: 800;
                    letter-spacing: -1.5px; line-height: 1.1;
                    margin-bottom: 1.2rem; max-width: 750px;
                }
                .hero-sub { font-size: 1rem; opacity: 0.7; line-height: 1.6; max-width: 600px; }

                /* Grid Layout */
                .content-grid {
                    display: grid;
                    grid-template-columns: 1.1fr 0.9fr;
                    gap: 1.5rem;
                    padding: 0 2.5rem 4rem;
                    max-width: 1300px;
                    margin: 0 auto;
                }

                /* Card Styling */
                .lb-card {
                    background: #fdfcf7;
                    border-radius: 2rem;
                    padding: 2.5rem;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.03);
                }
                .card-eyebrow {
                    font-size: 0.7rem; font-weight: 800;
                    letter-spacing: 1.5px; color: #0f7b5e;
                    text-transform: uppercase; margin-bottom: 0.6rem;
                }
                .card-title {
                    font-size: 2.2rem; font-weight: 800;
                    color: #0d2a22; letter-spacing: -0.8px;
                    margin-bottom: 2rem;
                }

                /* List Rows */
                .rank-row {
                    display: flex; align-items: center;
                    justify-content: space-between;
                    padding: 1.2rem 0;
                    border-bottom: 1px solid #f0eee6;
                }
                .rank-row:last-child { border-bottom: none; }
                .rank-left { display: flex; align-items: center; gap: 1.2rem; }
                .rank-num {
                    font-size: 0.9rem; font-weight: 800;
                    color: #9ca3af; min-width: 32px;
                }
                .rank-num.top { color: #111; }
                .avatar {
                    width: 48px; height: 48px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    color: white; font-size: 0.9rem; font-weight: 800;
                    flex-shrink: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                }
                .rank-name { font-size: 1rem; font-weight: 800; color: #0d2a22; }
                .rank-skills { font-size: 0.85rem; color: #6b7280; margin-top: 3px; }
                .rank-right { text-align: right; }
                .rank-score { font-size: 1.1rem; font-weight: 800; color: #0d2a22; }
                .rank-contrib { font-size: 0.8rem; color: #9ca3af; margin-top: 3px; }

                /* Badge Cards */
                .badge-box {
                    background: white;
                    border-radius: 1.2rem;
                    padding: 1.5rem;
                    margin-bottom: 1rem;
                    border: 1px solid rgba(0,0,0,0.03);
                    transition: transform 0.2s;
                }
                .badge-box:hover { transform: translateY(-2px); }
                .badge-user-name { font-size: 1.1rem; font-weight: 800; color: #0d2a22; margin-bottom: 5px; }
                .badge-list { font-size: 0.85rem; color: #0f7b5e; font-weight: 600; margin-bottom: 1rem; display: block; }

                @media (max-width: 900px) {
                    .content-grid { grid-template-columns: 1fr; }
                    .hero-banner { padding: 2.5rem; margin: 0.5rem 1.2rem; }
                    .hero-title { font-size: 2.2rem; }
                    .lb-nav { padding: 1rem 1.5rem; }
                    .content-grid { padding: 0 1.2rem 3rem; }
                }
            `}</style>

            {/* Navbar */}
            <nav className="lb-nav">
                <Link to="/" className="nav-brand">
                    <div className="brand-box">H</div>
                    <span style={{ fontWeight: 800, color: '#0d2a22', fontSize: '1.1rem' }}>HelpHub AI</span>
                </Link>
                <ul className="nav-links">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/explore">Explore</Link></li>
                    <li><Link to="/leaderboard" className="active">Leaderboard</Link></li>
                    <li><Link to="/notifications">Notifications</Link></li>
                </ul>
            </nav>

            {/* Hero Section */}
            <div className="hero-banner">
                <p className="hero-eyebrow">Leaderboard</p>
                <h1 className="hero-title">Recognize the people who keep the community moving.</h1>
                <p className="hero-sub">Trust score, contribution count, and badges create visible momentum for our most reliable community helpers.</p>
            </div>

            {/* Content Grid */}
            <div className="content-grid">

                {/* Left Column: Rankings */}
                <div className="lb-card">
                    <p className="card-eyebrow">Top Helpers</p>
                    <h2 className="card-title">Rankings</h2>

                    {ranked.map((user, i) => (
                        <div key={user._id} className="rank-row">
                            <div className="rank-left">
                                <span className={`rank-num${i < 3 ? ' top' : ''}`}>#{i + 1}</span>
                                <div
                                    className="avatar"
                                    style={{ background: avatarColors[i % avatarColors.length] }}
                                >
                                    {getInitials(user.name)}
                                </div>
                                <div>
                                    <p className="rank-name">{user.name}</p>
                                    <p className="rank-skills">
                                        {Array.isArray(user.skills)
                                            ? user.skills.slice(0, 3).join(', ')
                                            : (user.skills || 'Community Member')}
                                    </p>
                                </div>
                            </div>
                            <div className="rank-right">
                                <p className="rank-score">{user.trustScore ?? 0}%</p>
                                <p className="rank-contrib">{user.contributions ?? 0} contributions</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Badge System */}
                <div className="lb-card">
                    <p className="card-eyebrow">Badge System</p>
                    <h2 className="card-title">Trust and achievement</h2>

                    {ranked.map((user) => (
                        <div key={user._id} className="badge-box">
                            <p className="badge-user-name">{user.name}</p>
                            <span className="badge-list">
                                {Array.isArray(user.badges) && user.badges.length
                                    ? user.badges.join(' • ')
                                    : 'Rising Star'}
                            </span>
                            <TrustBar score={user.trustScore ?? 0} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Leaderboard;