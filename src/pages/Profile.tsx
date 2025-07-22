// src/pages/Profile.tsx
import React from 'react';

const Profile: React.FC = () => {
  const user = {
    name: "Elyorbek Mengto’rayev",
    email: "elyorbek@example.com",
    role: "Admin",
    joined: "2024-12-01",
  };

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
    </div> 
  );
};

export default Profile;