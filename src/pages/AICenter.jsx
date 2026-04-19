import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const requestsData = [
    {
        id: 1,
        title: 'Need help making my portfolio responsive before demo day',
        description: 'My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.',
        author: 'Sara Noor',
        location: 'Karachi',
        helpers: 1,
        category: 'Web Development',
        urgency: 'High',
        status: 'Solved',
        tags: ['HTML/CSS', 'Responsive', 'Portfolio']
    },
    {
        id: 2,
        title: 'Looking for Figma feedback on a volunteer event poster',
        description: 'I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.',
        author: 'Ayesha Khan',
        location: 'Lahore',
        helpers: 1,
        category: 'Design',
        urgency: 'Medium',
        status: 'Open',
        tags: ['Figma', 'Poster', 'Design Review']
    },
    {
        id: 3,
        title: 'Need mock interview support for internship applications',
        description: 'Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.',
        author: 'Sara Noor',
        location: 'Remote',
        helpers: 2,
        category: 'Career',
        urgency: 'Low',
        status: 'Solved',
        tags: ['Interview Prep', 'Career', 'Frontend']
    }
];

const ExploreFeed = () => {
    return (
        <>
            <style>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }

                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #e0f0e8 0%, #f5f0e8 45%, #fce8d8 100%);
                    min-height: 100vh;
                    color: #111;
                }

                .explore-page { display: flex; flex-direction: column; min-height: 100vh; }

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
                    transition: all 0.2s;
                }

                .navbar-links a:hover { color: #0f7b5e; }
                .navbar-links a.active {
                    background: #e8f5f0;
                    color: #0d6a50;
                    font-weight: 600;
                }

                /* ── Hero ── */
                .hero-section {
                    background: #0d2a22;
                    border-radius: 1.4rem;
                    margin: 1rem 2.5rem 2rem;
                    padding: 3rem;
                    color: white;
                }

                .hero-eyebrow {
                    text-transform: uppercase;
                    font-size: 0.7rem;
                    letter-spacing: 2px;
                    font-weight: 700;
                    opacity: 0.6;
                    margin-bottom: 0.8rem;
                }

                .hero-title {
                    font-size: 2.8rem;
                    font-weight: 800;
                    line-height: 1.1;
                    margin-bottom: 1rem;
                    max-width: 700px;
                }

                .hero-subtitle {
                    font-size: 0.95rem;
                    opacity: 0.7;
                    max-width: 600px;
                }

                /* ── Layout ── */
                .main-layout {
                    display: grid;
                    grid-template-columns: 320px 1fr;
                    gap: 2rem;
                    padding: 0 2.5rem 4rem;
                }

                /* ── Filters Sidebar ── */
                .filters-sidebar {
                    background: #fcfaf2;
                    border-radius: 1.4rem;
                    padding: 2rem;
                    height: fit-content;
                    border: 1px solid rgba(0,0,0,0.03);
                }

                .filter-group { margin-bottom: 1.8rem; }
                .filter-label {
                    display: block;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #444;
                    margin-bottom: 0.8rem;
                }

                .filter-select, .filter-input {
                    width: 100%;
                    padding: 0.9rem 1rem;
                    border-radius: 0.8rem;
                    border: 1px solid #e2e2e2;
                    background: white;
                    font-size: 0.9rem;
                    color: #333;
                    outline: none;
                }

                /* ── Feed ── */
                .requests-feed { display: flex; flex-direction: column; gap: 1.2rem; }

                .request-card {
                    background: #fcfaf2;
                    border-radius: 1.4rem;
                    padding: 2.2rem;
                    border: 1px solid rgba(0,0,0,0.03);
                    position: relative;
                }

                .card-header { display: flex; gap: 0.6rem; margin-bottom: 1rem; }
                
                .badge {
                    padding: 0.3rem 0.8rem;
                    border-radius: 2rem;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                .badge-cat { background: #e8f5f0; color: #0d6a50; }
                .badge-urgency { background: #fee2e2; color: #991b1b; }
                .badge-status { background: #e8f5f0; color: #0d6a50; border: 1.5px solid #b2d8cc; }

                .card-title {
                    font-size: 1.3rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    line-height: 1.3;
                    color: #111;
                }

                .card-desc {
                    font-size: 0.95rem;
                    color: #555;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }

                .tag-container { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
                .tag {
                    font-size: 0.8rem;
                    padding: 0.35rem 0.9rem;
                    background: #fff;
                    border: 1px solid #eee;
                    border-radius: 2rem;
                    color: #666;
                }

                .card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1.2rem;
                    border-top: 1px solid rgba(0,0,0,0.05);
                }

                .user-info { font-size: 0.85rem; color: #444; font-weight: 600; }
                .helper-count { font-size: 0.85rem; color: #777; font-weight: 400; margin-left: 4px; }

                .btn-details {
                    background: white;
                    border: 1px solid #ddd;
                    padding: 0.6rem 1.2rem;
                    border-radius: 2rem;
                    font-size: 0.85rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-details:hover { background: #f0f0f0; }

                @media (max-width: 900px) {
                    .main-layout { grid-template-columns: 1fr; }
                    .hero-section { margin: 1rem; padding: 2rem; }
                    .navbar { padding: 1rem; }
                }
            `}</style>

            <div className="explore-page">
                <nav className="navbar">
                    <Link to="/" className="navbar-brand">
                        <div className="brand-icon">H</div>
                        HelpHub AI
                    </Link>
                    <ul className="navbar-links">
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/explore" className="active">Explore</Link></li>
                        <li><Link to="/leaderboard">Leaderboard</Link></li>
                        <li><Link to="/notifications">Notifications</Link></li>
                    </ul>
                </nav>

                <header className="hero-section">
                    <p className="hero-eyebrow">Explore / Feed</p>
                    <h1 className="hero-title">Browse help requests with filterable community context.</h1>
                    <p className="hero-subtitle">Filter by category, urgency, skills, and location to surface the best matches.</p>
                </header>

                <main className="main-layout">
                    {/* Filters Sidebar */}
                    <aside className="filters-sidebar">
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '2rem' }}>Refine the feed</h2>
                        
                        <div className="filter-group">
                            <label className="filter-label">Category</label>
                            <select className="filter-select">
                                <option>All categories</option>
                                <option>Web Development</option>
                                <option>Design</option>
                                <option>Career</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="filter-label">Urgency</label>
                            <select className="filter-select">
                                <option>All urgency levels</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="filter-label">Skills</label>
                            <input type="text" className="filter-input" placeholder="React, Figma, Git/GitHub" />
                        </div>

                        <div className="filter-group">
                            <label className="filter-label">Location</label>
                            <input type="text" className="filter-input" placeholder="Karachi, Lahore, Remote" />
                        </div>
                    </aside>

                    {/* Feed Content */}
                    <section className="requests-feed">
                        {requestsData.map((req) => (
                            <div key={req.id} className="request-card">
                                <div className="card-header">
                                    <span className="badge badge-cat">{req.category}</span>
                                    <span className="badge badge-urgency" style={{ 
                                        backgroundColor: req.urgency === 'High' ? '#fee2e2' : '#fef3c7',
                                        color: req.urgency === 'High' ? '#991b1b' : '#92400e'
                                    }}>{req.urgency}</span>
                                    <span className="badge badge-status">{req.status}</span>
                                </div>
                                
                                <h3 className="card-title">{req.title}</h3>
                                <p className="card-desc">{req.description}</p>
                                
                                <div className="tag-row tag-container">
                                    {req.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>

                                <div className="card-footer">
                                    <div className="user-info">
                                        {req.author} 
                                        <span className="helper-count"> • {req.location} • {req.helpers} helper interested</span>
                                    </div>
                                    <button className="btn-details">Open details</button>
                                </div>
                            </div>
                        ))}
                    </section>
                </main>
            </div>
        </>
    );
};

export default ExploreFeed;