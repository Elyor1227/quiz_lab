// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">QuizLab</div>
      <ul className="navbar__links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/quizzes">Quizzes</Link></li>
        <li><Link to="/create">Create</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
