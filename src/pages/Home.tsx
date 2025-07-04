// src/pages/Home.tsx
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
