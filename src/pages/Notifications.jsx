import React, { useState, useEffect } from 'react';
import API from '../api/apiConfig';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .notif-page {
    min-height: 100vh;
    background-color: #eee9e0;
    font-family: 'Inter', sans-serif;
  }

  /* HERO */
  .notif-hero {
    margin: 0 2.5rem 0 2.5rem;
    background: #2a2f2e;
    border-radius: 18px;
    padding: 2.8rem 3rem 5rem 3rem;
    position: relative;
    overflow: hidden;
  }
  .notif-hero-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #9aa3a1;
    text-transform: uppercase;
    margin-bottom: 0.9rem;
  }
  .notif-hero-title {
    font-size: 2.6rem;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.15;
    max-width: 620px;
  }

  /* NAV */
  .notif-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.5rem;
    height: 56px;
    background: #2a2f2e;
    margin: 0 2.5rem;
    border-radius: 0 0 18px 18px;
  }
  .notif-nav-logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 600;
    font-size: 1rem;
    color: #fff;
    text-decoration: none;
  }
  .notif-nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .notif-nav-link {
    color: #ccc;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
  }

  /* FEED */
  .notif-feed-wrap {
    margin: 2rem 2.5rem 3rem 2.5rem;
  }
  .notif-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 2rem;
  }
  .notif-feed-title {
    font-size: 1.85rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
  }
  .notif-row {
    padding: 1.2rem 0;
    border-bottom: 1px solid #f0ece4;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .notif-msg { font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
  .notif-meta { font-size: 0.8rem; color: #999; }
  .notif-badge { font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 20px; }
  .unread { background: #fef2f2; color: #ef4444; }
  .read { background: #f3f4f6; color: #9ca3af; }
`;

const Notifications = () => {
    const [notifs, setNotifs] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchNotifs = async () => {
            try {
                const { data } = await API.get('/api/notifications');
                setNotifs(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchNotifs();
    }, []);

    const markAsRead = async (id) => {
        try {
            await API.put(`/api/notifications/${id}/read`);
            setNotifs(notifs.map(n => n._id === id ? { ...n, read: true } : n));
        } catch (err) {
            console.error(err);
        }
    };

    const markAllRead = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put('http://localhost:5000/api/notifications/mark-read', {}, config);
            setNotifs(notifs.map(n => ({ ...n, read: true })));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="notif-page">
            <style>{styles}</style>
            <div className="notif-hero">
                <p className="notif-hero-label">NOTIFICATIONS</p>
                <h1 className="notif-hero-title">Stay updated on requests, helpers, and trust signals.</h1>
            </div>
            
            <nav className="notif-nav">
                <a href="/home" className="notif-nav-logo">HelpHub AI</a>
                <div className="notif-nav-links">
                    <a href="/home" className="notif-nav-link">Home</a>
                    <a href="/explore" className="notif-nav-link">Explore</a>
                    <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: '#1a9e8f', cursor: 'pointer', fontWeight: 700 }}>Mark all as read</button>
                </div>
            </nav>

            <div className="notif-feed-wrap">
                <div className="notif-card">
                    <h2 className="notif-feed-title">Notification feed</h2>
                    {notifs.length === 0 && <p style={{ opacity: 0.5 }}>No notifications yet.</p>}
                    {notifs.map(n => (
                        <div key={n._id} className="notif-row">
                            <div>
                                <p className="notif-msg">{n.message}</p>
                                <p className="notif-meta">{new Date(n.createdAt).toLocaleString()}</p>
                            </div>
                            <span className={`notif-badge ${n.read ? 'read' : 'unread'}`}>
                                {n.read ? 'Read' : 'New'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;