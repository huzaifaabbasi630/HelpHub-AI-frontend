import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Filter } from 'lucide-react';

const Explore = () => {
    const [requests, setRequests] = useState([]);
    const [category, setCategory] = useState('');
    const [urgency, setUrgency] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const fetchRequests = async () => {
        try {
            let url = 'http://localhost:5000/api/requests?';
            if (category) url += `category=${category}&`;
            if (urgency) url += `urgency=${urgency}&`;
            const { data } = await axios.get(url);
            setRequests(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [category, urgency]);

    const handleHelp = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.patch(`http://localhost:5000/api/requests/${id}/help`, {}, config);
            alert('Your offer to help has been sent!');
            fetchRequests();
        } catch (err) {
            alert(err.response?.data?.message || 'Action failed');
        }
    };

    const handleSolve = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.patch(`http://localhost:5000/api/requests/${id}/solve`, {}, config);
            alert('Request marked as solved!');
            fetchRequests();
        } catch (err) {
            alert(err.response?.data?.message || 'Action failed');
        }
    };

    return (
        <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem' }}>Explore Requests</h1>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label className="label-title">Category</label>
                    <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="Programming">Programming</option>
                        <option value="Design">Design</option>
                        <option value="General">General</option>
                    </select>
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label className="label-title">Urgency</label>
                    <select className="input-field" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                        <option value="">Any Urgency</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {requests.map(req => (
                    <div key={req._id} className="premium-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ padding: '0.3rem 0.8rem', background: '#eef2ff', color: '#4f46e5', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>{req.category}</span>
                                <span style={{ color: req.urgency === 'High' ? 'red' : req.urgency === 'Medium' ? 'orange' : 'green', fontSize: '0.75rem', fontWeight: 'bold' }}>{req.urgency} Urgency</span>
                            </div>
                            <h3 style={{ marginBottom: '0.5rem' }}>{req.title}</h3>
                            <p style={{ opacity: '0.7', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{req.description}</p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {req.tags.map(tag => <span key={tag} style={{ fontSize: '0.8rem', opacity: '0.6' }}>#{tag}</span>)}
                            </div>
                        </div>
                        
                        <div style={{ marginTop: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                                <div style={{ width: '30px', height: '30px', background: '#0d2a22', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>{req.createdBy?.name[0]}</div>
                                <span>{req.createdBy?.name} • {req.createdBy?.location}</span>
                            </div>
                            
                            {req.status === 'solved' ? (
                                <button disabled className="btn-primary" style={{ background: '#eee', color: '#999', cursor: 'not-allowed' }}>Solved</button>
                            ) : req.createdBy?._id === userInfo?._id ? (
                                <button onClick={() => handleSolve(req._id)} className="btn-primary" style={{ background: '#0d2a22' }}>Mark as Solved</button>
                            ) : (
                                <button onClick={() => handleHelp(req._id)} className="btn-primary">I can help</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Explore;
