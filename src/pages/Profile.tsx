// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react';

const Profile: React.FC = () => {
  const user = {
    name: "Elyorbek Mengto’rayev",
    email: "elyorbek@example.com",
    role: "Admin",
    joined: "2024-12-01",
  };

  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('results');
    if (stored) setResults(JSON.parse(stored));
  }, []);

  return (
    <div className="profile-container"> 
      <h2>Your Profile</h2>
      <div className="profile-card">
        <img src={`https://ui-avatars.com/api/?name=${user.name}&background=4a90e2&color=fff`} alt="avatar" />
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Joined:</strong> {user.joined}</p>
        </div>
      </div>
      <h3>Test Natijalari</h3>
      {results.length === 0 ? (
        <p>Hali natijalar yo‘q.</p>
      ) : (
        <ul className="profile-results-list">
          {results.map((r, i) => (
            <li className="profile-result-item" key={i}>
              <div>
                <strong>{r.section}</strong>
                <span className="profile-result-score">{r.score}/{r.total} ({Math.round((r.score/r.total)*100)}%)</span>
              </div>
              <div className="profile-result-date">{new Date(r.date).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div> 
  );
};

export default Profile;