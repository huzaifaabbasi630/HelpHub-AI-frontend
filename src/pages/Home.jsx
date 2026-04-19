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
        <div style={{ background: '#f6f6f2', minHeight: '100vh', fontFamily: "'Inter', sans-serif", paddingTop: '100px' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }

                /* ── Premium Navbar ── */
                .home-nav {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 0.8rem 10%; position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
                    background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(15px);
                }
                .nav-pill-bar {
                    display: flex; gap: 5px; background: #e8e8e1; padding: 4px; border-radius: 30px;
                }
                .nav-pill-bar a {
                    text-decoration: none; color: #666; font-size: 0.85rem; font-weight: 600;
                    padding: 8px 18px; border-radius: 20px; transition: 0.3s;
                }
                .nav-pill-bar a.active { background: white; color: #0d2a22; }

                /* ── Hero Grid ── */
                .hero-container {
                    max-width: 1300px; margin: 0 auto; display: grid; 
                    grid-template-columns: 1.1fr 0.9fr; gap: 1.5rem; padding: 2rem;
                }
                .hero-left-card { background: white; border-radius: 32px; padding: 4rem 3.5rem; }
                .hero-right-card { 
                    background: #1a2221; border-radius: 32px; padding: 3rem; color: white;
                    display: flex; flex-direction: column; justify-content: space-between;
                }

                .hero-title { font-size: 4.2rem; font-weight: 900; line-height: 0.95; letter-spacing: -3px; color: #1a1a1a; margin-bottom: 2rem; }
                .hero-desc { font-size: 1rem; line-height: 1.6; color: #666; margin-bottom: 2.5rem; max-width: 500px; }

                /* ── Stats Grid ── */
                .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
                .stat-box { background: #f9f8f3; border-radius: 20px; padding: 1.5rem; border: 1px solid #eee; }
                .stat-num { font-size: 2.2rem; font-weight: 900; color: #0d2a22; margin-bottom: 5px; }
                .stat-label { font-size: 0.7rem; font-weight: 800; color: #10b981; text-transform: uppercase; margin-bottom: 8px; }

                /* ── Dark Side UI ── */
                .ai-feature-card { 
                    background: rgba(255,255,255,0.08); border-radius: 20px; 
                    padding: 1.5rem; margin-top: 1rem; border: 1px solid rgba(255,255,255,0.1);
                }
                .orb { width: 60px; height: 60px; background: #eab308; border-radius: 50%; box-shadow: 0 0 40px #eab30866; }

                /* ── Section Styles ── */
                .section-title-wrap { padding: 4rem 2rem 1.5rem; max-width: 1300px; margin: 0 auto; }
                .request-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 1300px; margin: 0 auto; padding: 0 2rem 4rem; }
            `}</style>

            {/* Navbar */}
            <nav className="home-nav">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: '#0d7a5e', color: 'white', padding: '6px 12px', borderRadius: '8px', fontWeight: '900' }}>H</div>
                    <span style={{ fontWeight: 800, color: '#0d2a22' }}>HelpHub AI</span>
                </div>

                <div className="nav-pill-bar">
                    <Link to="/home" className="active">Home</Link>
                    <Link to="/explore">Explore</Link>
                    <Link to="/leaderboard">Leaderboard</Link>
                    <Link to="/ai-center">AI Center</Link>
                </div>

                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <Link to="/notifications" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: 8, height: 8, background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 8px #ef4444' }}></div>
                        <span style={{ fontSize: '0.8rem', color: '#666', fontWeight: '600' }}>Live community signals</span>
                    </Link>
                    <Link to="/login" style={{ background: '#14b8a6', color: 'white', padding: '10px 22px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}>Join the platform</Link>
                </div>
            </nav>

            <div className="hero-container">
                {/* Left Card */}
                <div className="hero-left-card">
                    <p style={{ color: '#10b981', fontWeight: '800', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '1rem' }}>SMIT GRAND CODING NIGHT 2026</p>
                    <h1 className="hero-title">Find help faster. <br/> Become help that matters.</h1>
                    <p className="hero-desc">HelpHub AI is a community-powered support network for students, mentors, creators, and builders. Ask for help, offer help, and track impact.</p>
                    
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '4rem' }}>
                        <Link to="/dashboard" style={{ background: '#0d2a22', color: 'white', padding: '14px 28px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold' }}>Open product demo</Link>
                        <Link to="/create-request" style={{ background: 'white', border: '1px solid #ddd', padding: '14px 28px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', color: '#0d2a22' }}>Post a request</Link>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-box"><p className="stat-label">Members</p><h2 className="stat-num">384+</h2><p style={{fontSize: '0.75rem', color: '#999'}}>Students & mentors in the loop.</p></div>
                        <div className="stat-box"><p className="stat-label">Requests</p><h2 className="stat-num">72+</h2><p style={{fontSize: '0.75rem', color: '#999'}}>Support posts shared today.</p></div>
                        <div className="stat-box"><p className="stat-label">Solved</p><h2 className="stat-num">69+</h2><p style={{fontSize: '0.75rem', color: '#999'}}>Problems resolved by action.</p></div>
                    </div>
                </div>

                {/* Right Card */}
                <div className="hero-right-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '0.7rem', opacity: 0.5, fontWeight: '800' }}>LIVE PRODUCT FEEL</p>
                        <div className="orb"></div>
                    </div>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', lineHeight: 1.1, marginBottom: '1.5rem' }}>More than a form.<br/>More like an ecosystem.</h2>
                        <p style={{ opacity: 0.6, fontSize: '0.9rem', marginBottom: '2rem' }}>A polished multi-page experience inspired by product platforms, with AI summaries and contribution signals built in.</p>
                        
                        <div className="ai-feature-card">
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '5px' }}>AI request intelligence</h4>
                            <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Auto-categorization, urgency detection, and trend snapshots.</p>
                        </div>
                        <div className="ai-feature-card">
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Community trust graph</h4>
                            <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Badges, helper rankings, and visible contribution history.</p>
                        </div>
                        <div className="ai-feature-card">
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '5px' }}>100%</h4>
                            <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Top trust score active across the network.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Flow Section */}
            <div style={{ maxWidth: '1300px', margin: '3rem auto 0', padding: '4rem 2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                    <div>
                        <p style={{ color: '#10b981', fontWeight: '800', fontSize: '0.7rem', marginBottom: '0.5rem' }}>CORE FLOW</p>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0d2a22' }}>From struggling alone to solving together</h2>
                    </div>
                    <Link to="/onboarding" style={{ padding: '10px 20px', borderRadius: '30px', background: 'white', border: '1px solid #ddd', textDecoration: 'none', color: '#0d2a22', fontWeight: 'bold' }}>Try onboarding AI</Link>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                    {[
                        { title: 'Ask for help clearly', desc: 'Create structured requests with category, urgency, AI suggestions, and tags that attract the right people.' },
                        { title: 'Discover the right people', desc: 'Use the explore feed, helper lists, notifications, and messaging to move quickly once a match happens.' },
                        { title: 'Track real contribution', desc: 'Trust scores, badges, solved requests, and rankings help the community recognize meaningful support.' },
                    ].map(f => (
                        <div key={f.title} style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #eee' }}>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem', color: '#0d2a22' }}>{f.title}</h4>
                            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6' }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Requests Section */}
            <div className="section-title-wrap">
                <p style={{ color: '#10b981', fontWeight: '800', fontSize: '0.7rem', marginBottom: '0.5rem' }}>FEATURED REQUESTS</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0d2a22' }}>Community problems currently in motion</h2>
                    <Link to="/explore" style={{ padding: '10px 20px', borderRadius: '30px', background: 'white', border: '1px solid #ddd', textDecoration: 'none', color: '#0d2a22', fontWeight: 'bold' }}>View full feed</Link>
                </div>
            </div>

            <div className="request-grid">
                {requests.map(req => (
                    <div key={req.id} style={{ background: 'white', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                                {req.tags.map(tag => <span key={tag} style={{ ...tagStyle(tag), padding: '4px 12px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold' }}>{tag}</span>)}
                            </div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.5rem' }}>{req.title}</h3>
                            <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>{req.desc}</p>
                        </div>
                        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #f3f3f3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontWeight: '800', fontSize: '0.9rem' }}>{req.author}</p>
                                <p style={{ fontSize: '0.75rem', color: '#999' }}>{req.location} • {req.helpers} helper</p>
                            </div>
                            <Link to={`/request/${req.id}`} style={{ padding: '8px 16px', borderRadius: '20px', background: '#f9f9f9', border: '1px solid #eee', color: '#0d2a22', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 'bold' }}>Open details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;