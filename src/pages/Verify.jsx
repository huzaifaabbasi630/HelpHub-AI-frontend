import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const email = localStorage.getItem('tempEmail');

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/verify-email', { email, code });
            alert('Email verified successfully! You can now login.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Verification failed');
        }
    };

    return (
        <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="premium-card" style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>Verify Email</h2>
                <p style={{ marginBottom: '2rem', opacity: '0.7' }}>Enter the 6-digit code sent to <b>{email}</b></p>
                
                <form onSubmit={handleVerify}>
                    {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="123456" 
                        style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '10px' }}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        maxLength="6"
                        required 
                    />
                    <button type="submit" className="btn-primary" style={{ marginTop: '2rem' }}>Verify & Continue</button>
                </form>
            </div>
        </div>
    );
};

export default Verify;
