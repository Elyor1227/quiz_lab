// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';


const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="navbar">
      <div className="navbar__logo">QuizLab</div>
      <ul className="navbar__links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/quizzes">Quizzes</Link></li>
        <li><Link to="/create">Create</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      <button
        onClick={toggleTheme}
        style={{
          marginLeft: 24,
          padding: '6px 16px',
          borderRadius: 8,
          border: 'none',
          background: theme === 'dark' ? '#f4f4f4' : '#232946',
          color: theme === 'dark' ? '#232946' : '#f4f4f4',
          fontWeight: 600,
          fontSize: 15,
          cursor: 'pointer',
          boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
          transition: 'background 0.2s, color 0.2s',
        }}
        aria-label="Theme toggle"
        title={theme === 'dark' ? 'Kunduzgi rejim' : 'Tungi rejim'}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </nav>
  );
};

export default Navbar;
