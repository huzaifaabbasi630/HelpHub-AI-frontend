import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/apiConfig';

const Dashboard = () => {
    const [stats, setStats] = useState({ total: 0, solved: 0, contributions: 0, trustScore: 95 }); // Added default trust score
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
        <div style={{ backgroundColor: '#f9f8f3', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            
            {/* --- Fixed Navbar --- */}
            <nav style={{ 
                position: 'fixed', top: 0, width: '100%', zIndex: 1000, 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)',
                padding: '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: '1px solid #eee'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: '#0d2a22', color: 'white', padding: '5px 12px', borderRadius: '8px', fontWeight: 'bold' }}>H</div>
                    <span style={{ fontWeight: '700', color: '#0d2a22' }}>HelpHub AI</span>
                </div>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', color: '#666', fontSize: '0.9rem' }}>
                    <Link to="/dashboard" style={{ color: '#0d2a22', fontWeight: '600', textDecoration: 'none' }}>Dashboard</Link>
                    <Link to="/explore" style={{ textDecoration: 'none', color: 'inherit' }}>Explore</Link>
                    <Link to="/create-request" style={{ textDecoration: 'none', color: 'inherit' }}>Create Request</Link>
                    <Link to="/messages" style={{ textDecoration: 'none', color: 'inherit' }}>Messages</Link>
                    <button style={{ background: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: '600' }}>Open AI Center</button>
                </div>
            </nav>

            <main style={{ paddingTop: '100px', paddingBottom: '50px', maxWidth: '1200px', margin: '0 auto', px: '20px' }}>
                
                {/* --- Welcome Header --- */}
                <header style={{ 
                    background: '#1e2124', color: 'white', borderRadius: '24px', 
                    padding: '3rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden' 
                }}>
                    <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '0.5rem', opacity: 0.8 }}>Dashboard</p>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: '0' }}>Welcome back, {userInfo?.name || 'Ayesha Khan'}.</h1>
                    <p style={{ opacity: 0.7, marginTop: '10px' }}>Your command center for requests, AI insights, helper momentum, and live community activity.</p>
                </header>

                {/* --- Stats Row --- */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                    <StatCard label="Trust Score" value={`${stats.trustScore || 95}%`} subtext="Driven by solved requests and consistent support." />
                    <StatCard label="Helping" value={stats.contributions || 0} subtext="Requests where you are currently listed as a helper." />
                    <StatCard label="Open Requests" value={stats.total || 0} subtext="Community requests currently active across the feed." />
                    <StatCard label="AI Pulse" value="1 trends" subtext="Trend count detected in the latest request activity." />
                </div>

                {/* --- Main Content Grid --- */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '2rem' }}>
                    
                    {/* Left Side: Recent Requests */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', maxWidth: '300px' }}>What the community needs right now</h2>
                            <Link to="/explore" style={{ padding: '10px 20px', borderRadius: '25px', background: 'white', textDecoration: 'none', color: 'black', fontWeight: '600', fontSize: '0.9rem', border: '1px solid #eee' }}>Go to feed</Link>
                        </div>

                        {/* Request Card Component */}
                        <RequestCard 
                            category="Web Development" title="Need help making my portfolio responsive before demo day" 
                            desc="My HTML/CSS portfolio breaks on tablets and I need layout guidance..." 
                            tags={['HTML/CSS', 'Responsive', 'Portfolio']} status="Solved"
                        />
                        <RequestCard 
                            category="Design" title="Looking for Figma feedback on a volunteer event poster" 
                            desc="I have a draft poster for a campus community event and want sharper hierarchy..." 
                            tags={['Figma', 'Poster', 'Design Review']} status="Open"
                        />
                    </div>

                    {/* Right Side: AI Insights & Notifications */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ background: '#fff', borderRadius: '24px', padding: '2rem', border: '1px solid #f0f0f0' }}>
                            <p style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '1rem' }}>AI INSIGHTS</p>
                            <h3 style={{ marginBottom: '1.5rem' }}>Suggested actions for you</h3>
                            <div style={{ fontSize: '0.9rem', display: 'grid', gap: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ opacity: 0.6 }}>Most requested category</span>
                                    <span style={{ fontWeight: '700' }}>Web Development</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ opacity: 0.6 }}>Your strongest trust driver</span>
                                    <span style={{ fontWeight: '700' }}>Design Ally</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ background: '#fff', borderRadius: '24px', padding: '2rem', border: '1px solid #f0f0f0' }}>
                            <p style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '1rem' }}>NOTIFICATIONS</p>
                            <h3 style={{ marginBottom: '1.5rem' }}>Latest updates</h3>
                            <NotificationItem text="Your trust score increased after a solved request" time="1 hr ago" />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

/* --- Helper Components for UI Cleanliness --- */

const StatCard = ({ label, value, subtext }) => (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #f0f0f0' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.5rem' }}>{label}</p>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>{value}</h2>
        <p style={{ fontSize: '0.8rem', opacity: 0.6, lineHeight: '1.4' }}>{subtext}</p>
    </div>
);

const RequestCard = ({ category, title, desc, tags, status }) => (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', marginBottom: '1.5rem', border: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
            <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600' }}>{category}</span>
            <span style={{ background: '#fef2f2', color: '#dc2626', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600' }}>{status}</span>
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem' }}>{title}</h3>
        <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
                {tags.map(tag => <span key={tag} style={{ background: '#f3f4f6', padding: '5px 12px', borderRadius: '15px', fontSize: '0.8rem' }}>{tag}</span>)}
            </div>
            <button style={{ border: '1px solid #eee', padding: '8px 20px', borderRadius: '20px', background: 'white', fontWeight: '600', cursor: 'pointer' }}>Open details</button>
        </div>
    </div>
);

const NotificationItem = ({ text, time }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9f9f9' }}>
        <div style={{ maxWidth: '80%' }}>
            <p style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '4px' }}>{text}</p>
            <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>{time}</span>
        </div>
        <button style={{ fontSize: '0.75rem', fontWeight: '700', color: '#10b981', background: '#f0fdf4', border: 'none', padding: '4px 10px', borderRadius: '5px' }}>Read</button>
    </div>
);

export default Dashboard;