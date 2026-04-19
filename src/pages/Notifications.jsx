import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/apiConfig';

const Notifications = () => {
    const [notifs, setNotifs] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Fetch notifications on mount
    useEffect(() => {
        const fetchNotifs = async () => {
            try {
                const { data } = await API.get('/api/notifications');
                setNotifs(data);
            } catch (err) {
                console.error("Error fetching notifications:", err);
                // Fallback for UI preview if API is not yet running
                setNotifs([
                    { _id: '1', message: '"Need help making my portfolio responsive before demo day" was marked as solved', type: 'Status', createdAt: new Date(), read: false },
                    { _id: '2', message: 'New helper matched to your responsive portfolio request', type: 'Match', createdAt: new Date(Date.now() - 720000), read: false },
                    { _id: '3', message: 'Your trust score increased after a solved request', type: 'Reputation', createdAt: new Date(Date.now() - 3600000), read: true },
                    { _id: '4', message: 'AI Center detected rising demand for interview prep', type: 'Insight', createdAt: new Date(), read: true }
                ]);
            }
        };
        fetchNotifs();
    }, []);

    const markAsRead = async (id) => {
        try {
            await API.put(`/api/notifications/${id}/read`);
            setNotifs(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
        } catch (err) {
            console.error(err);
        }
    };

    const markAllRead = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
            await API.put('/api/notifications/mark-read', {}, config);
            setNotifs(prev => prev.map(n => ({ ...n, read: true })));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <style>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }
                
                body {
                    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
                    background: linear-gradient(135deg, #e0f0e8 0%, #f5f0e8 45%, #fce8d8 100%);
                    min-height: 100vh;
                    color: #111;
                }

                .notif-page { min-height: 100vh; display: flex; flex-direction: column; }

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

                .navbar-links a, .mark-all-btn {
                    text-decoration: none;
                    color: #555;
                    font-size: 0.9rem;
                    font-weight: 500;
                    padding: 0.45rem 1rem;
                    border-radius: 2rem;
                    transition: all 0.2s;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                }

                .navbar-links a:hover, .mark-all-btn:hover { color: #0f7b5e; }
                .navbar-links a.active {
                    background: #e8f5f0;
                    color: #0d6a50;
                    font-weight: 600;
                }

                /* ── Hero Banner ── */
                .hero-banner {
                    background: #0d2a22;
                    border-radius: 1.4rem;
                    margin: 0.5rem 2.5rem 2rem;
                    padding: 2.8rem 3rem;
                    color: white;
                }

                .hero-eyebrow {
                    text-transform: uppercase;
                    font-size: 0.7rem;
                    letter-spacing: 2.5px;
                    font-weight: 700;
                    opacity: 0.6;
                    margin-bottom: 1rem;
                }

                .hero-title {
                    font-size: 3rem;
                    font-weight: 800;
                    line-height: 1.1;
                    letter-spacing: -0.5px;
                    max-width: 650px;
                }

                /* ── Notification Feed ── */
                .feed-container {
                    background: #fcfaf2;
                    border-radius: 1.4rem;
                    margin: 0 2.5rem 3rem;
                    padding: 2.5rem;
                    border: 1px solid rgba(0,0,0,0.03);
                }

                .feed-header {
                    margin-bottom: 2rem;
                }

                .feed-eyebrow {
                    text-transform: uppercase;
                    font-size: 0.68rem;
                    letter-spacing: 2px;
                    font-weight: 700;
                    color: #0f7b5e;
                    margin-bottom: 0.8rem;
                }

                .feed-title {
                    font-size: 2.2rem;
                    font-weight: 800;
                    color: #111827;
                }

                .notif-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .notif-row {
                    background: white;
                    border-radius: 1rem;
                    padding: 1.5rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border: 1px solid rgba(0,0,0,0.05);
                    transition: transform 0.2s ease;
                }

                .notif-row:hover {
                    transform: translateY(-2px);
                }

                .notif-content {
                    display: flex;
                    flex-direction: column;
                    gap: 0.4rem;
                }

                .notif-message {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #111;
                }

                .notif-meta {
                    font-size: 0.85rem;
                    color: #777;
                }

                .read-btn {
                    padding: 0.5rem 1.2rem;
                    border-radius: 0.8rem;
                    font-size: 0.85rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 1px solid #eee;
                    background: #f9f9f9;
                    color: #444;
                }

                .read-btn:hover {
                    background: #f0f0f0;
                }

                .read-btn.unread-style {
                    background: #e8f5f0;
                    color: #0d6a50;
                    border-color: #b2d8cc;
                }

                @media (max-width: 768px) {
                    .hero-banner { margin: 1rem; padding: 2rem; }
                    .hero-title { font-size: 2rem; }
                    .feed-container { margin: 1rem; padding: 1.5rem; }
                    .notif-row { flex-direction: column; align-items: flex-start; gap: 1rem; }
                }
            `}</style>

            <div className="notif-page">
                {/* Navbar */}
                <nav className="navbar">
                    <Link to="/" className="navbar-brand">
                        <div className="brand-icon">H</div>
                        HelpHub AI
                    </Link>
                    <ul className="navbar-links">
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/explore">Explore</Link></li>
                        <li><button onClick={markAllRead} className="mark-all-btn">Mark all as read</button></li>
                        <li><Link to="/notifications" className="active">Notifications</Link></li>
                    </ul>
                </nav>

                {/* Hero */}
                <header className="hero-banner">
                    <p className="hero-eyebrow">Notifications</p>
                    <h1 className="hero-title">Stay updated on requests, helpers, and trust signals.</h1>
                </header>

                {/* Feed */}
                <main className="feed-container">
                    <div className="feed-header">
                        <p className="feed-eyebrow">Live Updates</p>
                        <h2 className="feed-title">Notification feed</h2>
                    </div>

                    <div className="notif-list">
                        {notifs.length === 0 ? (
                            <p style={{ opacity: 0.5, textAlign: 'center', padding: '2rem' }}>No new updates.</p>
                        ) : (
                            notifs.map(n => (
                                <div key={n._id} className="notif-row">
                                    <div className="notif-content">
                                        <p className="notif-message">{n.message}</p>
                                        <p className="notif-meta">
                                            {n.type} • {n.createdAt instanceof Date ? n.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}
                                        </p>
                                    </div>
                                    <button 
                                        className={`read-btn ${!n.read ? 'unread-style' : ''}`}
                                        onClick={() => markAsRead(n._id)}
                                    >
                                        {n.read ? 'Read' : 'Mark Read'}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </main>
            </div>
        </>
    );
};

export default Notifications;