'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        if (typeof errData.detail === 'string') {
          setError(errData.detail);
        } else if (Array.isArray(errData.detail)) {
          const messages = errData.detail.map((d: { msg: string }) => d.msg).join(', ');
          setError(messages);
        } else {
          setError('Login failed');
        }
        return;
      }

      const data = await res.json();
      localStorage.setItem('userId', data.user_id);
      localStorage.setItem('userName', data.name);

      // Trigger navbar update
      window.dispatchEvent(new Event('storage'));

      router.push('/');
    } catch {
      setError('Network error');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url(\"/tech.png\")' }}
    >
      <div className="max-w-md w-full bg-white bg-opacity-90 p-6 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-700 hover:text-blue-900"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-blue-600 underline">
            Sign Up
          </a>
        </p>

        <p className="mt-2 text-center">
          <a href="/forgot-password" className="text-blue-600 underline hover:text-blue-800">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
}

