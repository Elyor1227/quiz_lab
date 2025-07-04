// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} QuizLab. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
