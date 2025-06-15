'use client';
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('demo@example.org');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);

    await signIn("credentials", {
      email,
      password,
      redirect: true, 
      callbackUrl: "/list"
    }).then((res) => {
      if (res?.error) {
        console.error("Login failed:", res.error);
      } else {
        console.log("Login successful!");
      }
    });
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
          <label style={{ fontWeight: 'bold', fontSize: '36px' }}>
            Login
          </label>
        </center>
        <label>Email</label>
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

      {session ? (
        <div style={{ marginTop: '20px' }}>
          <p>Welcome, {session.user?.email}</p>
          <button onClick={() => signOut()} style={{
            marginTop: '10px',
            padding: '8px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Sign Out
          </button>
        </div>
      ) : null}
    </div>
  );
}