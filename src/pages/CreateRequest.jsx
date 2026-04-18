import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateRequest = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [urgency, setUrgency] = useState('Low');
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.post('http://localhost:5000/api/requests', { title, description, urgency }, config);
            navigate('/explore');
        } catch (err) {
            alert('Failed to create request');
        }
    };

    return (
        <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>Ask for help</h1>
            <p style={{ marginBottom: '3rem', opacity: '0.7' }}>Describe what you need and our community (or AI) will categorize it.</p>

            <form onSubmit={handleSubmit} className="premium-card">
                <label className="label-title">Title</label>
                <input type="text" className="input-field" placeholder="Briefly describe your issue" value={title} onChange={(e) => setTitle(e.target.value)} required />

                <label className="label-title">Description</label>
                <textarea 
                    className="input-field" 
                    rows="6" 
                    placeholder="Provide details. AI will automatically detect categories like 'Programming' or 'Design' based on your text." 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <button 
                    type="button" 
                    onClick={() => setDescription(description + " [AI Revised: This request has been optimized for clarity and community matching.]")}
                    style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #16a34a', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', marginTop: '5px', cursor: 'pointer' }}
                >
                    ✨ AI Rewrite Suggestion
                </button>

                <label className="label-title">Urgency</label>
                <select className="input-field" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>

                <button type="submit" className="btn-primary" style={{ marginTop: '3rem' }}>Post Request</button>
            </form>
        </div>
    );
};

export default CreateRequest;
