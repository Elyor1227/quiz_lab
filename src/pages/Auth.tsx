import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Auth: React.FC = () => {
  const { user, login, signup, logout } = useAuth();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  if (user) {
    return (
      <div style={{ padding: 24 }} className={`theme-${theme}`}>
        <p>Welcome, {user.email}!</p>
        <button className={`btn theme-${theme}`} onClick={logout}>Logout</button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ok = isSignup ? signup(email, password) : login(email, password);
    if (!ok) setError('Login yoki parol xato yoki email band!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '2rem auto' }} className={`theme-${theme}`}>
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <input className={`input theme-${theme}`} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input className={`input theme-${theme}`} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button className={`btn btn-primary theme-${theme}`} type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      <button className={`btn theme-${theme}`} type="button" onClick={() => setIsSignup(s => !s)} style={{ marginLeft: 8 }}>
        {isSignup ? 'Login' : 'Sign Up'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Auth;
