// src/components/Testimonials.tsx
import React from 'react';

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
  return (
    <section className="testimonials">
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
