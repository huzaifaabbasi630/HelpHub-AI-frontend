import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/apiConfig';

const SAMPLE_REQUESTS = [
    {
        _id: '1', category: 'Web Development', urgency: 'High', status: 'solved',
        title: 'Need help making my portfolio responsive before demo day',
        description: 'My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.',
        tags: ['HTML/CSS', 'Responsive', 'Portfolio'],
        createdBy: { name: 'Sara Noor', location: 'Karachi' }, helpers: 1,
    },
    {
        _id: '2', category: 'Design', urgency: 'Medium', status: 'open',
        title: 'Looking for Figma feedback on a volunteer event poster',
        description: 'I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.',
        tags: ['Figma', 'Poster', 'Design Review'],
        createdBy: { name: 'Ayesha Khan', location: 'Lahore' }, helpers: 1,
    },
    {
        _id: '3', category: 'Career', urgency: 'Low', status: 'solved',
        title: 'Need mock interview support for internship applications',
        description: 'Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.',
        tags: ['Interview Prep', 'Career', 'Frontend'],
        createdBy: { name: 'Sara Noor', location: 'Remote' }, helpers: 2,
    },
];

// Utility for dynamic styling
const getUrgencyStyles = (u) => {
    if (u === 'High') return { border: '1.5px solid #fee2e2', color: '#ef4444', background: '#fef2f2' };
    if (u === 'Medium') return { border: '1.5px solid #ffedd5', color: '#f97316', background: '#fff7ed' };
    return { border: '1.5px solid #dcfce7', color: '#22c55e', background: '#f0fdf4' };
};

const getStatusStyles = (s) => 
    s === 'solved' 
        ? { border: '1.5px solid #dcfce7', color: '#16a34a', background: '#f0fdf4' } 
        : { border: '1.5px solid #dbeafe', color: '#2563eb', background: '#eff6ff' };

const categoryTagStyle = { border: '1.5px solid #e5e7eb', color: '#4b5563', background: '#f9fafb' };

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
        return catMatch && urgMatch && locMatch && skillMatch;
    });

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#e0f0e8 0%,#f5f0e8 45%,#fce8d8 100%)', paddingBottom: '4rem' }}>
            <style>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif; }

                /* Navbar */
                .exp-nav { display: flex; align-items: center; justify-content: space-between; padding: 1.2rem 2.5rem; }
                .exp-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
                .exp-brand-icon { 
                    width: 38px; height: 38px; background: #0f7b5e; border-radius: 10px; 
                    display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 1.2rem;
                }
                .exp-nav-links { display: flex; gap: 0.5rem; }
                .exp-nav-links a {
                    text-decoration: none; color: #4b5563; font-size: 0.9rem; font-weight: 600;
                    padding: 0.6rem 1.2rem; border-radius: 2rem; transition: all 0.2s;
                }
                .exp-nav-links a:hover { color: #0f7b5e; background: rgba(15, 123, 94, 0.05); }
                .exp-nav-links a.active { background: #0d2a22; color: white; }

                /* Hero Section */
                .exp-hero {
                    background: #0d2a22; border-radius: 1.8rem; margin: 0.5rem 2.5rem 2rem;
                    padding: 3.5rem; color: white; position: relative; overflow: hidden;
                    box-shadow: 0 20px 40px rgba(13, 42, 34, 0.15);
                }
                .exp-hero::after {
                    content: ''; position: absolute; top: -10%; right: -5%; width: 300px; height: 300px;
                    background: radial-gradient(circle, rgba(15,123,94,0.4) 0%, transparent 70%); border-radius: 50%;
                }
                .exp-hero-eyebrow { font-size: 0.7rem; font-weight: 800; letter-spacing: 2px; opacity: 0.6; text-transform: uppercase; margin-bottom: 1rem; }
                .exp-hero-title { font-size: 2.8rem; font-weight: 800; line-height: 1.1; margin-bottom: 1rem; max-width: 700px; letter-spacing: -1px; }
                .exp-hero-sub { font-size: 1rem; opacity: 0.7; max-width: 500px; line-height: 1.6; }

                /* Layout */
                .exp-container { display: grid; grid-template-columns: 320px 1fr; gap: 2rem; margin: 0 2.5rem; align-items: start; }

                /* Sidebar Filter */
                .exp-filter-card { background: #fffdf9; border-radius: 1.6rem; padding: 2.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.02); }
                .filter-eyebrow { font-size: 0.7rem; font-weight: 800; color: #0f7b5e; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 0.5rem; }
                .filter-title { font-size: 2rem; font-weight: 800; color: #0d2a22; margin-bottom: 2.5rem; letter-spacing: -0.5px; }
                .filter-group { margin-bottom: 2rem; }
                .filter-label { font-size: 0.85rem; font-weight: 700; color: #374151; margin-bottom: 0.8rem; display: block; }
                .filter-input, .filter-select {
                    width: 100%; border: none; border-bottom: 2px solid #e5e7eb; padding: 0.7rem 0;
                    font-size: 0.95rem; color: #1f2937; background: transparent; outline: none; transition: border-color 0.3s;
                }
                .filter-input:focus, .filter-select:focus { border-color: #0f7b5e; }
                .filter-select { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right center; }

                /* Request Cards */
                .exp-feed { display: flex; flex-direction: column; gap: 1.2rem; }
                .exp-card { 
                    background: #fffdf9; border-radius: 1.6rem; padding: 2rem; 
                    box-shadow: 0 4px 15px rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.02);
                    transition: transform 0.2s;
                }
                .exp-card:hover { transform: translateY(-2px); }
                .exp-tag-row { display: flex; gap: 0.6rem; margin-bottom: 1.2rem; flex-wrap: wrap; }
                .pill { font-size: 0.75rem; font-weight: 700; padding: 0.4rem 1rem; border-radius: 2rem; }
                .exp-card-title { font-size: 1.25rem; font-weight: 800; color: #0d2a22; margin-bottom: 0.8rem; line-height: 1.3; }
                .exp-card-desc { font-size: 0.95rem; color: #6b7280; line-height: 1.6; margin-bottom: 1.5rem; }
                .skill-pill { font-size: 0.75rem; font-weight: 600; padding: 0.3rem 0.8rem; background: #f3f4f6; color: #4b5563; border-radius: 0.5rem; border: 1px solid #e5e7eb; }
                .exp-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #f3f4f6; }
                .author-name { font-size: 0.95rem; font-weight: 800; color: #0d2a22; }
                .author-meta { font-size: 0.8rem; color: #9ca3af; margin-top: 2px; }
                .action-btn { 
                    padding: 0.6rem 1.2rem; border-radius: 0.8rem; border: none; background: #0d2a22; 
                    color: white; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: opacity 0.2s;
                }
                .action-btn:hover { opacity: 0.9; }
                .action-btn:disabled { background: #e5e7eb; color: #9ca3af; cursor: not-allowed; }

                @media (max-width: 1024px) {
                    .exp-container { grid-template-columns: 1fr; }
                    .exp-hero-title { font-size: 2.2rem; }
                    .exp-nav, .exp-hero, .exp-container { margin-left: 1rem; margin-right: 1rem; }
                }
            `}</style>

            <nav className="exp-nav">
                <Link to="/" className="exp-brand">
                    <div className="exp-brand-icon">H</div>
                    <span style={{ fontWeight: 900, color: '#0d2a22', fontSize: '1.1rem', letterSpacing: '-0.5px' }}>HelpHub AI</span>
                </Link>
                <div className="exp-nav-links">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/explore" className="active">Explore</Link>
                    <Link to="/leaderboard">Leaderboard</Link>
                    <Link to="/notifications">Notifications</Link>
                </div>
            </nav>

            <div className="exp-hero">
                <p className="exp-hero-eyebrow">Explore / Feed</p>
                <h1 className="exp-hero-title">Browse help requests with filterable community context.</h1>
                <p className="exp-hero-sub">Filter by category, urgency, skills, and location to surface the best matches for your expertise.</p>
            </div>

            <div className="exp-container">
                <aside className="exp-filter-card">
                    <p className="filter-eyebrow">Filters</p>
                    <h2 className="filter-title">Refine the feed</h2>

                    <div className="filter-group">
                        <label className="filter-label">Category</label>
                        <select className="filter-select" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="">All categories</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Design">Design</option>
                            <option value="Career">Career</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Urgency</label>
                        <select className="filter-select" value={urgency} onChange={e => setUrgency(e.target.value)}>
                            <option value="">All levels</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Skills</label>
                        <input className="filter-input" placeholder="React, Figma..." value={skills} onChange={e => setSkills(e.target.value)} />
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Location</label>
                        <input className="filter-input" placeholder="City or Remote" value={location} onChange={e => setLocation(e.target.value)} />
                    </div>
                </aside>

                <main className="exp-feed">
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem', background: '#fffdf9', borderRadius: '1.6rem', color: '#9ca3af' }}>
                            No requests match your current filters.
                        </div>
                    ) : (
                        filtered.map(req => (
                            <div className="exp-card" key={req._id}>
                                <div className="exp-tag-row">
                                    <span className="pill" style={categoryTagStyle}>{req.category}</span>
                                    <span className="pill" style={getUrgencyStyles(req.urgency)}>{req.urgency}</span>
                                    <span className="pill" style={getStatusStyles(req.status)}>{req.status === 'solved' ? 'Solved' : 'Open'}</span>
                                </div>

                                <h3 className="exp-card-title">{req.title}</h3>
                                <p className="exp-card-desc">{req.description}</p>

                                <div className="exp-tag-row">
                                    {req.tags?.map(t => <span key={t} className="skill-pill">{t}</span>)}
                                </div>

                                <div className="exp-footer">
                                    <div>
                                        <p className="author-name">{req.createdBy?.name}</p>
                                        <p className="author-meta">{req.createdBy?.location} • {req.helpers || 0} interested</p>
                                    </div>
                                    {req.status === 'solved' ? (
                                        <button className="action-btn" disabled>Solved</button>
                                    ) : req.createdBy?._id === userInfo?._id ? (
                                        <button className="action-btn" onClick={() => handleSolve(req._id)}>Mark Solved</button>
                                    ) : (
                                        <button className="action-btn" onClick={() => handleHelp(req._id)}>I can help</button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </main>
            </div>
        </div>
    );
};

export default Explore;