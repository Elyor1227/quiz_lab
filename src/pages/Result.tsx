// src/pages/Result.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  total: number;
  correct: number;
};

const Result: React.FC<Props> = ({ total, correct }) => {
  const wrong = total - correct;
  const percent = Math.round((correct / total) * 100);

  const data = {
    labels: ['Correct', 'Wrong'],
    datasets: [
      {
        label: 'Results',
        data: [correct, wrong],
        backgroundColor: ['#36a2eb', '#ff6384'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
      <h2>Test Natijasi</h2>
      <p>To‘g‘ri javoblar: {correct} / {total}</p>
      <p>Foizda: <strong>{percent}%</strong></p>
      <Pie data={data} />
    </div>
  );
};

export default Result;
