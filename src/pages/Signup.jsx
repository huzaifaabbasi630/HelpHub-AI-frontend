import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Both');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/signup', { name, email, password, role });
            localStorage.setItem('tempEmail', email);
            navigate('/verify');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', padding: '2rem' }}>
            <div style={{ display: 'flex', maxWidth: '1100px', width: '100%', gap: '1rem', flexWrap: 'wrap' }}>
                
                {/* Left Card */}
                <div style={{ 
                    flex: '1', 
                    background: '#0d2a22', 
                    borderRadius: '2rem', 
                    padding: '3rem', 
                    color: 'white',
                    minWidth: '350px'
                }}>
                    <p style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 'bold', opacity: '0.7' }}>Join Community</p>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '700', lineHeight: '1.1', margin: '2rem 0' }}>Start your journey with us.</h1>
                    <p style={{ fontSize: '1.1rem', opacity: '0.9', lineHeight: '1.6' }}>Create an account to access the support network, offer help, and track your contributions to the community.</p>
                </div>

                {/* Right Card */}
                <div style={{ 
                    flex: '1', 
                    background: '#fcfaf2', 
                    borderRadius: '2rem', 
                    padding: '3rem', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    minWidth: '350px'
                }}>
                    <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px', color: '#0d2a22' }}>Signup</p>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '1rem 0 2rem 0', color: '#111827' }}>Create community profile</h2>
                    
                    <form onSubmit={handleSignup}>
                        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                        
                        <label className="label-title">Full Name</label>
                        <input type="text" className="input-field" placeholder="Ayesha Khan" value={name} onChange={(e) => setName(e.target.value)} required />

                        <label className="label-title">Role selection</label>
                        <select className="input-field" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option>Both</option>
                            <option>Need Help</option>
                            <option>Can Help</option>
                        </select>

                        <label className="label-title">Email</label>
                        <input type="email" className="input-field" placeholder="community@helphub.ai" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label className="label-title">Password</label>
                        <input type="password" className="input-field" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <button type="submit" className="btn-primary" style={{ marginTop: '2rem', padding: '1rem' }}>Create Account</button>
                    </form>
                    
                    <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                        Already have an account? <Link to="/login" style={{ color: '#10b981', fontWeight: '600', textDecoration: 'none' }}>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
