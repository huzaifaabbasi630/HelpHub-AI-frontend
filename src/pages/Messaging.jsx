import React, { useState } from 'react';
import { Send, User, Search } from 'lucide-react';

const Messaging = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'Ayesha Khan', text: 'Hey, I saw your request about React hooks.', time: '10:05 AM', isMe: false },
        { id: 2, sender: 'Me', text: 'Yes! Glad you saw it. I am struggling with useEffect cleanup.', time: '10:07 AM', isMe: true },
        { id: 3, sender: 'Ayesha Khan', text: 'No worries, I can help you with that. Can we do a quick call?', time: '10:10 AM', isMe: false },
    ]);
    const [input, setInput] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        if (!input) return;
        setMessages([...messages, { id: Date.now(), sender: 'Me', text: input, time: 'Now', isMe: true }]);
        setInput('');
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', height: '80vh', gap: '1rem' }}>
            {/* Sidebar */}
            <div className="premium-card" style={{ width: '350px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', marginBottom: '2rem' }}>
                    <Search style={{ position: 'absolute', left: '12px', top: '12px', color: '#9ca3af' }} size={18} />
                    <input type="text" className="input-field" placeholder="Search chats..." style={{ paddingLeft: '2.5rem', marginTop: '0' }} />
                </div>
                
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                        <div style={{ width: '45px', height: '45px', background: '#0d2a22', borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>AK</div>
                        <div style={{ flex: 1 }}>
                            <h5 style={{ fontWeight: '700' }}>Ayesha Khan</h5>
                            <p style={{ fontSize: '0.8rem', opacity: '0.6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Can we do a quick call?</p>
                        </div>
                        <span style={{ fontSize: '0.7rem', opacity: '0.5' }}>10:10 AM</span>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="premium-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: '#0d2a22', borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>AK</div>
                    <h5 style={{ fontWeight: '700' }}>Ayesha Khan</h5>
                </div>

                <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {messages.map(m => (
                        <div key={m.id} style={{ alignSelf: m.isMe ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                            <div style={{ 
                                padding: '1rem 1.5rem', 
                                background: m.isMe ? '#10b981' : '#f3f4f6', 
                                color: m.isMe ? 'white' : 'black', 
                                borderRadius: m.isMe ? '1.5rem 1.5rem 0 1.5rem' : '1.5rem 1.5rem 1.5rem 0',
                                fontSize: '0.95rem'
                            }}>
                                {m.text}
                            </div>
                            <p style={{ fontSize: '0.7rem', opacity: '0.5', textAlign: m.isMe ? 'right' : 'left', marginTop: '5px' }}>{m.time}</p>
                        </div>
                    ))}
                </div>

                <form onSubmit={sendMessage} style={{ padding: '1.5rem', borderTop: '1px solid #eee', display: 'flex', gap: '1rem' }}>
                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Type your message..." 
                        style={{ marginTop: 0 }} 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0 1.5rem' }}>
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Messaging;
