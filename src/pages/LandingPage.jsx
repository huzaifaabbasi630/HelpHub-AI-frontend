import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Zap, Users, ShieldCheck, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-cream)' }}>
            {/* Hero Section */}
            <section style={{ padding: '6rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ maxWidth: '900px', margin: '0 auto' }}
                >
                    <span style={{ 
                        background: '#eef2ff', 
                        color: '#4f46e5', 
                        padding: '0.5rem 1rem', 
                        borderRadius: '20px', 
                        fontSize: '0.8rem', 
                        fontWeight: 'bold', 
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Powered by Helplytics AI
                    </span>
                    <h1 style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.1', color: '#0d2a22', marginTop: '1.5rem' }}>
                        Connect. Help. <br /> <span style={{ color: '#10b981' }}>Succeed Together.</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#4b5563', marginTop: '2rem', lineHeight: '1.6', maxWidth: '700px', margin: '2rem auto' }}>
                        The AI-driven community platform where students find help and experts build trust. Join the network of learners and leaders.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '3rem' }}>
                        <Link to="/signup" className="btn-primary" style={{ width: 'auto', padding: '1rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                            Get Started Free <ChevronRight size={20} />
                        </Link>
                        <Link to="/explore" style={{ padding: '1rem 2rem', border: '1px solid #ddd', borderRadius: '12px', fontWeight: '600', color: '#0d2a22', textDecoration: 'none' }}>
                            Explore Feed
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Stats Bar */}
            <section style={{ padding: '4rem 2rem', background: '#0d2a22', color: 'white' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>10k+</h2>
                        <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>Community Members</p>
                    </div>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>5k+</h2>
                        <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>Requests Solved</p>
                    </div>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>98%</h2>
                        <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>Satisfaction Rate</p>
                    </div>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>24h</h2>
                        <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>Avg. Response Time</p>
                    </div>
                </div>
            </section>

            {/* AI Features Section */}
            <section style={{ padding: '8rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: '800' }}>Intelligent Support</h2>
                        <p style={{ opacity: '0.7', maxWidth: '600px', margin: '1rem auto' }}>Experience the power of AI in every interaction. From categorization to skill matching.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="premium-card">
                            <div style={{ background: '#ecfdf5', color: '#10b981', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <Cpu size={24} />
                            </div>
                            <h3>AI Categorization</h3>
                            <p style={{ opacity: '0.7', marginTop: '1rem' }}>Our AI automatically detects the category and tags for your help requests based on your description.</p>
                        </div>
                        <div className="premium-card">
                            <div style={{ background: '#eff6ff', color: '#3b82f6', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <Zap size={24} />
                            </div>
                            <h3>Smart Tagging</h3>
                            <p style={{ opacity: '0.7', marginTop: '1rem' }}>Relevant keywords are extracted to help experts find your requests faster than ever.</p>
                        </div>
                        <div className="premium-card">
                            <div style={{ background: '#fef2f2', color: '#ef4444', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <ShieldCheck size={24} />
                            </div>
                            <h3>Trust Scoring</h3>
                            <p style={{ opacity: '0.7', marginTop: '1rem' }}>Our unique gamification system builds trust and rewards community members for their contributions.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', background: 'radial-gradient(circle, #0d2a22 0%, #051a14 100%)', color: 'white', padding: '5rem 2rem', borderRadius: '3rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem' }}>Ready to ask for help?</h2>
                    <p style={{ opacity: '0.8', maxWidth: '600px', margin: '0 auto 3rem auto', fontSize: '1.1rem' }}>Join thousands of students and experts who are already making learning faster and more collaborative.</p>
                    <Link to="/signup" className="btn-primary" style={{ width: 'auto', padding: '1rem 3rem', fontSize: '1.2rem', textDecoration: 'none' }}>
                        Sign Up Now – It's Free
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
