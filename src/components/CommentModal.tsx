import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

type Props = {
  show: boolean;
  onClose: () => void;
  onSubmit: (comment: { name: string; text: string }) => void;
};

const CommentModal: React.FC<Props> = ({ show, onClose, onSubmit }) => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (show) {
      setName('');
      setText('');
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className={`modal-backdrop theme-${theme}`}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className={`modal theme-${theme}`}
        style={{ borderRadius: 12, padding: 32, minWidth: 320, boxShadow: '0 2px 16px rgba(0,0,0,0.15)', position: 'relative' }}>
        <h3 style={{ marginBottom: 20 }}>Izoh qoldirish</h3>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!name.trim() || !text.trim()) return;
            onSubmit({ name, text });
            onClose();
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          <input
            type="text"
            placeholder="Ismingiz"
            value={name}
            onChange={e => setName(e.target.value)}
            className={`theme-${theme}`}
            maxLength={32}
            required
          />
          <textarea
            placeholder="Izohingiz..."
            value={text}
            onChange={e => setText(e.target.value)}
            className={`theme-${theme}`}
            maxLength={300}
            required
          />
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            <button type="submit" className={`btn btn-primary theme-${theme}`} style={{ flex: 1 }}>
              Yuborish
            </button>
            <button type="button" onClick={onClose} className={`btn theme-${theme}`} style={{ flex: 1 }}>
              Bekor qilish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentModal; 