'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('demo@example.org');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', email, password);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log('Login response:', data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'var(--background)',
      color: 'var(--foreground)'
    }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '24px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '2px 4px 12px rgba(0,0,0,0.1)',
        width: '500px'
      }}>
        <center>
            <label style={{ fontWeight: 'bold', fontSize: '36px', justifyContent:'center', justifySelf: 'center', width:'100%' }}>
                Login
            </label>
        </center>
        <label>Username</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Sign In
        </button>
      </form>
    </div>
  );
}