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

const FALLBACK = [
    { _id: '1', name: 'Ayesha Khan',  trustScore: 100, contributions: 35, skills: ['Figma','UI/UX','HTML/CSS'], badges: ['Design Ally','Fast Responder','Top Mentor'] },
    { _id: '2', name: 'Hassan Ali',   trustScore: 88,  contributions: 24, skills: ['JavaScript','React','Git/GitHub'], badges: ['Code Rescuer','Bug Hunter'] },
    { _id: '3', name: 'Sara Noor',    trustScore: 74,  contributions: 11, skills: ['Python','Data Analysis'], badges: ['Community Voice'] },
];

const Leaderboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const { data } = await API.get('/api/user/leaderboard');
                setUsers(data);
            } catch (err) {
                console.error(err);
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
                    padding: 1rem 2.5rem;
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
                .nav-links { display: flex; gap: 0.4rem; list-style: none; }
                .nav-links a {
                    text-decoration: none; color: #555; font-size: 0.9rem;
                    font-weight: 500; padding: 0.45rem 1rem; border-radius: 2rem;
                    transition: background 0.2s;
                }
                .nav-links a:hover { color: #0f7b5e; }
                .nav-links a.active {
                    background: #e8f5f0; color: #0d6a50; font-weight: 700;
                }

                /* Hero */
                .hero-banner {
                    background: #0d2a22; border-radius: 1.4rem;
                    margin: 0.5rem 2.5rem 1.5rem;
                    padding: 2.5rem 3rem; color: white;
                }
                .hero-eyebrow {
                    font-size: 0.68rem; font-weight: 800;
                    letter-spacing: 2.5px; opacity: 0.55;
                    text-transform: uppercase; margin-bottom: 0.9rem;
                }
                .hero-title {
                    font-size: 3rem; font-weight: 900;
                    letter-spacing: -1px; line-height: 1.05;
                    margin-bottom: 0.8rem; max-width: 800px;
                }
                .hero-sub { font-size: 0.9rem; opacity: 0.6; }

                /* Content Grid */
                .content-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.2rem;
                    padding: 0 2.5rem 3rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                /* Cards */
                .lb-card {
                    background: #fcfaf2;
                    border-radius: 1.6rem;
                    padding: 2.2rem 2.2rem 1.5rem;
                    display: flex; flex-direction: column;
                }
                .card-eyebrow {
                    font-size: 0.65rem; font-weight: 800;
                    letter-spacing: 2px; color: #0f7b5e;
                    text-transform: uppercase; margin-bottom: 0.5rem;
                }
                .card-title {
                    font-size: 1.9rem; font-weight: 900;
                    color: #0d2a22; letter-spacing: -0.5px;
                    margin-bottom: 1.5rem;
                }

                /* Ranking rows */
                .rank-row {
                    display: flex; align-items: center;
                    justify-content: space-between;
                    padding: 1.1rem 0;
                    border-bottom: 1px solid #f0ede4;
                }
                .rank-row:last-child { border-bottom: none; }
                .rank-left { display: flex; align-items: center; gap: 1rem; }
                .rank-num {
                    font-size: 0.85rem; font-weight: 800;
                    color: #9ca3af; min-width: 28px;
                }
                .rank-num.top { color: #0d2a22; }
                .avatar {
                    width: 42px; height: 42px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    color: white; font-size: 0.85rem; font-weight: 800;
                    flex-shrink: 0;
                }
                .rank-name { font-size: 0.95rem; font-weight: 800; color: #0d2a22; }
                .rank-skills { font-size: 0.78rem; color: #9ca3af; margin-top: 2px; }
                .rank-right { text-align: right; }
                .rank-score { font-size: 1rem; font-weight: 900; color: #0d2a22; }
                .rank-contrib { font-size: 0.75rem; color: #9ca3af; margin-top: 2px; }

                /* Badge rows */
                .badge-row {
                    background: white;
                    border-radius: 1rem;
                    padding: 1.2rem 1.4rem;
                    margin-bottom: 0.8rem;
                }
                .badge-row:last-child { margin-bottom: 0; }
                .badge-name { font-size: 0.95rem; font-weight: 800; color: #0d2a22; margin-bottom: 3px; }
                .badge-tags { font-size: 0.8rem; color: #9ca3af; margin-bottom: 0.7rem; }

                @media (max-width: 800px) {
                    .content-grid { grid-template-columns: 1fr; }
                    .hero-title { font-size: 2rem; }
                    .lb-nav, .hero-banner, .content-grid { padding-left: 1.2rem; padding-right: 1.2rem; }
                    .hero-banner { margin-left: 1rem; margin-right: 1rem; }
                }
            `}</style>

            {/* Navbar */}
            <nav className="lb-nav">
                <Link to="/home" className="nav-brand">
                    <div className="brand-box">H</div>
                    <span style={{ fontWeight: 800, color: '#0d2a22', fontSize: '1.05rem' }}>HelpHub AI</span>
                </Link>
                <ul className="nav-links">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/explore">Explore</Link></li>
                    <li><Link to="/leaderboard" className="active">Leaderboard</Link></li>
                </ul>
            </nav>

            {/* Hero */}
            <div className="hero-banner">
                <p className="hero-eyebrow">Leaderboard</p>
                <h1 className="hero-title">Recognize the people who keep the community moving.</h1>
                <p className="hero-sub">Trust score, contribution count, and badges create visible momentum for reliable helpers.</p>
            </div>

            {/* Two-column content */}
            <div className="content-grid">

                {/* Left: Rankings */}
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
                                            : (user.skills || user.role || '—')}
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

                {/* Right: Badge System */}
                <div className="lb-card">
                    <p className="card-eyebrow">Badge System</p>
                    <h2 className="card-title">Trust and achievement</h2>

                    {ranked.map((user, i) => (
                        <div key={user._id} className="badge-row">
                            <p className="badge-name">{user.name}</p>
                            <p className="badge-tags">
                                {Array.isArray(user.badges) && user.badges.length
                                    ? user.badges.join(' • ')
                                    : '—'}
                            </p>
                            <TrustBar score={user.trustScore ?? 0} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Leaderboard;