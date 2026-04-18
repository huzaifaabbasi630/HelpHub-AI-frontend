import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/apiConfig';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/api/auth/login', { name, email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/onboarding');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <>
            <style>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }

                body {
                    background: #f0ede3;
                    font-family: 'Segoe UI', sans-serif;
                }

                .page-bg {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #e8f5e2 0%, #f5f0e8 40%, #fce8d8 100%);
                    display: flex;
                    flex-direction: column;
                }

                /* ── Navbar ── */
                .navbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.1rem 3rem;
                    background: transparent;
                }

                .navbar-brand {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                    color: #111;
                    font-weight: 700;
                    font-size: 1.05rem;
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
                    font-size: 1rem;
                }

                .navbar-links {
                    display: flex;
                    gap: 2.2rem;
                    list-style: none;
                }

                .navbar-links a {
                    text-decoration: none;
                    color: #333;
                    font-size: 0.95rem;
                    font-weight: 500;
                    transition: color 0.2s;
                }

                .navbar-links a:hover { color: #0f7b5e; }

                /* ── Main Layout ── */
                .login-wrapper {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem 3rem 3rem;
                }

                .login-cards {
                    display: flex;
                    max-width: 1080px;
                    width: 100%;
                    gap: 1.2rem;
                    flex-wrap: wrap;
                }

                /* ── Left Card ── */
                .card-left {
                    flex: 1;
                    min-width: 320px;
                    background: #0d2a22;
                    border-radius: 1.8rem;
                    padding: 3rem;
                    color: white;
                    display: flex;
                    flex-direction: column;
                }

                .card-left .eyebrow {
                    text-transform: uppercase;
                    font-size: 0.72rem;
                    letter-spacing: 2.5px;
                    font-weight: 700;
                    opacity: 0.6;
                    margin-bottom: 1.8rem;
                }

                .card-left h1 {
                    font-size: 3.2rem;
                    font-weight: 800;
                    line-height: 1.08;
                    margin-bottom: 1.4rem;
                    letter-spacing: -0.5px;
                }

                .card-left .subtitle {
                    font-size: 1rem;
                    opacity: 0.85;
                    line-height: 1.65;
                    margin-bottom: 2.4rem;
                }

                .feature-list {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .feature-list li {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    font-size: 0.92rem;
                    opacity: 0.9;
                    line-height: 1.5;
                }

                .feature-list li::before {
                    content: '•';
                    font-size: 1.1rem;
                    opacity: 0.7;
                    flex-shrink: 0;
                    margin-top: 1px;
                }

                /* ── Right Card ── */
                .card-right {
                    flex: 1;
                    min-width: 320px;
                    background: #fcfaf2;
                    border-radius: 1.8rem;
                    padding: 3rem;
                    box-shadow: 0 8px 40px rgba(0,0,0,0.06);
                    display: flex;
                    flex-direction: column;
                }

                .card-right .eyebrow {
                    text-transform: uppercase;
                    font-size: 0.72rem;
                    letter-spacing: 2.5px;
                    font-weight: 700;
                    color: #0d2a22;
                    margin-bottom: 0.8rem;
                }

                .card-right h2 {
                    font-size: 2.3rem;
                    font-weight: 800;
                    color: #111827;
                    line-height: 1.15;
                    margin-bottom: 2.2rem;
                    letter-spacing: -0.3px;
                }

                /* ── Form Elements ── */
                .form-label {
                    display: block;
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 0.4rem;
                    letter-spacing: 0.3px;
                }

                .form-input, .form-select {
                    width: 100%;
                    padding: 0.78rem 1rem;
                    border: 1.5px solid #e0ddd4;
                    border-radius: 0.7rem;
                    font-size: 0.95rem;
                    color: #111827;
                    background: #fff;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    margin-bottom: 1.1rem;
                    appearance: none;
                    -webkit-appearance: none;
                }

                .form-select {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 0.9rem center;
                    padding-right: 2.5rem;
                    cursor: pointer;
                }

                .form-input:focus, .form-select:focus {
                    border-color: #0f7b5e;
                    box-shadow: 0 0 0 3px rgba(15,123,94,0.12);
                }

                .form-input::placeholder { color: #9ca3af; }

                .form-row {
                    display: flex;
                    gap: 1rem;
                }

                .form-row > div { flex: 1; }

                /* ── Button ── */
                .btn-submit {
                    width: 100%;
                    padding: 1rem;
                    margin-top: 1.5rem;
                    background: #0f7b5e;
                    color: white;
                    border: none;
                    border-radius: 0.75rem;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: background 0.2s, transform 0.1s;
                    letter-spacing: 0.2px;
                }

                .btn-submit:hover { background: #0d6a50; }
                .btn-submit:active { transform: scale(0.99); }

                .signup-link {
                    margin-top: 1.4rem;
                    text-align: center;
                    font-size: 0.88rem;
                    color: #6b7280;
                }

                .signup-link a {
                    color: #0f7b5e;
                    font-weight: 700;
                    text-decoration: none;
                }

                .signup-link a:hover { text-decoration: underline; }

                .error-msg {
                    color: #dc2626;
                    font-size: 0.85rem;
                    margin-bottom: 1rem;
                    padding: 0.6rem 0.9rem;
                    background: #fef2f2;
                    border-radius: 0.5rem;
                    border: 1px solid #fecaca;
                }

                @media (max-width: 720px) {
                    .navbar { padding: 1rem 1.5rem; }
                    .login-wrapper { padding: 1.5rem; }
                    .card-left h1 { font-size: 2.3rem; }
                    .card-right h2 { font-size: 1.8rem; }
                    .form-row { flex-direction: column; gap: 0; }
                    .navbar-links { gap: 1.2rem; }
                }
            `}</style>

            <div className="page-bg">

                {/* Navbar */}
                <nav className="navbar">
                    <a href="/" className="navbar-brand">
                        <div className="brand-icon">H</div>
                        HelpHub AI
                    </a>
                    <ul className="navbar-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/explore">Explore</a></li>
                        <li><a href="/leaderboard">Leaderboard</a></li>
                    </ul>
                </nav>

                {/* Cards */}
                <div className="login-wrapper">
                    <div className="login-cards">

                        {/* Left Card */}
                        <div className="card-left">
                            <p className="eyebrow">Community Access</p>
                            <h1>Enter the support network.</h1>
                            <p className="subtitle">
                                Choose a demo identity, set your role, and jump into a multi-page product flow designed for asking, offering, and tracking help with a premium interface.
                            </p>
                            <ul className="feature-list">
                                <li>Role-based entry for Need Help, Can Help, or Both</li>
                                <li>Direct path into dashboard, requests, AI Center, and community feed</li>
                                <li>Persistent demo session powered by LocalStorage</li>
                            </ul>
                        </div>

                        {/* Right Card */}
                        <div className="card-right">
                            <p className="eyebrow">Login / Signup</p>
                            <h2>Authenticate your community profile</h2>

                                <form onSubmit={handleLogin}>
                                    {error && <p className="error-msg">{error}</p>}

                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Ayesha Khan"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />

                                    <div className="form-row">
                                        <div>
                                            <label className="form-label">Email Address</label>
                                            <input
                                                type="email"
                                                className="form-input"
                                                placeholder="community@helphub.ai"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-input"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="btn-submit">
                                        Continue to Onboarding
                                    </button>
                                </form>

                            <p className="signup-link">
                                Don't have an account?{' '}
                                <Link to="/signup">Sign up</Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;