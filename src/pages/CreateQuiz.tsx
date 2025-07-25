// src/pages/CreateQuiz.tsx
import React, { useState, useEffect } from 'react';
import EditQuestionModal from '../components/EditQueastionModal';
import { useTheme } from '../context/ThemeContext';

type QuizType = 'single' | 'multi' | 'truefalse';
type QuizQuestion = {
  id: number;
  section: string;
  question: string;
  options: string[];
  correctAnswerIndex?: number; // for single
  correctAnswers?: number[];   // for multi
  quizType: QuizType;
};

const defaultSections = ['Math', 'Science', 'History'];

const CreateQuiz: React.FC = () => {
  const { theme } = useTheme();
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [sections, setSections] = useState<string[]>(defaultSections);
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [newSection, setNewSection] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [quizType, setQuizType] = useState<QuizType>('single');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedQuiz = localStorage.getItem('quiz');
    if (storedQuiz) setQuiz(JSON.parse(storedQuiz));
    const storedSections = localStorage.getItem('sections');
    if (storedSections) setSections(JSON.parse(storedSections));
  }, []);

  useEffect(() => {
    if (quiz.length > 0) {
      localStorage.setItem('quiz', JSON.stringify(quiz));
    } else {
      localStorage.removeItem('quiz');
    }
  }, [quiz]);

  useEffect(() => {
    localStorage.setItem('sections', JSON.stringify(sections));
  }, [sections]);

  const handleAddSection = () => {
    if (newSection && !sections.includes(newSection)) {
      const updatedSections = [...sections, newSection];
      setSections(updatedSections);
      setSelectedSection(newSection);
      setNewSection('');
    }
  };

  const handleAddQuestion = () => {
    if (!question || options.some(opt => !opt) || !selectedSection) return alert('Barcha maydonlarni to‘ldiring');
    let newQuestion: QuizQuestion;
    if (quizType === 'single') {
      newQuestion = {
        id: Date.now(),
        section: selectedSection,
        question,
        options,
        correctAnswerIndex,
        quizType,
      };
    } else if (quizType === 'multi') {
      if (correctAnswers.length === 0) return alert('To‘g‘ri javob(lar)ni belgilang!');
      newQuestion = {
        id: Date.now(),
        section: selectedSection,
        question,
        options,
        correctAnswers,
        quizType,
      };
    } else {
      // true/false
      newQuestion = {
        id: Date.now(),
        section: selectedSection,
        question,
        options: ['True', 'False'],
        correctAnswerIndex,
        quizType,
      };
    }
    setQuiz([...quiz, newQuestion]);
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswerIndex(0);
    setCorrectAnswers([]);
    setQuizType('single');
  };

  const handleDelete = (id: number) => {
    setQuiz(quiz.filter(q => q.id !== id));
  };

  // Edit modal logic (for simplicity, only single/multi supported in modal)
  const handleEditSave = (updated: { question: string; options: string[]; correctAnswerIndex?: number; correctAnswers?: number[]; quizType: QuizType }) => {
    if (editIndex === null) return;
    const sectionQuestions = quiz.filter(q => q.section === selectedSection);
    const globalIndex = quiz.findIndex(q => q.id === sectionQuestions[editIndex].id);
    if (globalIndex === -1) return;
    const updatedQuiz = [...quiz];
    updatedQuiz[globalIndex] = { ...updatedQuiz[globalIndex], ...updated };
    setQuiz(updatedQuiz);
    setEditIndex(null);
  };

  const handleExportSectionWord = () => {
    const sectionQuestions = quiz.filter(q => q.section === selectedSection);
    let content = `<h2>${selectedSection} Quizlar</h2>`;
    sectionQuestions.forEach((q, idx) => {
      content += `<div style='margin-bottom:12px;'><b>${idx + 1}. ${q.question}</b><br/>`;
      q.options.forEach((opt, i) => {
        let isCorrect = false;
        if (q.quizType === 'single' || q.quizType === 'truefalse') isCorrect = i === q.correctAnswerIndex;
        if (q.quizType === 'multi' && q.correctAnswers) isCorrect = q.correctAnswers.includes(i);
        content += `<div style='margin-left:16px;'>${String.fromCharCode(65 + i)}. ${opt}${isCorrect ? ' <b>(to‘g‘ri)</b>' : ''}</div>`;
      });
      content += '</div>';
    });
    const blob = new Blob([
      `\ufeff<html><head><meta charset='utf-8'></head><body>${content}</body></html>`
    ], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedSection}_quizzes.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sectionQuestions = quiz.filter(q => q.section === selectedSection);

  if (!selectedSection) {
    return (
      <div className={`create-quiz-container theme-${theme}`}>
        <h2>Sections</h2>
        <div className="quiz-preview" style={{ marginBottom: '2rem' }}>
          {sections.length === 0 ? <p>Hali sectionlar yo‘q.</p> : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {sections.map(sec => (
                <button
                  key={sec}
                  className={`btn btn-primary theme-${theme}`}
                  style={{ minWidth: 120 }}
                  onClick={() => setSelectedSection(sec)}
                >
                  {sec}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="form-group" style={{ maxWidth: 350 }}>
          <label>Yangi section qo‘shish:</label>
          <input
            type="text"
            className={`input theme-${theme}`}
            placeholder="Section nomi"
            value={newSection}
            onChange={e => setNewSection(e.target.value)}
            onBlur={handleAddSection}
            onKeyDown={e => { if (e.key === 'Enter') handleAddSection(); }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`create-quiz-container theme-${theme}`}>
      <h2>{selectedSection} - Quizlar</h2>
      <div className="button-group" style={{ marginBottom: '1rem' }}>
        <button className={`btn theme-${theme}`} onClick={() => setSelectedSection('')}>Barcha sectionlar</button>
        <button className={`btn theme-${theme}`} onClick={handleExportSectionWord}>Export (Word)</button>
      </div>
      <div className="create-quiz-form">
        <div className="form-group">
          <label>Test turi:</label>
          <select className={`input theme-${theme}`} value={quizType} onChange={e => setQuizType(e.target.value as QuizType)}>
            <option value="single">Single (1 ta to‘g‘ri javob)</option>
            <option value="multi">Multi-choice (bir nechta to‘g‘ri javob)</option>
            <option value="truefalse">True/False</option>
          </select>
        </div>
        <div className="form-group">
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            className={`input theme-${theme}`}
          />
        </div>
        {quizType === 'truefalse' ? null : options.map((opt, index) => (
          <div className="form-group" key={index}>
            <label>Option {String.fromCharCode(65 + index)}:</label>
            <input
              type="text"
              value={opt}
              onChange={e => setOptions(prev => {
                const updated = [...prev];
                updated[index] = e.target.value;
                return updated;
              })}
              className={`input theme-${theme}`}
            />
            {quizType === 'multi' && (
              <input
                type="checkbox"
                checked={correctAnswers.includes(index)}
                onChange={e => {
                  if (e.target.checked) setCorrectAnswers(prev => [...prev, index]);
                  else setCorrectAnswers(prev => prev.filter(i => i !== index));
                }}
                style={{ marginLeft: 8 }}
              />
            )}
            {quizType === 'multi' && <span style={{ marginLeft: 4 }}>To‘g‘ri</span>}
          </div>
        ))}
        {quizType === 'single' && (
          <div className="form-group">
            <label>Correct Answer:</label>
            <select
              value={correctAnswerIndex}
              onChange={e => setCorrectAnswerIndex(Number(e.target.value))}
              className={`input theme-${theme}`}
            >
              {options.map((_, index) => (
                <option key={index} value={index}>
                  Option {String.fromCharCode(65 + index)}
                </option>
              ))}
            </select>
          </div>
        )}
        {quizType === 'truefalse' && (
          <div className="form-group">
            <label>Correct Answer:</label>
            <select
              value={correctAnswerIndex}
              onChange={e => setCorrectAnswerIndex(Number(e.target.value))}
              className={`input theme-${theme}`}
            >
              <option value={0}>True</option>
              <option value={1}>False</option>
            </select>
          </div>
        )}
        <div className="button-group">
          <button className={`btn btn-primary theme-${theme}`} onClick={handleAddQuestion}>Add Question</button>
        </div>
      </div>
      <hr className="divider" />
      <h3>{selectedSection} uchun testlar</h3>
      <div className="quiz-preview">
        {sectionQuestions.length === 0 ? (
          <p>Hali testlar yo‘q.</p>
        ) : (
          sectionQuestions.map((q, i) => (
            <div className={`preview-card theme-${theme}`} key={q.id}>
              <strong>{q.question}</strong>
              <ul>
                {q.options.map((opt, j) => {
                  let isCorrect = false;
                  if (q.quizType === 'single' || q.quizType === 'truefalse') isCorrect = j === q.correctAnswerIndex;
                  if (q.quizType === 'multi' && q.correctAnswers) isCorrect = q.correctAnswers.includes(j);
                  return (
                    <li key={j} className={isCorrect ? 'correct' : ''}>
                      {String.fromCharCode(65 + j)}. {opt}
                      {isCorrect && <span style={{ color: 'green', marginLeft: 6 }}>(to‘g‘ri)</span>}
                    </li>
                  );
                })}
              </ul>
              <button className={`btn btn-danger btn-sm theme-${theme}`} onClick={() => handleDelete(q.id)}>Delete</button>
              <button className={`btn btn-primary btn-sm theme-${theme}`} onClick={() => setEditIndex(i)}>Edit</button>
            </div>
          ))
        )}
      </div>
      <EditQuestionModal
        show={editIndex !== null}
        onClose={() => setEditIndex(null)}
        onSave={handleEditSave}
        question={editIndex !== null ? sectionQuestions[editIndex].question : ''}
        options={editIndex !== null ? sectionQuestions[editIndex].options : ['', '', '', '']}
        correctAnswerIndex={editIndex !== null ? sectionQuestions[editIndex].correctAnswerIndex ?? 0 : 0}
        // For simplicity, editing multi/truefalse in modal is not fully supported here
      />
    </div>
  );
};

export default CreateQuiz;
