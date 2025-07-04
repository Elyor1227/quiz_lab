// src/pages/Quizzes.tsx
import React, { useEffect, useState } from 'react';
import Result from './Result';

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
};

const Quizzes: React.FC = () => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('quiz');
    if (stored) {
      setQuiz(JSON.parse(stored));
    }
  }, []);

  const handleAnswer = () => {
    if (selected === null) return alert('Iltimos, javob tanlang');
    if (selected === quiz[current].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }

    setSelected(null);

    if (current + 1 < quiz.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    } 
  };

  if (quiz.length === 0) {
    return <p style={{ padding: '2rem' }}>Hech qanday quiz topilmadi.</p>;
  }

  if (finished) {
    const percent = Math.round((score / quiz.length) * 100);
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Test tugadi!</h2>
        <p>To‘g‘ri javoblar soni: {score} / {quiz.length}</p>
        <p>Natija: <strong>{percent}%</strong></p>
         <Result total={quiz.length} correct={score} />
         <div></div>
      </div>
      
    );
  }

  const q = quiz[current];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Savol {current + 1} / {quiz.length}</h2>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{q.question}</p>
      <div style={{ marginTop: '1rem' }}>
        {q.options.map((opt, i) => (
          <div key={i} style={{margin: '20px 0', border: '1px solid #333', borderRadius: '10px', padding: ' 10px'}}>
            <label style={{display:'flex', justifyContent: 'space-between', alignItems: 'center',}}>
                <div>{String.fromCharCode(65 + i)}. {opt}</div>
              <input
                type="radio"
                name="answer"
                value={i}
                style={{ width: '20px'}}
                checked={selected === i}
                onChange={() => setSelected(i)}
              />{" "}
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleAnswer} style={{ marginTop: '1rem' }}>Keyingi</button>
    </div>
  );
};

export default Quizzes;
