import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/apiConfig';

const Dashboard = () => {
    const [stats, setStats] = useState({ total: 0, solved: 0, contributions: 0 });
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await API.get('/api/requests/stats');
                setStats(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Welcome, {userInfo?.name}!</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {userInfo?.role !== 'Can Help' && (
                        <Link to="/create-request" className="btn-primary" style={{ textDecoration: 'none' }}>Create Request</Link>
                    )}
                    <Link to="/explore" className="btn-primary" style={{ background: '#f3f4f6', color: '#0d2a22', textDecoration: 'none' }}>Explore Requests</Link>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                <div className="premium-card" style={{ textAlign: 'center' }}>
                    <p style={{ opacity: '0.6', fontWeight: 'bold' }}>Total Requests</p>
                    <h2 style={{ fontSize: '3rem', color: '#10b981' }}>{stats.total}</h2>
                </div>
                <div className="premium-card" style={{ textAlign: 'center' }}>
                    <p style={{ opacity: '0.6', fontWeight: 'bold' }}>Solved</p>
                    <h2 style={{ fontSize: '3rem', color: '#10b981' }}>{stats.solved}</h2>
                </div>
                <div className="premium-card" style={{ textAlign: 'center' }}>
                    <p style={{ opacity: '0.6', fontWeight: 'bold' }}>My Contributions</p>
                    <h2 style={{ fontSize: '3rem', color: '#10b981' }}>{stats.contributions}</h2>
                </div>
            </div>

            <div className="premium-card">
                <h3 style={{ marginBottom: '2rem' }}>Quick Actions</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link to="/explore" style={{ flex: 1, padding: '2rem', background: '#0d2a22', color: 'white', borderRadius: '1rem', textDecoration: 'none', textAlign: 'center' }}>
                        <h4>Explore Requests</h4>
                        <p style={{ opacity: '0.7', fontSize: '0.9rem', marginTop: '0.5rem' }}>Find someone to help today</p>
                    </Link>
                    <Link to="/leaderboard" style={{ flex: 1, padding: '2rem', border: '1px solid #ddd', color: '#0d2a22', borderRadius: '1rem', textDecoration: 'none', textAlign: 'center' }}>
                        <h4>Leaderboard</h4>
                        <p style={{ opacity: '0.7', fontSize: '0.9rem', marginTop: '0.5rem' }}>See top contributors</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
