import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const requests = [
    {
        id: 1,
        tags: ['Web Development', 'High', 'Solved'],
        title: 'Need help',
        desc: 'helpn needed',
        skills: [],
        author: 'Ayesha Khan',
        location: 'Karachi',
        helpers: 1,
    },
    {
        id: 2,
        tags: ['Web Development', 'High', 'Solved'],
        title: 'Need help making my portfolio responsive before demo day',
        desc: 'My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.',
        skills: ['HTML/CSS', 'Responsive', 'Portfolio'],
        author: 'Sara Noor',
        location: 'Karachi',
        helpers: 1,
    },
    {
        id: 3,
        tags: ['Design', 'Medium', 'Open'],
        title: 'Looking for Figma feedback on a volunteer event poster',
        desc: 'I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.',
        skills: ['Figma', 'Poster', 'Design Review'],
        author: 'Ayesha Khan',
        location: 'Lahore',
        helpers: 1,
    },
];

const tagStyle = (tag) => {
    if (tag === 'High') return { background: '#fef2f2', color: '#ef4444' };
    if (tag === 'Medium') return { background: '#fff7ed', color: '#f97316' };
    if (tag === 'Solved') return { background: '#f0fdf4', color: '#10b981' };
    if (tag === 'Open') return { background: '#eff6ff', color: '#3b82f6' };
    return { background: '#eff6ff', color: '#3b82f6' };
};

const Home = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!userInfo) navigate('/login');
    }, [navigate, userInfo]);

    return (
        <div style={{ background: 'linear-gradient(135deg, #e0f0e8 0%, #f5f0e8 45%, #fce8d8 100%)', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", paddingTop: '80px' }}>
            <style>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }

                /* ── Navbar ── */
                .home-nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 3rem;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    background: rgba(224, 240, 232, 0.8);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
                }
                .nav-brand {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                }
                .brand-box {
                    width: 34px; height: 34px;
                    background: #0d7a5e;
                    border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    color: white; font-weight: 800; font-size: 1rem;
                }
                .nav-pill-bar {
                    display: flex;
                    gap: 0.3rem;
                    background: rgba(255,255,255,0.55);
                    border: 1px solid rgba(255,255,255,0.7);
                    padding: 5px 8px;
                    border-radius: 30px;
                    backdrop-filter: blur(6px);
                }
                .nav-pill-bar a {
                    text-decoration: none;
                    color: #4b5563;
                    font-size: 0.88rem;
                    font-weight: 500;
                    padding: 6px 16px;
                    border-radius: 20px;
                    transition: background 0.2s;
                }
                .nav-pill-bar a.active {
                    background: white;
                    color: #0d2a22;
                    font-weight: 700;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
                }
                .nav-right { display: flex; align-items: center; gap: 1.2rem; }
                .nav-signal { font-size: 0.82rem; color: #6b7280; }
                .btn-join {
                    background: #0d2a22;
                    color: white;
                    padding: 0.65rem 1.4rem;
                    border-radius: 30px;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 0.88rem;
                    transition: background 0.2s;
                }
                .btn-join:hover { background: #0d7a5e; }

                /* ── Hero Grid ── */
                .hero-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 1.2rem;
                    padding: 1rem 2.5rem 1.5rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                /* Left Hero Card */
                .hero-left {
                    background: white;
                    border-radius: 2rem;
                    padding: 3.5rem 3rem;
                }
                .eyebrow {
                    font-size: 0.68rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #9ca3af;
                    text-transform: uppercase;
                    margin-bottom: 1.2rem;
                }
                .hero-title {
                    font-size: 3.4rem;
                    font-weight: 900;
                    line-height: 1.05;
                    color: #0d2a22;
                    margin-bottom: 1.2rem;
                    letter-spacing: -1px;
                }
                .hero-desc {
                    color: #6b7280;
                    line-height: 1.65;
                    font-size: 0.95rem;
                    margin-bottom: 2rem;
                }
                .btn-group { display: flex; gap: 1rem; margin-bottom: 2.8rem; }
                .btn-teal {
                    background: #0d2a22;
                    color: white;
                    padding: 0.85rem 1.8rem;
                    border-radius: 30px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    text-decoration: none;
                    transition: background 0.2s;
                }
                .btn-teal:hover { background: #0d7a5e; }
                .btn-outline {
                    border: 1.5px solid #e5e7eb;
                    padding: 0.85rem 1.8rem;
                    border-radius: 30px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    text-decoration: none;
                    color: #0d2a22;
                    background: white;
                    transition: border-color 0.2s;
                }
                .btn-outline:hover { border-color: #0d7a5e; }
                .stats-row { display: flex; gap: 1rem; }
                .stat-mini {
                    flex: 1;
                    background: #fbf9f4;
                    border: 1px solid #f0ede4;
                    border-radius: 1.2rem;
                    padding: 1.4rem;
                }
                .stat-mini-label {
                    font-size: 0.65rem;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    color: #9ca3af;
                    text-transform: uppercase;
                    margin-bottom: 0.5rem;
                }
                .stat-mini-num {
                    font-size: 1.8rem;
                    font-weight: 900;
                    color: #0d2a22;
                    margin-bottom: 0.4rem;
                }
                .stat-mini-desc { font-size: 0.75rem; color: #9ca3af; line-height: 1.4; }

                /* Right Hero Card */
                .hero-right {
                    background: #112a24;
                    border-radius: 2rem;
                    padding: 2.5rem;
                    color: white;
                    display: flex;
                    flex-direction: column;
                }
                .hero-right-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.2rem;
                }
                .yellow-dot {
                    width: 44px; height: 44px;
                    background: #eab308;
                    border-radius: 50%;
                    flex-shrink: 0;
                }
                .hero-right-eyebrow {
                    font-size: 0.65rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    opacity: 0.55;
                    text-transform: uppercase;
                    margin-top: 4px;
                }
                .hero-right-title {
                    font-size: 2.1rem;
                    font-weight: 900;
                    line-height: 1.1;
                    letter-spacing: -0.5px;
                    margin-bottom: 1rem;
                }
                .hero-right-desc {
                    font-size: 0.85rem;
                    opacity: 0.65;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }
                .dark-subcard {
                    background: rgba(255,255,255,0.1);
                    border-radius: 1rem;
                    padding: 1.2rem 1.4rem;
                    margin-bottom: 0.8rem;
                }
                .dark-subcard:last-child { margin-bottom: 0; }
                .dark-subcard-title {
                    font-size: 0.9rem;
                    font-weight: 800;
                    margin-bottom: 0.4rem;
                    color: white;
                }
                .dark-subcard-desc { font-size: 0.8rem; opacity: 0.65; line-height: 1.5; color: white; }

                /* ── Core Flow Section ── */
                .section-wrap {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1.5rem 2.5rem;
                }
                .section-header-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 1.2rem;
                }
                .section-eyebrow {
                    font-size: 0.65rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #0d7a5e;
                    text-transform: uppercase;
                    margin-bottom: 0.4rem;
                }
                .section-title {
                    font-size: 2rem;
                    font-weight: 900;
                    color: #0d2a22;
                    letter-spacing: -0.5px;
                }
                .btn-sm-pill {
                    padding: 0.5rem 1.2rem;
                    background: white;
                    border: 1.5px solid #e5e7eb;
                    border-radius: 30px;
                    font-size: 0.83rem;
                    font-weight: 700;
                    color: #0d2a22;
                    text-decoration: none;
                    white-space: nowrap;
                    cursor: pointer;
                    transition: border-color 0.2s;
                }
                .btn-sm-pill:hover { border-color: #0d7a5e; }

                .flow-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                }
                .flow-card {
                    background: white;
                    border-radius: 1.4rem;
                    padding: 1.8rem;
                }
                .flow-card-title { font-size: 1rem; font-weight: 800; color: #0d2a22; margin-bottom: 0.6rem; }
                .flow-card-desc { font-size: 0.83rem; color: #6b7280; line-height: 1.55; }

                /* ── Featured Requests ── */
                .requests-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                }
                .request-card {
                    background: white;
                    border-radius: 1.4rem;
                    padding: 1.6rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .req-tag {
                    display: inline-block;
                    padding: 3px 10px;
                    border-radius: 12px;
                    font-size: 0.7rem;
                    font-weight: 700;
                }
                .req-title { font-size: 0.95rem; font-weight: 800; color: #0d2a22; margin: 0.8rem 0 0.5rem; }
                .req-desc { font-size: 0.82rem; color: #6b7280; line-height: 1.5; margin-bottom: 1rem; }
                .skill-tag {
                    display: inline-block;
                    padding: 3px 10px;
                    background: #f3f4f6;
                    border-radius: 8px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: #374151;
                    margin: 2px;
                }
                .req-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 1.2rem;
                    padding-top: 1rem;
                    border-top: 1px solid #f3f4f6;
                }
                .req-author { font-size: 0.85rem; font-weight: 700; color: #0d2a22; }
                .req-meta { font-size: 0.72rem; color: #9ca3af; margin-top: 2px; }
                .btn-open-details {
                    padding: 0.45rem 1rem;
                    background: #f9fbf8;
                    border: 1.5px solid #e5e7eb;
                    border-radius: 20px;
                    font-size: 0.78rem;
                    font-weight: 700;
                    color: #0d2a22;
                    cursor: pointer;
                    transition: border-color 0.2s;
                }
                .btn-open-details:hover { border-color: #0d7a5e; }

                /* ── Footer ── */
                .footer {
                    text-align: center;
                    padding: 2.5rem;
                    font-size: 0.78rem;
                    color: #9ca3af;
                    margin-top: 1rem;
                }

                @media (max-width: 900px) {
                    .hero-grid { grid-template-columns: 1fr; }
                    .flow-grid, .requests-grid { grid-template-columns: 1fr; }
                    .home-nav { padding: 1rem 1.5rem; }
                    .section-wrap { padding: 1rem 1.5rem; }
                    .hero-title { font-size: 2.4rem; }
                }
            `}</style>

            {/* Navbar */}
            <nav className="home-nav">
                <Link to="/home" className="nav-brand">
                    <div className="brand-box">H</div>
                    <span style={{ fontWeight: 800, color: '#0d2a22', fontSize: '1.05rem' }}>HelpHub AI</span>
                </Link>

                <div className="nav-pill-bar">
                    <Link to="/home" className="active">Home</Link>
                    <Link to="/explore">Explore</Link>
                    <Link to="/leaderboard">Leaderboard</Link>
                    <Link to="/ai-center">AI Center</Link>
                </div>

                <div className="nav-right">
                    <span className="nav-signal">Live community signals</span>
                    <Link to="/profile" className="btn-join">Join the platform</Link>
                </div>
            </nav>

            {/* Hero Grid */}
            <div className="hero-grid">
                {/* Left */}
                <div className="hero-left">
                    <p className="eyebrow">SMIT Grand Coding Night 2026</p>
                    <h1 className="hero-title">Find help faster.<br />Become help that matters.</h1>
                    <p className="hero-desc">
                        HelpHub AI is a community-powered support network for students, mentors, creators, and builders. Ask for help, offer help, track impact, and let AI surface smarter matches across the platform.
                    </p>
                    <div className="btn-group">
                        <Link to="/explore" className="btn-teal">Open product demo</Link>
                        <Link to="/create-request" className="btn-outline">Post a request</Link>
                    </div>
                    <div className="stats-row">
                        {[
                            { label: 'Members', num: '384+', desc: 'Students, mentors, and helpers in the loop.' },
                            { label: 'Requests', num: '72+', desc: 'Support posts shared across learning journeys.' },
                            { label: 'Solved', num: '69+', desc: 'Problems resolved through fast community action.' },
                        ].map(s => (
                            <div key={s.label} className="stat-mini">
                                <p className="stat-mini-label">{s.label}</p>
                                <p className="stat-mini-num">{s.num}</p>
                                <p className="stat-mini-desc">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right */}
                <div className="hero-right">
                    <div className="hero-right-top">
                        <p className="hero-right-eyebrow">Live Product Feel</p>
                        <div className="yellow-dot" />
                    </div>
                    <h2 className="hero-right-title">More than a form.<br />More like an ecosystem.</h2>
                    <p className="hero-right-desc">
                        A polished multi-page experience inspired by product platforms, with AI summaries, trust scores, contribution signals, notifications, and leaderboard momentum built directly in HTML, CSS, JavaScript, and LocalStorage.
                    </p>
                    <div className="dark-subcard">
                        <p className="dark-subcard-title">AI request intelligence</p>
                        <p className="dark-subcard-desc">Auto-categorization, urgency detection, tags, rewrite suggestions, and trend snapshots.</p>
                    </div>
                    <div className="dark-subcard">
                        <p className="dark-subcard-title">Community trust graph</p>
                        <p className="dark-subcard-desc">Badges, helper rankings, trust score boosts, and visible contribution history.</p>
                    </div>
                    <div className="dark-subcard">
                        <p className="dark-subcard-title">100%</p>
                        <p className="dark-subcard-desc">Top trust score currently active across the sample mentor network.</p>
                    </div>
                </div>
            </div>

            {/* Core Flow */}
            <div className="section-wrap">
                <div className="section-header-row">
                    <div>
                        <p className="section-eyebrow">Core Flow</p>
                        <h2 className="section-title">From struggling alone to solving together</h2>
                    </div>
                    <Link to="/explore" className="btn-sm-pill">Try onboarding AI</Link>
                </div>
                <div className="flow-grid">
                    {[
                        { title: 'Ask for help clearly', desc: 'Create structured requests with category, urgency, AI suggestions, and tags that attract the right people.' },
                        { title: 'Discover the right people', desc: 'Use the explore feed, helper lists, notifications, and messaging to move quickly once a match happens.' },
                        { title: 'Track real contribution', desc: 'Trust scores, badges, solved requests, and rankings help the community recognize meaningful support.' },
                    ].map(f => (
                        <div key={f.title} className="flow-card">
                            <p className="flow-card-title">{f.title}</p>
                            <p className="flow-card-desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Requests */}
            <div className="section-wrap">
                <div className="section-header-row">
                    <div>
                        <p className="section-eyebrow">Featured Requests</p>
                        <h2 className="section-title">Community problems currently in motion</h2>
                    </div>
                    <Link to="/explore" className="btn-sm-pill">View full feed</Link>
                </div>
                <div className="requests-grid">
                    {requests.map(req => (
                        <div key={req.id} className="request-card">
                            <div>
                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                    {req.tags.map(tag => (
                                        <span key={tag} className="req-tag" style={tagStyle(tag)}>{tag}</span>
                                    ))}
                                </div>
                                <p className="req-title">{req.title}</p>
                                <p className="req-desc">{req.desc}</p>
                                {req.skills.length > 0 && (
                                    <div>{req.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}</div>
                                )}
                            </div>
                            <div className="req-footer">
                                <div>
                                    <p className="req-author">{req.author}</p>
                                    <p className="req-meta">{req.location} • {req.helpers} helper interested</p>
                                </div>
                                <button className="btn-open-details">Open details</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="footer">
                <p>HelpHub AI is built as a premium-feel, multi-page community support product using HTML, CSS, JavaScript, and LocalStorage.</p>
            </footer>
        </div>
    );
};

export default Home;