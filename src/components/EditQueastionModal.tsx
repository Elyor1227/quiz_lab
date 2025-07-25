import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

type QuizType = 'single' | 'multi' | 'truefalse';

type Props = {
  show: boolean;
  onClose: () => void;
  onSave: (updated: {
    question: string;
    options: string[];
    correctAnswerIndex?: number;
    correctAnswers?: number[];
    quizType: QuizType;
  }) => void;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  correctAnswers?: number[];
  quizType?: QuizType;
};

const EditQuestionModal: React.FC<Props> = ({
  show, onClose, onSave, question, options, correctAnswerIndex, correctAnswers = [], quizType = 'single'
}) => {
  const { theme } = useTheme();
  const [q, setQ] = useState(question);
  const [opts, setOpts] = useState([...options]);
  const [correct, setCorrect] = useState(correctAnswerIndex);
  const [multiCorrect, setMultiCorrect] = useState<number[]>(correctAnswers);
  const [type, setType] = useState<QuizType>(quizType);

  useEffect(() => {
    setQ(question);
    setOpts([...options]);
    setCorrect(correctAnswerIndex);
    setMultiCorrect(correctAnswers ?? []);
    setType(quizType ?? 'single');
  }, [show, question, options, correctAnswerIndex, correctAnswers, quizType]);

  if (!show) return null;

  return (
    <div className={`modal-backdrop theme-${theme}`}>
      <div className={`modal theme-${theme}`}>
        <h3>Edit Question</h3>
        <div className="form-group">
          <label>Test turi:</label>
          <select className={`input theme-${theme}`} value={type} onChange={e => setType(e.target.value as QuizType)}>
            <option value="single">Single</option>
            <option value="multi">  Multi-choice</option>
            <option value="truefalse">True/False</option>
          </select>
        </div>
        <div className="form-group">
          <label>Question:</label>
          <input className={`input theme-${theme}`} value={q} onChange={e => setQ(e.target.value)} />
        </div>
        {type === 'truefalse' ? null : opts.map((opt, i) => (
          <div className="form-group" key={i}>
            <label>Option {String.fromCharCode(65 + i)}:</label>
            <input
              className={`input theme-${theme}`}
              value={opt}
              onChange={e => {
                const updated = [...opts];
                updated[i] = e.target.value;
                setOpts(updated);
              }}
            />
            {type === 'multi' && (
              <input
                type="checkbox"
                checked={multiCorrect.includes(i)}
                onChange={e => {
                  if (e.target.checked) setMultiCorrect(prev => [...prev, i]);
                  else setMultiCorrect(prev => prev.filter(j => j !== i));
                }}
                style={{ marginLeft: 8 }}
              />
            )}
            {type === 'multi' && <span style={{ marginLeft: 4 }}>To‘g‘ri</span>}
          </div>
        ))}
        {type === 'single' && (
          <div className="form-group">
            <label>Correct Answer:</label>
            <select
              value={correct}
              onChange={e => setCorrect(Number(e.target.value))}
              className={`input theme-${theme}`}
            >
              {opts.map((_, i) => (
                <option key={i} value={i}>
                  Option {String.fromCharCode(65 + i)}
                </option>
              ))}
            </select>
          </div>
        )}
        {type === 'truefalse' && (
          <div className="form-group">
            <label>Correct Answer:</label>
            <select
              value={correct}
              onChange={e => setCorrect(Number(e.target.value))}
              className={`input theme-${theme}`}
            >
              <option value={0}>True</option>
              <option value={1}>False</option>
            </select>
          </div>
        )}
        <div className="button-group">
          <button
            className={`btn btn-primary theme-${theme}`}
            onClick={() => onSave({
              question: q,
              options: type === 'truefalse' ? ['True', 'False'] : opts,
              correctAnswerIndex: type === 'single' || type === 'truefalse' ? correct : undefined,
              correctAnswers: type === 'multi' ? multiCorrect : undefined,
              quizType: type,
            })}
          >
            Update
          </button>
          <button className={`btn theme-${theme}`} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionModal;
