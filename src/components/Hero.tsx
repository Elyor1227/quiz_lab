// src/components/Hero.tsx
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';


const Hero: React.FC = () => {
    const { theme } = useTheme();
    const navigate = Navigate;
  return (
    <section className={`hero theme-${theme}`}>
      <div className="hero__content">
        <h1>Test Your Knowledge</h1>
        <p>Explore a wide range of quizzes or create your own to challenge friends and family.</p>
        <div className="hero__buttons">
          <Link to="/quizzes"><button className="btn btn-primary">Start Quiz</button></Link>
          <Link to="/create"><button className="btn btn-secondary">Create Quiz</button></Link>
        </div>
      </div>
      <div className="hero__image">
        <img src="/images/download.png" alt="Quiz Illustration" />
      </div>
    </section>
  );
};

export default Hero;
