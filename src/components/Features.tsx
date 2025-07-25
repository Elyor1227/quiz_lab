// src/components/Features.tsx
import React from 'react';
import { FaRegLightbulb, FaLayerGroup, FaChartLine } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

interface Feature {
  title: string;
  description: string;
  image: string;
  icon: any;
}

const features: Feature[] = [
  {
    title: 'Interactive Quizzes',
    description: 'Engage with dynamic quizzes that adapt to your learning pace.',
    image: '/images/download3.jfif',
    icon: FaRegLightbulb,
  },
  {
    title: 'Customizable Categories',
    description: 'Tailor quizzes to your interests and a variety of categories.',
    image: '/images/download4.jfif',
    icon: FaLayerGroup,
  },
  {
    title: 'Real-Time Feedback',
    description: 'Get immediate results and feedback to improve faster.',
    image: '/images/download5.jfif',
    icon: FaChartLine,
  },
];

const Features: React.FC = () => {
  const { theme } = useTheme();
  return (
    <section className={`features theme-${theme}`}>
      <h2>Features</h2>
      <div className="features__grid">
        {features.map((feat, index) => {
          const Icon = feat.icon;
          return (
            <div className="feature-card interactive-card" key={index}>
              <div className="feature-icon-wrapper">
                <Icon className="feature-icon" />
              </div>
              <img src={feat.image} alt={feat.title} />
              <h3>{feat.title}</h3>
              <p>{feat.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;