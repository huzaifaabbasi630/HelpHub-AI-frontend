import React, { useEffect, useState } from 'react';
import API from '../api/apiConfig';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .exp-page {
    min-height: 100vh;
    background-color: #eee9e0;
    font-family: 'Inter', sans-serif;
  }

  /* NAV */
  .exp-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.5rem;
    height: 60px;
    background: #eee9e0;
  }
  .exp-nav-logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 600;
    font-size: 1rem;
    color: #1a1a1a;
    text-decoration: none;
  }
  .exp-nav-logo-icon {
    width: 34px; height: 34px;
    background: #1a9e8f;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: white; font-weight: 800; font-size: 1rem;
  }
  .exp-nav-links {
    display: flex; align-items: center; gap: 0.5rem;
  }
  .exp-nav-link {
    color: #555; text-decoration: none;
    font-size: 0.875rem; font-weight: 500;
    padding: 0.4rem 0.85rem; border-radius: 999px;
  }
  .exp-nav-link.active {
    background: #2a2f2e; color: #fff;
  }

  /* HERO */
  .exp-hero {
    margin: 0 2.5rem 2rem 2.5rem;
    background: #2a2f2e;
    border-radius: 18px;
    padding: 2.8rem 3rem 3rem 3rem;
    position: relative; overflow: hidden;
  }
  .exp-hero::before {
    content: '';
    position: absolute; top: -60px; right: -60px;
    width: 280px; height: 280px;
    background: radial-gradient(circle, rgba(26,158,143,0.25) 0%, transparent 70%);
    border-radius: 50%;
  }
  .exp-hero-label {
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.12em; color: #9aa3a1;
    text-transform: uppercase; margin-bottom: 0.9rem;
  }
  .exp-hero-title {
    font-size: 2.6rem; font-weight: 800;
    color: #fff; line-height: 1.15;
    margin-bottom: 0.9rem; max-width: 680px;
  }
  .exp-hero-sub {
    font-size: 0.92rem; color: #9aa3a1;
    max-width: 460px; line-height: 1.5;
  }

  /* LAYOUT */
  .exp-body {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 1.5rem;
    margin: 0 2.5rem 3rem 2.5rem;
    align-items: start;
  }

  /* FILTER CARD */
  .exp-filter-card {
    background: #fff;
    border-radius: 16px;
    padding: 2rem;
  }
  .exp-filter-label {
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.1em; color: #1a9e8f;
    text-transform: uppercase; margin-bottom: 0.5rem;
  }
  .exp-filter-title {
    font-size: 1.7rem; font-weight: 800;
    color: #1a1a1a; margin-bottom: 1.8rem;
  }
  .exp-filter-group { margin-bottom: 1.5rem; }
  .exp-filter-group-label {
    font-size: 0.85rem; font-weight: 500;
    color: #333; margin-bottom: 0.5rem;
    display: block;
  }
  .exp-select, .exp-text-input {
    width: 100%;
    border: none;
    border-bottom: 1.5px solid #e0dbd2;
    border-radius: 0;
    padding: 0.6rem 0.2rem;
    font-size: 0.875rem;
    font-family: 'Inter', sans-serif;
    color: #444;
    background: transparent;
    outline: none;
    transition: border-color 0.2s;
    margin-bottom: 0.2rem;
  }
  .exp-select {
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.2rem center;
    cursor: pointer;
  }
  .exp-select:focus, .exp-text-input:focus {
    border-color: #1a9e8f;
  }
  .exp-text-input::placeholder { color: #bbb; }

  /* REQUEST CARDS */
  .exp-feed { display: flex; flex-direction: column; gap: 1.2rem; }

  .exp-req-card {
    background: #fff;
    border-radius: 16px;
    padding: 1.6rem 1.8rem;
  }
  .exp-req-tags {
    display: flex; gap: 0.5rem;
    flex-wrap: wrap; margin-bottom: 0.8rem;
  }
  .exp-tag {
    font-size: 0.78rem; font-weight: 500;
    padding: 0.28rem 0.75rem;
    border-radius: 999px;
    border: 1.5px solid #d6d0c8;
    color: #444; background: transparent;
  }
  .exp-tag.urgency-high { border-color: #f87171; color: #dc2626; }
  .exp-tag.urgency-medium { border-color: #fb923c; color: #ea580c; }
  .exp-tag.urgency-low { border-color: #4ade80; color: #16a34a; }
  .exp-tag.status-solved { border-color: #4ade80; color: #16a34a; }
  .exp-tag.status-open { border-color: #93c5fd; color: #2563eb; }

  .exp-req-title {
    font-size: 1.05rem; font-weight: 700;
    color: #1a1a1a; margin-bottom: 0.5rem;
  }
  .exp-req-desc {
    font-size: 0.875rem; color: #666;
    line-height: 1.5; margin-bottom: 0.9rem;
  }
  .exp-req-skill-tags {
    display: flex; gap: 0.5rem;
    flex-wrap: wrap; margin-bottom: 1.1rem;
  }
  .exp-skill-tag {
    font-size: 0.78rem; font-weight: 500;
    padding: 0.28rem 0.75rem;
    border-radius: 999px;
    border: 1.5px solid #d6d0c8;
    color: #555; background: transparent;
  }
  .exp-req-footer {
    display: flex; align-items: center;
    justify-content: space-between;
  }
  .exp-req-author { font-size: 0.875rem; font-weight: 600; color: #1a1a1a; margin-bottom: 0.15rem; }
  .exp-req-meta { font-size: 0.8rem; color: #999; }
  .exp-open-btn {
    background: none; border: none;
    font-size: 0.875rem; font-weight: 600;
    color: #1a1a1a; cursor: pointer;
    font-family: 'Inter', sans-serif;
    text-decoration: none;
    white-space: nowrap;
  }
  .exp-open-btn:hover { color: #1a9e8f; }
`;

const SAMPLE_REQUESTS = [
  {
    _id: '1',
    category: 'Web Development',
    urgency: 'High',
    status: 'solved',
    title: 'Need help',
    description: 'helpn needed',
    tags: [],
    createdBy: { name: 'Ayesha Khan', location: 'Karachi' },
    helpers: 1,
  },
  {
    _id: '2',
    category: 'Web Development',
    urgency: 'High',
    status: 'solved',
    title: 'Need help making my portfolio responsive before demo day',
    description: 'My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.',
    tags: ['HTML/CSS', 'Responsive', 'Portfolio'],
    createdBy: { name: 'Sara Noor', location: 'Karachi' },
    helpers: 1,
  },
  {
    _id: '3',
    category: 'Design',
    urgency: 'Medium',
    status: 'open',
    title: 'Looking for Figma feedback on a volunteer event poster',
    description: 'I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.',
    tags: ['Figma', 'Poster', 'Design Review'],
    createdBy: { name: 'Ayesha Khan', location: 'Lahore' },
    helpers: 1,
  },
  {
    _id: '4',
    category: 'Career',
    urgency: 'Low',
    status: 'solved',
    title: 'Need mock interview support for internship applications',
    description: 'Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.',
    tags: ['Interview Prep', 'Career', 'Frontend'],
    createdBy: { name: 'Sara Noor', location: 'Remote' },
    helpers: 2,
  },
];

const Explore = () => {
    const [requests, setRequests] = useState([]);
    const [category, setCategory] = useState('');
    const [urgency, setUrgency] = useState('');
    const [skills, setSkills] = useState('');
    const [location, setLocation] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                let endpoint = '/api/requests?';
                if (category) endpoint += `category=${category}&`;
                if (urgency) endpoint += `urgency=${urgency}&`;
                const { data } = await API.get(endpoint);
                setRequests(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRequests();
    }, [category, urgency]);

    const handleHelp = async (id) => {
        try {
            await API.post(`/api/requests/${id}/help`);
            alert('Help offer sent!');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to offer help');
        }
    };

    const handleSolve = async (id) => {
        try {
            await API.put(`/api/requests/${id}/solve`);
            alert('Request marked as solved!');
            setRequests(requests.map(r => r._id === id ? { ...r, status: 'solved' } : r));
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to resolve');
        }
    };

  const filtered = requests.filter(r => {
    const catMatch = !category || r.category === category;
    const urgMatch = !urgency || r.urgency === urgency;
    const locMatch = !location || r.createdBy?.location?.toLowerCase().includes(location.toLowerCase());
    return catMatch && urgMatch && locMatch;
  });

  const urgencyClass = (u) => {
    if (u === 'High') return 'exp-tag urgency-high';
    if (u === 'Medium') return 'exp-tag urgency-medium';
    return 'exp-tag urgency-low';
  };
  const statusClass = (s) =>
    s === 'solved' ? 'exp-tag status-solved' : 'exp-tag status-open';

  return (
    <>
      <style>{styles}</style>
      <div className="exp-page">

        {/* NAV */}
        <nav className="exp-nav">
          <a href="/" className="exp-nav-logo">
            <div className="exp-nav-logo-icon">H</div>
            HelpHub AI
          </a>
          <div className="exp-nav-links">
            <a href="/dashboard" className="exp-nav-link">Dashboard</a>
            <a href="/explore" className="exp-nav-link active">Explore</a>
            <a href="/leaderboard" className="exp-nav-link">Leaderboard</a>
            <a href="/notifications" className="exp-nav-link">Notifications</a>
          </div>
        </nav>

        {/* HERO */}
        <div className="exp-hero">
          <p className="exp-hero-label">Explore / Feed</p>
          <h1 className="exp-hero-title">Browse help requests with filterable community context.</h1>
          <p className="exp-hero-sub">Filter by category, urgency, skills, and location to surface the best matches.</p>
        </div>

        {/* BODY */}
        <div className="exp-body">

          {/* FILTER SIDEBAR */}
          <div className="exp-filter-card">
            <p className="exp-filter-label">Filters</p>
            <h2 className="exp-filter-title">Refine the feed</h2>

            <div className="exp-filter-group">
              <label className="exp-filter-group-label">Category</label>
              <select className="exp-select" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">All categories</option>
                <option value="Web Development">Web Development</option>
                <option value="Design">Design</option>
                <option value="Career">Career</option>
                <option value="Programming">Programming</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="exp-filter-group">
              <label className="exp-filter-group-label">Urgency</label>
              <select className="exp-select" value={urgency} onChange={e => setUrgency(e.target.value)}>
                <option value="">All urgency levels</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="exp-filter-group">
              <label className="exp-filter-group-label">Skills</label>
              <input
                className="exp-text-input"
                placeholder="React, Figma, Git/GitHub"
                value={skills}
                onChange={e => setSkills(e.target.value)}
              />
            </div>

            <div className="exp-filter-group">
              <label className="exp-filter-group-label">Location</label>
              <input
                className="exp-text-input"
                placeholder="Karachi, Lahore, Remote"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* FEED */}
          <div className="exp-feed">
            {filtered.map(req => (
              <div className="exp-req-card" key={req._id}>
                <div className="exp-req-tags">
                  <span className="exp-tag">{req.category}</span>
                  <span className={urgencyClass(req.urgency)}>{req.urgency}</span>
                  <span className={statusClass(req.status)}>
                    {req.status === 'solved' ? 'Solved' : 'Open'}
                  </span>
                </div>

                <h3 className="exp-req-title">{req.title}</h3>
                <p className="exp-req-desc">{req.description}</p>

                {req.tags?.length > 0 && (
                  <div className="exp-req-skill-tags">
                    {req.tags.map(t => (
                      <span className="exp-skill-tag" key={t}>{t}</span>
                    ))}
                  </div>
                )}

                <div className="exp-req-footer">
                  <div>
                    <p className="exp-req-author">{req.createdBy?.name}</p>
                    <p className="exp-req-meta">
                      {req.createdBy?.location} • {req.helpers || 0} helper{req.helpers !== 1 ? 's' : ''} interested
                    </p>
                  </div>
                  {req.status === 'solved' ? (
                    <button className="exp-open-btn" disabled style={{ color: '#6b7280' }}>Solved</button>
                  ) : req.createdBy?._id === userInfo?._id ? (
                    <button className="exp-open-btn" onClick={() => handleSolve(req._id)}>Mark as Solved</button>
                  ) : userInfo?.role !== 'Need Help' ? (
                    <button className="exp-open-btn" onClick={() => handleHelp(req._id)}>I can help</button>
                  ) : (
                    <button className="exp-open-btn" disabled style={{ color: '#6b7280', opacity: 0.5 }}>View Only</button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Explore;