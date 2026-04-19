import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/apiConfig';

const SAMPLE_REQUESTS = [
    {
        _id: '1', category: 'Web Development', urgency: 'High', status: 'solved',
        title: 'Need help', description: 'helpn needed', tags: [],
        createdBy: { name: 'Ayesha Khan', location: 'Karachi' }, helpers: 1,
    },
    {
        _id: '2', category: 'Web Development', urgency: 'High', status: 'solved',
        title: 'Need help making my portfolio responsive before demo day',
        description: 'My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.',
        tags: ['HTML/CSS', 'Responsive', 'Portfolio'],
        createdBy: { name: 'Sara Noor', location: 'Karachi' }, helpers: 1,
    },
    {
        _id: '3', category: 'Design', urgency: 'Medium', status: 'open',
        title: 'Looking for Figma feedback on a volunteer event poster',
        description: 'I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.',
        tags: ['Figma', 'Poster', 'Design Review'],
        createdBy: { name: 'Ayesha Khan', location: 'Lahore' }, helpers: 1,
    },
    {
        _id: '4', category: 'Career', urgency: 'Low', status: 'solved',
        title: 'Need mock interview support for internship applications',
        description: 'Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.',
        tags: ['Interview Prep', 'Career', 'Frontend'],
        createdBy: { name: 'Sara Noor', location: 'Remote' }, helpers: 2,
    },
];

const urgencyTag = (u) => {
    if (u === 'High') return { border: '1.5px solid #f87171', color: '#dc2626', background: 'transparent' };
    if (u === 'Medium') return { border: '1.5px solid #fb923c', color: '#ea580c', background: 'transparent' };
    return { border: '1.5px solid #4ade80', color: '#16a34a', background: 'transparent' };
};
const statusTag = (s) =>
    s === 'solved'
        ? { border: '1.5px solid #4ade80', color: '#16a34a', background: 'transparent' }
        : { border: '1.5px solid #93c5fd', color: '#2563eb', background: 'transparent' };

const categoryTag = { border: '1.5px solid #d6d0c8', color: '#444', background: 'transparent' };

const Explore = () => {
    const [requests, setRequests] = useState([]);
    const [category, setCategory] = useState('');
    const [urgency, setUrgency] = useState('');
    const [skills, setSkills] = useState('');
    const [location, setLocation] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                let endpoint = '/api/requests?';
                if (category) endpoint += `category=${category}&`;
                if (urgency) endpoint += `urgency=${urgency}&`;
                const { data } = await API.get(endpoint);
                setRequests(data.length ? data : SAMPLE_REQUESTS);
            } catch {
                setRequests(SAMPLE_REQUESTS);
            }
        };
        fetchRequests();
    }, [category, urgency]);

    const handleHelp = async (id) => {
        try {
            await API.post(`/api/requests/${id}/help`);
            alert('Help offer sent!');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to offer help');
        }
    };

    const handleSolve = async (id) => {
        try {
            await API.put(`/api/requests/${id}/solve`);
            alert('Request marked as solved!');
            setRequests(requests.map(r => r._id === id ? { ...r, status: 'solved' } : r));
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to resolve');
        }
    };

    const filtered = requests.filter(r => {
        const catMatch = !category || r.category === category;
        const urgMatch = !urgency || r.urgency === urgency;
        const locMatch = !location || r.createdBy?.location?.toLowerCase().includes(location.toLowerCase());
        const skillMatch = !skills || (r.tags || []).some(t => t.toLowerCase().includes(skills.toLowerCase()));
        return catMatch && urgMatch && locMatch && (skills ? skillMatch : true);
    });

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#e0f0e8 0%,#f5f0e8 45%,#fce8d8 100%)', fontFamily: "'Segoe UI', sans-serif" }}>
            <style>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }

                /* Navbar */
                .exp-nav {
                    display: flex; align-items: center;
                    justify-content: space-between;
                    padding: 1rem 2.5rem;
                }
                .exp-brand {
                    display: flex; align-items: center; gap: 10px;
                    text-decoration: none;
                }
                .exp-brand-icon {
                    width: 36px; height: 36px; background: #0f7b5e;
                    border-radius: 8px; display: flex; align-items: center;
                    justify-content: center; color: white; font-weight: 800;
                }
                .exp-nav-links { display: flex; gap: 0.3rem; }
                .exp-nav-links a {
                    text-decoration: none; color: #555;
                    font-size: 0.88rem; font-weight: 500;
                    padding: 0.45rem 1rem; border-radius: 2rem;
                    transition: background 0.2s;
                }
                .exp-nav-links a:hover { color: #0f7b5e; }
                .exp-nav-links a.active {
                    background: #0d2a22; color: white; font-weight: 700;
                }

                /* Hero */
                .exp-hero {
                    background: #0d2a22; border-radius: 1.4rem;
                    margin: 0.5rem 2.5rem 1.5rem;
                    padding: 2.8rem 3rem; color: white; position: relative; overflow: hidden;
                }
                .exp-hero::before {
                    content: ''; position: absolute;
                    top: -60px; right: -60px;
                    width: 260px; height: 260px;
                    background: radial-gradient(circle, rgba(15,123,94,0.3) 0%, transparent 70%);
                    border-radius: 50%;
                }
                .exp-hero-eyebrow {
                    font-size: 0.68rem; font-weight: 800;
                    letter-spacing: 2.5px; opacity: 0.55;
                    text-transform: uppercase; margin-bottom: 0.9rem;
                }
                .exp-hero-title {
                    font-size: 2.8rem; font-weight: 900;
                    line-height: 1.08; letter-spacing: -0.5px;
                    margin-bottom: 0.8rem; max-width: 680px;
                }
                .exp-hero-sub { font-size: 0.9rem; opacity: 0.6; max-width: 460px; line-height: 1.5; }

                /* Body layout */
                .exp-body {
                    display: grid;
                    grid-template-columns: 280px 1fr;
                    gap: 1.2rem;
                    margin: 0 2.5rem 3rem;
                    align-items: start;
                }

                /* Filter card */
                .exp-filter-card {
                    background: #fcfaf2; border-radius: 1.4rem;
                    padding: 2rem;
                }
                .filter-eyebrow {
                    font-size: 0.65rem; font-weight: 800;
                    letter-spacing: 2px; color: #0f7b5e;
                    text-transform: uppercase; margin-bottom: 0.5rem;
                }
                .filter-title {
                    font-size: 1.8rem; font-weight: 900;
                    color: #0d2a22; letter-spacing: -0.5px;
                    margin-bottom: 2rem;
                }
                .filter-group { margin-bottom: 1.8rem; }
                .filter-group-label {
                    font-size: 0.82rem; font-weight: 600;
                    color: #374151; margin-bottom: 0.6rem; display: block;
                }
                .filter-select, .filter-input {
                    width: 100%;
                    border: none;
                    border-bottom: 1.5px solid #d6d0c4;
                    padding: 0.55rem 0.2rem;
                    font-size: 0.875rem;
                    color: #444;
                    background: transparent;
                    outline: none;
                    transition: border-color 0.2s;
                    font-family: inherit;
                }
                .filter-select {
                    appearance: none; -webkit-appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 0.2rem center;
                    cursor: pointer;
                }
                .filter-select:focus, .filter-input:focus { border-color: #0f7b5e; }
                .filter-input::placeholder { color: #bbb; }

                /* Feed */
                .exp-feed { display: flex; flex-direction: column; gap: 1rem; }

                .exp-card {
                    background: #fcfaf2; border-radius: 1.4rem;
                    padding: 1.6rem 1.8rem;
                }
                .exp-card-tags {
                    display: flex; gap: 0.5rem;
                    flex-wrap: wrap; margin-bottom: 0.8rem;
                }
                .exp-pill {
                    font-size: 0.78rem; font-weight: 600;
                    padding: 0.28rem 0.85rem;
                    border-radius: 999px;
                }
                .exp-card-title {
                    font-size: 1rem; font-weight: 800;
                    color: #0d2a22; margin-bottom: 0.45rem;
                }
                .exp-card-desc {
                    font-size: 0.85rem; color: #6b7280;
                    line-height: 1.55; margin-bottom: 0.85rem;
                }
                .exp-skill-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
                .exp-skill-pill {
                    font-size: 0.76rem; font-weight: 500;
                    padding: 0.25rem 0.75rem;
                    border-radius: 999px;
                    border: 1.5px solid #d6d0c8;
                    color: #555;
                }
                .exp-card-footer {
                    display: flex; align-items: center;
                    justify-content: space-between;
                    padding-top: 0.9rem;
                    border-top: 1px solid #f0ede4;
                }
                .exp-author { font-size: 0.875rem; font-weight: 700; color: #0d2a22; }
                .exp-meta { font-size: 0.78rem; color: #9ca3af; margin-top: 2px; }
                .exp-action-btn {
                    background: none; border: none;
                    font-size: 0.875rem; font-weight: 700;
                    color: #0d2a22; cursor: pointer;
                    font-family: inherit;
                    transition: color 0.2s;
                }
                .exp-action-btn:hover { color: #0f7b5e; }

                @media (max-width: 800px) {
                    .exp-body { grid-template-columns: 1fr; }
                    .exp-hero-title { font-size: 2rem; }
                    .exp-nav, .exp-hero, .exp-body { margin-left: 1rem; margin-right: 1rem; }
                    .exp-hero { padding: 2rem; }
                }
            `}</style>

            {/* Navbar */}
            <nav className="exp-nav">
                <Link to="/home" className="exp-brand">
                    <div className="exp-brand-icon">H</div>
                    <span style={{ fontWeight: 800, color: '#0d2a22', fontSize: '1.05rem' }}>HelpHub AI</span>
                </Link>
                <div className="exp-nav-links">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/explore" className="active">Explore</Link>
                    <Link to="/leaderboard">Leaderboard</Link>
                    <Link to="/notifications">Notifications</Link>
                </div>
            </nav>

            {/* Hero */}
            <div className="exp-hero">
                <p className="exp-hero-eyebrow">Explore / Feed</p>
                <h1 className="exp-hero-title">Browse help requests with filterable community context.</h1>
                <p className="exp-hero-sub">Filter by category, urgency, skills, and location to surface the best matches.</p>
            </div>

            {/* Body */}
            <div className="exp-body">

                {/* Filter Sidebar */}
                <div className="exp-filter-card">
                    <p className="filter-eyebrow">Filters</p>
                    <h2 className="filter-title">Refine the feed</h2>

                    <div className="filter-group">
                        <label className="filter-group-label">Category</label>
                        <select className="filter-select" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="">All categories</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Design">Design</option>
                            <option value="Career">Career</option>
                            <option value="Programming">Programming</option>
                            <option value="General">General</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-group-label">Urgency</label>
                        <select className="filter-select" value={urgency} onChange={e => setUrgency(e.target.value)}>
                            <option value="">All urgency levels</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-group-label">Skills</label>
                        <input
                            className="filter-input"
                            placeholder="React, Figma, Git/GitHub"
                            value={skills}
                            onChange={e => setSkills(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label className="filter-group-label">Location</label>
                        <input
                            className="filter-input"
                            placeholder="Karachi, Lahore, Remote"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                    </div>
                </div>

                {/* Feed */}
                <div className="exp-feed">
                    {filtered.length === 0 && (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af', background: '#fcfaf2', borderRadius: '1.4rem' }}>
                            No requests match your filters.
                        </div>
                    )}
                    {filtered.map(req => (
                        <div className="exp-card" key={req._id}>
                            <div className="exp-card-tags">
                                <span className="exp-pill" style={categoryTag}>{req.category}</span>
                                <span className="exp-pill" style={urgencyTag(req.urgency)}>{req.urgency}</span>
                                <span className="exp-pill" style={statusTag(req.status)}>
                                    {req.status === 'solved' ? 'Solved' : 'Open'}
                                </span>
                            </div>

                            <h3 className="exp-card-title">{req.title}</h3>
                            <p className="exp-card-desc">{req.description}</p>

                            {req.tags?.length > 0 && (
                                <div className="exp-skill-tags">
                                    {req.tags.map(t => (
                                        <span className="exp-skill-pill" key={t}>{t}</span>
                                    ))}
                                </div>
                            )}

                            <div className="exp-card-footer">
                                <div>
                                    <p className="exp-author">{req.createdBy?.name}</p>
                                    <p className="exp-meta">
                                        {req.createdBy?.location} • {req.helpers || 0} helper{req.helpers !== 1 ? 's' : ''} interested
                                    </p>
                                </div>
                                {req.status === 'solved' ? (
                                    <button className="exp-action-btn" disabled style={{ color: '#9ca3af' }}>Solved</button>
                                ) : req.createdBy?._id === userInfo?._id ? (
                                    <button className="exp-action-btn" onClick={() => handleSolve(req._id)}>Mark as Solved</button>
                                ) : userInfo?.role !== 'Need Help' ? (
                                    <button className="exp-action-btn" onClick={() => handleHelp(req._id)}>I can help</button>
                                ) : (
                                    <button className="exp-action-btn" style={{ color: '#9ca3af' }} disabled>View Only</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Explore;