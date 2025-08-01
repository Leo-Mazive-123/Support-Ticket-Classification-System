'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    setError('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    const res = await fetch('http://localhost:8000/check-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } else {
      setError('Email not found. Please check and try again.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url("/tech.png")' }} // or your actual image name
    >
      <div className="relative max-w-md w-full bg-white bg-opacity-90 p-6 border rounded shadow">
        {/* X Button */}
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        >
          ×
        </button>

        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
        >
          Continue
        </button>

        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
}
