// src/pages/Home.tsx
import React, { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import CommentModal from '../components/CommentModal';
import { useTheme } from '../context/ThemeContext';
// import { FaChevronLeft, FaChevronRight, FaUserCircle } from 'react-icons/fa';

const Home: React.FC = () => {
  const { theme } = useTheme();
  // Izohlar uchun state
  const [comments, setComments] = useState<{ name: string; text: string }[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Carousel uchun ko‘rinadigan kartalar soni (responsive)
  const [visibleCards, setVisibleCards] = useState(1);
  const cardWidth = 220;
  const gap = 12;
  const carouselRef = useRef<HTMLDivElement>(null);

  // localStorage'dan izohlarni olish
  useEffect(() => {
    const stored = localStorage.getItem('home_comments');
    if (stored) {
      setComments(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) setVisibleCards(3);
      else if (window.innerWidth >= 600) setVisibleCards(2);
      else setVisibleCards(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Carousel uchun animatsiya davomiyligi (kartalar soniga qarab)
  const totalCards = comments.length;
  const totalWidth = (cardWidth + gap) * totalCards;
  const duration = totalCards > 0 ? totalCards * 2.5 : 5; // har karta ~2.5s

  // Carousel avtomatik animatsiyasi
  useEffect(() => {
    if (comments.length <= visibleCards) return;
    const interval = setInterval(() => {
      setCarouselIndex(i => (i + 1) % (comments.length - visibleCards + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [comments, visibleCards]);

  // Carousel styleni hisoblash
  const getCarouselStyle = () => ({
    display: 'flex',
    gap: `${gap}px`,
    transition: 'transform 0.7s cubic-bezier(0.4,0.2,0.2,1)',
    transform: `translateX(-${carouselIndex * (cardWidth + gap)}px)`
  });

  // Izoh qo'shish funksiyasi endi modal orqali
  const handleAddComment = (comment: { name: string; text: string }) => {
    const newComments = [...comments, { ...comment, date: new Date().toLocaleString() }];
    setComments(newComments);
    localStorage.setItem('home_comments', JSON.stringify(newComments));
  };

  // Carousel tugmalari
  const handlePrev = () => {
    setCarouselIndex(i => (i - 1 + comments.length) % comments.length);
  };
  const handleNext = () => {
    setCarouselIndex(i => (i + 1) % comments.length);
  };

  return (
    <div className={`home-page theme-${theme}`}>
      <Hero />
      <Features />
      <Testimonials />
      {/* Izohlar bo'limi */}
      <div className={`comments-section theme-${theme}`}>
        <h2 className="comments-title">Izohlar</h2>
        <button
          className={`btn btn-primary theme-${theme}`}
          onClick={() => setModalOpen(true)}
        >
          Izoh qoldirish
        </button>
        <CommentModal
          show={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddComment}
        />
        {/* Carousel */}
        <div className={`comments-carousel theme-${theme}`}
          style={{
            width: '100vw',
            maxWidth: '100vw',
            margin: '0 auto',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 220,
          }}>
          <style>{`
            @keyframes scrollCarousel {
              0% { transform: translateX(0); }
              100% { transform: translateX(-${totalWidth}px); }
            }
          `}</style>
          <div
            className="carousel-track"
            style={{
              display: 'flex',
              gap: `${gap}px`,
              width: totalCards === 0 ? '100%' : totalWidth * 2,
              animation: totalCards > visibleCards ? `scrollCarousel ${duration}s linear infinite` : undefined,
            }}
          >
            {[...comments, ...comments].map((c, i) => (
              <div
                key={i}
                className={`comment-card theme-${theme}`}
                style={{
                  minWidth: cardWidth,
                  maxWidth: cardWidth,
                  borderRadius: 16,
                  padding: 18,
                  flex: '0 0 auto',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  margin: '0',
                  border: '2px solid',
                  borderImage: 'linear-gradient(120deg, #6366f1 40%, #60a5fa 100%) 1',
                  cursor: 'pointer',
                }}
                onMouseOver={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(80,80,180,0.18)')}
                onMouseOut={e => (e.currentTarget.style.boxShadow = '0 4px 18px rgba(80,80,180,0.13)')}
              >
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 38 }}>👤</span>
                </div>
                <div className="comment-card-name" style={{
                  fontWeight: 700,
                  marginBottom: 6,
                  fontSize: 17,
                  letterSpacing: 0.5,
                  background: 'linear-gradient(90deg, #6366f1 60%, #60a5fa 100%)',
                  borderRadius: 8,
                  padding: '2px 12px',
                  boxShadow: '0 1px 4px #e0e7ff',
                  marginTop: -8,
                  display: 'inline-block',
                }}>{c.name}</div>
                <div className="comment-card-text" style={{
                  fontSize: 15,
                  textAlign: 'center',
                  wordBreak: 'break-word',
                  lineHeight: 1.5,
                  maxHeight: 70,
                  overflowY: 'auto',
                  marginBottom: 10,
                  width: '100%',
                }}>{c.text}</div>
                <div className="comment-card-date" style={{
                  fontSize: 11,
                  marginTop: 'auto',
                  alignSelf: 'flex-end',
                }}>{c.name || ''}</div>
              </div>
            ))}
            {comments.length === 0 && (
              <div className={`comment-card theme-${theme}`} style={{ minWidth: cardWidth, textAlign: 'center', fontStyle: 'italic', padding: 32 }}>
                Hali izohlar yo'q.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
