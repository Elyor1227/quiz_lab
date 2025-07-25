// src/pages/Quizzes.tsx
import React, { useEffect, useState } from 'react';
import Result from './Result';
import { useTheme } from '../context/ThemeContext';

type QuizQuestion = {
  id: number;
  section: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
};

const QUESTION_TIME = 30; // seconds per question

function getFeedback(percent: number) {
  if (percent === 100) return "A’lo! Barcha savollarga to‘g‘ri javob berdingiz!";
  if (percent >= 80) return "Juda yaxshi!";
  if (percent >= 60) return "Yaxshi, lekin yana mashq qiling!";
  return "Ko‘proq mashq qiling!";
}

const Quizzes: React.FC = () => {
  const { theme } = useTheme();
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [section, setSection] = useState('');
  const [sections, setSections] = useState<string[]>([]);
  const [timer, setTimer] = useState(QUESTION_TIME);
  const [answers, setAnswers] = useState<(number | null)[]>([]); // user's selected answers

  const quizForSection = quiz.filter(q => q.section === section);

  useEffect(() => {
    const stored = localStorage.getItem('quiz');
    if (stored) {
      const parsed: QuizQuestion[] = JSON.parse(stored);
      setQuiz(parsed);
      // Extract unique sections
      const uniqueSections = Array.from(new Set(parsed.map(q => q.section)));
      setSections(uniqueSections);
    }
  }, []);

  useEffect(() => {
    if (finished && quizForSection.length > 0) {
      const results = JSON.parse(localStorage.getItem('results') || '[]');
      results.push({
        section,
        score,
        total: quizForSection.length,
        date: new Date().toISOString(),
      });
      localStorage.setItem('results', JSON.stringify(results));
    }
    // eslint-disable-next-line
  }, [finished]);

  // Timer effect: reset on question change, count down
  useEffect(() => {
    if (!section || finished || quizForSection.length === 0) return;
    setTimer(QUESTION_TIME);
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          // Auto-advance or finish
          if (current + 1 < quizForSection.length) {
            setCurrent(c => c + 1);
            setSelected(null);
            setAnswers(a => [...a, -1]);
          } else {
            setFinished(true);
            setAnswers(a => [...a, -1]);
          }
          return QUESTION_TIME;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [current, section, finished, quizForSection.length]);

  // If no section is selected, only show the section selector
  if (!section) {
    return (
      <div className={`quiz-container theme-${theme}`}>
        <h2>Section tanlang</h2>
        <div style={{ marginBottom: '1.5rem' }}>
          {sections.length === 0 ? (
            <p>No sections found. Please add quizzes in the Create Quiz page.</p>
          ) : (
            <select
              className={`input theme-${theme}`}
              value={section}
              onChange={e => {
                setSection(e.target.value);
                setCurrent(0);
                setScore(0);
                setFinished(false);
                setSelected(null);
              }}
            >
              <option value="">Section tanlang</option>
              {sections.map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          )}
        </div>
      </div>
    );
  }

  // If no questions for the selected section
  if (quizForSection.length === 0) {
    return (
      <div className={`quiz-container theme-${theme}`}>
        <h2>Section: {section}</h2>
        <div style={{ marginBottom: '1.5rem' }}>
          <select
            className={`input theme-${theme}`}
            value={section}
            onChange={e => {
              setSection(e.target.value);
              setCurrent(0);
              setScore(0);
              setFinished(false);
              setSelected(null);
            }}
          >
            <option value="">Section tanlang</option>
            {sections.map(sec => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
        </div>
        <p style={{ padding: '2rem' }}>Hech qanday quiz topilmadi.</p>
      </div>
    );
  }

  const handleAnswer = () => {
    if (selected === null) return alert('Iltimos, javob tanlang');
    setAnswers(a => [...a, selected]);
    if (selected === quizForSection[current].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
    setSelected(null);
    if (current + 1 < quizForSection.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const percent = Math.round((score / quizForSection.length) * 100);
    return (
      <div className={`quiz-container theme-${theme}`}>
        <h2>Test tugadi!</h2>
        <p>To‘g‘ri javoblar soni: {score} / {quizForSection.length}</p>
        <p>Natija: <strong>{percent}%</strong></p>
        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: theme === 'dark' ? '#ffe082' : '#357ABD' }}>{getFeedback(percent)}</p>
        <Result total={quizForSection.length} correct={score} />
        <div style={{ margin: '2rem 0' }}>
          <h3>Savollar va javoblaringiz:</h3>
          <ol>
            {quizForSection.map((q, i) => {
              const userAnswer = answers[i];
              const isCorrect = userAnswer === q.correctAnswerIndex;
              return (
                <li key={q.id} style={{ marginBottom: '1rem' }}>
                  <div><strong>{q.question}</strong></div>
                  <div>
                    Sizning javobingiz: {typeof userAnswer === 'number' && userAnswer !== -1 ? (
                      <span style={{ color: isCorrect ? 'green' : 'red', fontWeight: 'bold' }}>
                        {String.fromCharCode(65 + userAnswer)}. {q.options[userAnswer]}
                      </span>
                    ) : <span style={{ color: 'orange' }}>Javob belgilanmadi</span>}
                  </div>
                  <div>
                    To‘g‘ri javob: <span style={{ color: 'green', fontWeight: 'bold' }}>
                      {String.fromCharCode(65 + q.correctAnswerIndex)}. {q.options[q.correctAnswerIndex]}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <button
            className={`btn theme-${theme}`}
            onClick={() => {
              setSection('');
              setCurrent(0);
              setScore(0);
              setFinished(false);
              setSelected(null);
              setAnswers([]);
            }}
          >
            Boshqa section tanlash
          </button>
        </div>
      </div>
    );
  }

  const q = quizForSection[current];

  return (
    <div className={`quiz-container theme-${theme}`}>
      <h2>
        Savol {current + 1} / {quizForSection.length}
        <div className="quiz-progress">
          <div
            className="quiz-progress-bar"
            style={{ width: `${((current + 1) / quizForSection.length) * 100}%` }}
          />
        </div>
      </h2>
      <div style={{ marginBottom: '1.5rem', fontWeight: 'bold', color: timer <= 5 ? '#d32f2f' : (theme === 'dark' ? '#ffe082' : '#357ABD') }}>
        Qolgan vaqt: {timer} soniya
      </div>
      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="section-select"><strong>Section:</strong></label>
        <select
          id="section-select"
          className={`input theme-${theme}`}
          value={section}
          onChange={e => {
            setSection(e.target.value);
            setCurrent(0);
            setScore(0);
            setFinished(false);
            setSelected(null);
          }}
        >
          <option value="">Section tanlang</option>
          {sections.map(sec => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>
      </div>
      <div className="quiz-question-card">
        <p className="quiz-question">{q.question}</p>
        <div className="quiz-options">
          {q.options.map((opt, i) => (
            <label
              key={i}
              className={`quiz-option-card${selected === i ? ' selected' : ''} theme-${theme}`}
              tabIndex={0}
            >
              <span>{String.fromCharCode(65 + i)}. {opt}</span>
              <input
                type="radio"
                name="answer"
                value={i}
                checked={selected === i}
                onChange={() => setSelected(i)}
                style={{ display: 'none' }}
              />
            </label>
          ))}
        </div>
        <button className={`btn btn-primary theme-${theme}`} onClick={handleAnswer} style={{ marginTop: '1rem' }}>
          Keyingi
        </button>
      </div>
    </div>
  );
};

export default Quizzes;
