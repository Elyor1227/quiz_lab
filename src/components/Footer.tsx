// src/components/Footer.tsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  return (
    <footer className={`footer theme-${theme}`}>
      <p>© {new Date().getFullYear()} QuizLab. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
