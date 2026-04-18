import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Onboarding = () => {
    const [role, setRole] = useState('Both');
    const [location, setLocation] = useState('');
    const [interests, setInterests] = useState('');
    const [skills, setSkills] = useState([]);
    const [suggestedSkills, setSuggestedSkills] = useState([]);
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleSuggestSkills = async () => {
        try {
            const interestArray = interests.split(',').map(i => i.trim());
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.post('http://localhost:5000/api/user/suggest-skills', { interests: interestArray }, config);
            setSuggestedSkills(data.canHelp || []); // Using the canHelp suggestions for main skills list
            // Optionally store needHelp suggestions too
        } catch (err) {
            console.error(err);
        }
    };

    const handleComplete = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const payload = {
                role,
                location,
                interests: interests.split(',').map(i => i.trim()),
                skills
            };
            await axios.put('http://localhost:5000/api/user/profile', payload, config);
            navigate('/home');
        } catch (err) {
            alert('Update failed');
        }
    };

    return (
        <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>Complete your profile</h1>
            <p style={{ marginBottom: '3rem', opacity: '0.7' }}>Tell us more about yourself to get the best experience.</p>

            <form onSubmit={handleComplete} className="premium-card">
                <label className="label-title">Your Role</label>
                <select className="input-field" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option>Need Help</option>
                    <option>Can Help</option>
                    <option>Both</option>
                </select>

                <label className="label-title">Location</label>
                <input type="text" className="input-field" placeholder="e.g. San Francisco, CA" value={location} onChange={(e) => setLocation(e.target.value)} required />

                <label className="label-title">Interests (comma separated)</label>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <input type="text" className="input-field" placeholder="e.g. coding, design" value={interests} onChange={(e) => setInterests(e.target.value)} />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button type="button" onClick={handleSuggestSkills} className="btn-primary" style={{ width: 'auto', marginTop: '0.5rem', fontSize: '0.8rem', background: '#0d2a22' }}>AI: Skills I Can Help With</button>
                        <button type="button" onClick={handleSuggestSkills} className="btn-primary" style={{ width: 'auto', marginTop: '0.5rem', fontSize: '0.8rem' }}>AI: Areas I Need Help In</button>
                    </div>
                </div>

                {suggestedSkills.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>AI Suggestions:</p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {suggestedSkills.map(s => (
                                <button 
                                    key={s} 
                                    type="button" 
                                    onClick={() => setSkills([...new Set([...skills, s])])}
                                    style={{ padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid #ddd', background: skills.includes(s) ? '#10b981' : 'white', color: skills.includes(s) ? 'white' : 'black', cursor: 'pointer' }}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <label className="label-title">Your Skills</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                    {skills.map(s => (
                        <span key={s} style={{ padding: '0.4rem 1rem', background: '#eee', borderRadius: '20px', fontSize: '0.9rem' }}>{s}</span>
                    ))}
                    {skills.length === 0 && <p style={{ opacity: '0.5', fontSize: '0.9rem' }}>No skills added yet.</p>}
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '3rem' }}>Finish Onboarding</button>
            </form>
        </div>
    );
};

export default Onboarding;
