// src/components/Testimonials.tsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const testimonials = [
  {
    name: "Sarah’s Success Story",
    feedback: "QuizLab helped me ace my exams with its comprehensive quizzes.",
    image: "/images/download2.jfif"
  },
  {
    name: "Mark’s Quiz Challenge",
    feedback: "I love creating custom quizzes for my study group.",
    image: "/images/download2.jfif"
  }
];

const Testimonials: React.FC = () => {
  const { theme } = useTheme();
  return (
    <section className={`testimonials theme-${theme}`}>
      <h2>Testimonials</h2>
      <div className="testimonial__grid">
        {testimonials.map((t, index) => (
          <div className="testimonial-card" key={index}>
            <img src={t.image} alt={t.name} />
            <h3>{t.name}</h3>   
            <p>{t.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
