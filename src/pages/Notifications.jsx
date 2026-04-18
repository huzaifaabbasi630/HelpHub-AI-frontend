import React from 'react';
import { Bell, UserPlus, CheckCircle } from 'lucide-react';

const Notifications = () => {
    const notifications = [
        { id: 1, type: 'help', message: 'Ayesha Khan offered to help on your request "Fix React hook error"', time: '2 mins ago' },
        { id: 2, type: 'solved', message: 'Your request "UI Design for Login" was marked as solved!', time: '1 hour ago' },
        { id: 3, type: 'community', message: 'New trending request in Programming: "C++ Memory Leak"', time: '3 hours ago' },
    ];

    return (
        <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '3rem' }}>Notifications</h1>
            
            <div className="premium-card" style={{ padding: '1rem' }}>
                {notifications.map((n, index) => (
                    <div key={n.id} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '1.5rem', 
                        padding: '1.5rem',
                        borderBottom: index !== notifications.length - 1 ? '1px solid #f0f0f0' : 'none'
                    }}>
                        <div style={{ padding: '10px', background: '#f0fdf4', borderRadius: '12px', color: '#10b981' }}>
                            {n.type === 'help' ? <UserPlus size={20} /> : n.type === 'solved' ? <CheckCircle size={20} /> : <Bell size={20} />}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: '500' }}>{n.message}</p>
                            <span style={{ fontSize: '0.8rem', opacity: '0.5' }}>{n.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
