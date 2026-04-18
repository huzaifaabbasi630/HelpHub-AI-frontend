import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/apiConfig';

const Profile = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({ name: '', location: '', skills: '', interests: '' });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!userInfo) { navigate('/login'); return; }
        const fetchProfile = async () => {
            try {
                const { data } = await API.get('/api/user/leaderboard');
                const current = data.find(u => u._id === userInfo._id) || userInfo;
                setUser(current);
                setForm({
                    name: current.name || '',
                    location: current.location || '',
                    skills: Array.isArray(current.skills) ? current.skills.join(', ') : (current.skills || ''),
                    interests: Array.isArray(current.interests) ? current.interests.join(', ') : (current.interests || ''),
                });
            } catch {
                setUser(userInfo);
                setForm({
                    name: userInfo.name || '',
                    location: userInfo.location || '',
                    skills: Array.isArray(userInfo.skills) ? userInfo.skills.join(', ') : (userInfo.skills || ''),
                    interests: Array.isArray(userInfo.interests) ? userInfo.interests.join(', ') : (userInfo.interests || ''),
                });
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                name: form.name,
                location: form.location,
                skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
                interests: form.interests.split(',').map(s => s.trim()).filter(Boolean),
            };
            const { data } = await API.put('/api/user/profile', payload);
            localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...data }));
            setUser(prev => ({ ...prev, ...data }));
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch (err) {
            console.error(err);
        }
        setSaving(false);
    };

    const skills = user?.skills
        ? (Array.isArray(user.skills) ? user.skills : user.skills.split(',').map(s => s.trim()).filter(Boolean))
        : ['Figma', 'UI/UX', 'HTML/CSS', 'Career Guidance'];

    const badges = user?.badges || ['Design Ally', 'Fast Responder', 'Top Mentor'];
    const trustScore = user?.trustScore ?? 100;
    const contributions = user?.contributions ?? 35;

    if (!user) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", background: 'linear-gradient(135deg,#e0f0e8,#f5f0e8,#fce8d8)' }}>
            <p style={{ color: '#6b7280' }}>Loading profile...</p>
        </div>
    );

    return (
        <div style={{ background: 'linear-gradient(135deg,#e0f0e8 0%,#f5f0e8 45%,#fce8d8 100%)', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
            <style>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }

                /* Navbar */
                .prof-nav {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 2.5rem;
                }
                .nav-brand {
                    display: flex; align-items: center; gap: 10px;
                    text-decoration: none;
                }
                .brand-box {
                    width: 36px; height: 36px;
                    background: #0f7b5e; border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    color: white; font-weight: 800; font-size: 1rem;
                }
                .nav-links {
                    display: flex; align-items: center; gap: 0.5rem;
                    list-style: none;
                }
                .nav-links a {
                    text-decoration: none; color: #555;
                    font-size: 0.9rem; font-weight: 500;
                    padding: 0.45rem 1rem; border-radius: 2rem;
                    transition: background 0.2s;
                }
                .nav-links a:hover { color: #0f7b5e; }
                .nav-links a.active {
                    background: #e8f5f0; color: #0d6a50; font-weight: 700;
                }

                /* Hero Banner */
                .hero-banner {
                    background: #0d2a22;
                    border-radius: 1.4rem;
                    margin: 0.5rem 2.5rem 1.5rem;
                    padding: 2.5rem 3rem;
                    color: white;
                }
                .hero-banner .eyebrow {
                    font-size: 0.68rem; font-weight: 800;
                    letter-spacing: 2.5px; opacity: 0.55;
                    text-transform: uppercase; margin-bottom: 0.9rem;
                }
                .hero-banner h1 {
                    font-size: 3.2rem; font-weight: 900;
                    letter-spacing: -1px; line-height: 1.05;
                    margin-bottom: 0.7rem;
                }
                .hero-banner .meta {
                    font-size: 0.95rem; opacity: 0.6;
                }

                /* Two-column content */
                .content-row {
                    display: grid;
                    grid-template-columns: 1.1fr 0.9fr;
                    gap: 1.2rem;
                    padding: 0 2.5rem 3rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                /* Cards */
                .prof-card {
                    background: white;
                    border-radius: 1.6rem;
                    padding: 2.5rem;
                }

                /* Public Profile */
                .pub-eyebrow {
                    font-size: 0.65rem; font-weight: 800;
                    letter-spacing: 2px; color: #0f7b5e;
                    text-transform: uppercase; margin-bottom: 0.6rem;
                }
                .pub-title {
                    font-size: 2rem; font-weight: 900;
                    color: #0d2a22; letter-spacing: -0.5px;
                    margin-bottom: 2rem;
                }
                .pub-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 0;
                    border-bottom: 1px solid #f3f4f6;
                    font-size: 0.92rem;
                }
                .pub-row-label { color: #374151; font-weight: 500; }
                .pub-row-value { font-weight: 800; color: #0d2a22; }
                .pub-section-label {
                    font-size: 0.82rem; font-weight: 800;
                    color: #0d2a22; margin: 1.4rem 0 0.7rem;
                }
                .tag-pill {
                    display: inline-block;
                    padding: 5px 14px;
                    border: 1.5px solid #b2d8cc;
                    border-radius: 2rem;
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: #0d6a50;
                    background: transparent;
                    margin: 3px;
                }

                /* Edit Form */
                .edit-eyebrow {
                    font-size: 0.65rem; font-weight: 800;
                    letter-spacing: 2px; color: #0f7b5e;
                    text-transform: uppercase; margin-bottom: 0.6rem;
                }
                .edit-title {
                    font-size: 2rem; font-weight: 900;
                    color: #0d2a22; letter-spacing: -0.5px;
                    line-height: 1.15; margin-bottom: 1.8rem;
                }
                .form-row-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                .form-group { display: flex; flex-direction: column; margin-bottom: 1rem; }
                .form-label {
                    font-size: 0.78rem; font-weight: 700;
                    color: #374151; margin-bottom: 0.4rem;
                }
                .form-input {
                    padding: 0.72rem 1rem;
                    border: 1.5px solid #e5e7eb;
                    border-radius: 0.65rem;
                    font-size: 0.9rem;
                    color: #111827;
                    background: white;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    font-family: inherit;
                }
                .form-input:focus {
                    border-color: #0f7b5e;
                    box-shadow: 0 0 0 3px rgba(15,123,94,0.1);
                }
                .btn-save {
                    width: 100%;
                    padding: 1rem;
                    margin-top: 0.5rem;
                    background: #0f7b5e;
                    color: white;
                    border: none;
                    border-radius: 0.75rem;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: background 0.2s;
                    font-family: inherit;
                }
                .btn-save:hover { background: #0d6a50; }
                .btn-save:disabled { opacity: 0.7; cursor: not-allowed; }

                @media (max-width: 800px) {
                    .content-row { grid-template-columns: 1fr; }
                    .hero-banner h1 { font-size: 2.2rem; }
                    .form-row-2 { grid-template-columns: 1fr; }
                    .prof-nav, .hero-banner, .content-row { padding-left: 1.2rem; padding-right: 1.2rem; }
                    .hero-banner { margin-left: 1rem; margin-right: 1rem; }
                }
            `}</style>

            {/* Navbar */}
            <nav className="prof-nav">
                <Link to="/home" className="nav-brand">
                    <div className="brand-box">H</div>
                    <span style={{ fontWeight: 800, color: '#0d2a22', fontSize: '1.05rem' }}>HelpHub AI</span>
                </Link>
                <ul className="nav-links">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/onboarding">Onboarding</Link></li>
                    <li><Link to="/profile" className="active">Profile</Link></li>
                </ul>
            </nav>

            {/* Hero Banner */}
            <div className="hero-banner">
                <p className="eyebrow">Profile</p>
                <h1>{user.name || 'Ayesha Khan'}</h1>
                <p className="meta">{user.role || 'Both'} • {user.location || 'Karachi'}</p>
            </div>

            {/* Two-column Content */}
            <div className="content-row">

                {/* Left: Public Profile */}
                <div className="prof-card">
                    <p className="pub-eyebrow">Public Profile</p>
                    <h2 className="pub-title">Skills and reputation</h2>

                    <div className="pub-row">
                        <span className="pub-row-label">Trust score</span>
                        <span className="pub-row-value">{trustScore}%</span>
                    </div>
                    <div className="pub-row" style={{ borderBottom: 'none' }}>
                        <span className="pub-row-label">Contributions</span>
                        <span className="pub-row-value">{contributions}</span>
                    </div>

                    <p className="pub-section-label">Skills</p>
                    <div>
                        {skills.map(s => (
                            <span key={s} className="tag-pill">{s}</span>
                        ))}
                    </div>

                    <p className="pub-section-label">Badges</p>
                    <div>
                        {(Array.isArray(badges) ? badges : ['Design Ally', 'Fast Responder', 'Top Mentor']).map(b => (
                            <span key={b} className="tag-pill">{b}</span>
                        ))}
                    </div>
                </div>

                {/* Right: Edit Form */}
                <div className="prof-card">
                    <p className="edit-eyebrow">Edit Profile</p>
                    <h2 className="edit-title">Update your identity</h2>

                    <form onSubmit={handleSave}>
                        <div className="form-row-2">
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    value={form.name}
                                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                    placeholder="Ayesha Khan"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Location</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    value={form.location}
                                    onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                                    placeholder="Karachi"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Skills</label>
                            <input
                                className="form-input"
                                type="text"
                                value={form.skills}
                                onChange={e => setForm(p => ({ ...p, skills: e.target.value }))}
                                placeholder="Figma, UI/UX, HTML/CSS, Career Guidance"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Interests</label>
                            <input
                                className="form-input"
                                type="text"
                                value={form.interests}
                                onChange={e => setForm(p => ({ ...p, interests: e.target.value }))}
                                placeholder="Hackathons, UI/UX, Community Building"
                            />
                        </div>

                        <button type="submit" className="btn-save" disabled={saving}>
                            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save profile'}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Profile; 