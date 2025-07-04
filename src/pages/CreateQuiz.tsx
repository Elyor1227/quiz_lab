// src/pages/CreateQuiz.tsx
import React, { useState } from 'react';


type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
};

const CreateQuiz: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);

  const handleOptionChange = (value: string, index: number) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleAddQuestion = () => {
    if (!question || options.some(opt => !opt)) return alert('Barcha maydonlarni to‘ldiring');

    const newQuestion: QuizQuestion = {
      id: Date.now(),
      question,
      options,
      correctAnswerIndex,
    };

    setQuiz([...quiz, newQuestion]);
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswerIndex(0);
  };

  const handleDelete = (id: number) => {
    setQuiz(quiz.filter(q => q.id !== id));
  };

  const handleSave = () => {
    localStorage.setItem('quiz', JSON.stringify(quiz));
    alert('Quiz saqlandi!');
  };
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h2>Create Quiz</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Question:</label>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        />
      </div>

      {options.map((opt, index) => (
        <div key={index} style={{ marginBottom: '0.5rem' }}>
          <label>Option {String.fromCharCode(65 + index)}:</label>
          <input
            type="text"
            value={opt}
            onChange={e => handleOptionChange(e.target.value, index)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem' }}
          />
        </div>
      ))}

      <div style={{ marginBottom: '1rem' }}>
        <label>Correct Answer:</label>
        <select
          value={correctAnswerIndex}
          onChange={e => setCorrectAnswerIndex(Number(e.target.value))}
          style={{ width: '100%', padding: '0.5rem' }}
        >
          {options.map((_, index) => (
            <option key={index} value={index}>
              Option {String.fromCharCode(65 + index)}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleAddQuestion} style={{ marginRight: '1rem' }}>Add Question</button>
      <button onClick={handleSave}>Save Quiz</button>

      <hr style={{ margin: '2rem 0' }} />

      <h3>Preview:</h3>
      {quiz.map(q => (
        <div key={q.id} style={{ background: '#f8f8f8', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
          <strong>{q.question}</strong>
          <ul>
            {q.options.map((opt, i) => (
              <li key={i} style={{ color: i === q.correctAnswerIndex ? 'green' : 'inherit' }}>
                {String.fromCharCode(65 + i)}. {opt}
              </li>
            ))}
          </ul>
          <button onClick={() => handleDelete(q.id)} style={{ color: 'red' }}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CreateQuiz;
