import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Sparkles, CheckCircle, ArrowLeft } from 'lucide-react';

const RequestDetail = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/requests/${id}`);
                setRequest(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRequest();
    }, [id]);

    if (!request) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading request details...</div>;

    return (
        <div style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
            <Link to="/explore" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', textDecoration: 'none', marginBottom: '2rem', fontWeight: '500' }}>
                <ArrowLeft size={18} /> Back to Feed
            </Link>

            <div className="premium-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'start' }}>
                    <div>
                        <span style={{ padding: '0.4rem 1rem', background: '#eef2ff', color: '#4f46e5', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>{request.category}</span>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '1rem', color: '#0d2a22' }}>{request.title}</h1>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ color: request.urgency === 'High' ? '#ef4444' : '#10b981', fontWeight: 'bold', fontSize: '1rem' }}>{request.urgency} Urgency</span>
                        <p style={{ opacity: '0.5', fontSize: '0.8rem', marginTop: '5px' }}>Posted {new Date(request.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                {/* AI Summary Section */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '1.5rem', padding: '2rem', marginBottom: '2.5rem', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-12px', left: '20px', background: '#fff', padding: '2px 10px', display: 'flex', alignItems: 'center', gap: '5px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                        <Sparkles size={14} color="#4f46e5" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#4f46e5' }}>AI SUMMARY</span>
                    </div>
                    <p style={{ fontStyle: 'italic', color: '#475569', lineHeight: '1.6' }}>
                        "This user is experiencing a difficulty in **{request.category}**. They need assistance with {request.title.toLowerCase()}. The urgency is marked as {request.urgency.toLowerCase()}."
                    </p>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                    <h4 style={{ marginBottom: '1rem', color: '#0d2a22' }}>Detailed Description</h4>
                    <p style={{ lineHeight: '1.8', color: '#374151', fontSize: '1.1rem' }}>{request.description}</p>
                </div>

                <div style={{ borderTop: '1px solid #eee', paddingTop: '2.5rem' }}>
                    <h4 style={{ marginBottom: '1.5rem' }}>Potential Helpers ({request.helpers?.length || 0})</h4>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {request.helpers?.map(helper => (
                            <div key={helper._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 15px', background: '#f3f4f6', borderRadius: '12px' }}>
                                <div style={{ width: '30px', height: '30px', background: '#0d2a22', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '0.8rem' }}>{helper.name?.[0]}</div>
                                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{helper.name}</span>
                            </div>
                        ))}
                        {(!request.helpers || request.helpers.length === 0) && <p style={{ opacity: '0.5' }}>Waiting for community members to offer help...</p>}
                    </div>
                </div>

                <div style={{ marginTop: '4rem' }}>
                    <button className="btn-primary" style={{ padding: '1.2rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                        <CheckCircle size={20} /> I Can Help with This
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestDetail;
