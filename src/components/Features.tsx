// src/components/Features.tsx
import React from 'react';

const features = [
  {
    title: "Interactive Quizzes",
    description: "Engage with dynamic quizzes that adapt to your learning pace.",
    image: "/images/download3.jfif"
  },
  {
    title: "Customizable Categories",
    description: "Tailor quizzes to your interests and a variety of categories.",
    image: "/images/download4.jfif"
  },
  {
    title: "Real-Time Feedback",
    description: "Get immediate results and feedback to improve faster.",
    image: "/images/download5.jfif"
  }
];

const Features: React.FC = () => {
  return (
    <section className="features">
      <h2>Features</h2>
      <div className="features__grid">
        {features.map((feat, index) => (
          <div className="feature-card" key={index}>
            <img src={feat.image} alt={feat.title} />
            <h3>{feat.title}</h3>
            <p>{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
