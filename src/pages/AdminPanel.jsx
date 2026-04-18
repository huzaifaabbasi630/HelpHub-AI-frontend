import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, ShieldAlert, BarChart3, Users } from 'lucide-react';

const AdminPanel = () => {
    const [requests, setRequests] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, activeRequests: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: reqs } = await axios.get('http://localhost:5000/api/requests');
                setRequests(reqs);
                setStats({ totalUsers: 124, activeRequests: reqs.length });
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const deleteRequest = async (id) => {
        if (window.confirm('Moderate this content? This will permanently delete the request.')) {
            // Logic for deletion (would need a DELETE route on backend)
            setRequests(requests.filter(r => r._id !== id));
        }
    };

    return (
        <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '3rem' }}>
                <ShieldAlert size={40} color="#ef4444" />
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Admin Command Center</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                <div className="premium-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '15px', background: '#f0fdf4', color: '#10b981', borderRadius: '12px' }}><Users size={24} /></div>
                    <div>
                        <h4 style={{ opacity: 0.6 }}>Total Users</h4>
                        <h2 style={{ fontSize: '2rem' }}>{stats.totalUsers}</h2>
                    </div>
                </div>
                <div className="premium-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '15px', background: '#eff6ff', color: '#3b82f6', borderRadius: '12px' }}><BarChart3 size={24} /></div>
                    <div>
                        <h4 style={{ opacity: 0.6 }}>Active Requests</h4>
                        <h2 style={{ fontSize: '2rem' }}>{stats.activeRequests}</h2>
                    </div>
                </div>
            </div>

            <div className="premium-card">
                <h3 style={{ marginBottom: '2rem' }}>Moderate Requests</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '1rem' }}>Title</th>
                                <th style={{ padding: '1rem' }}>User</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(req => (
                                <tr key={req._id} style={{ borderBottom: '1px solid #f9fafb' }}>
                                    <td style={{ padding: '1rem' }}>{req.title}</td>
                                    <td style={{ padding: '1rem' }}>{req.createdBy?.name}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ padding: '4px 10px', background: req.status === 'open' ? '#fef2f2' : '#f0fdf4', color: req.status === 'open' ? '#ef4444' : '#10b981', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <button onClick={() => deleteRequest(req._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
