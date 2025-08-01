'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams?.get('email') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!email) {
      setError('Invalid access. Please enter your email first.');
    }
  }, [email]);

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("/back.png")' }}>
        <p className="text-red-600 text-center text-lg p-4 bg-white bg-opacity-80 rounded">
          Invalid access. Please enter your email first.
        </p>
      </div>
    );
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

  const handleReset = async () => {
    setError('');
    setMessage('');

    if (!password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, new_password: password }),
      });

      if (res.ok) {
        setMessage('Password reset successful! Redirecting to login...');
        setTimeout(() => router.push('/login'), 2500);
      } else {
        const text = await res.text();
        setError(text || 'Failed to reset password');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url("/tech.png")' }}
    >
      <div className="max-w-md w-full bg-white bg-opacity-90 p-6 border rounded shadow relative">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        >
          ×
        </button>

        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {!error && (
          <>
            <p className="mb-4">
              Resetting password for: <strong>{email}</strong>
            </p>

            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <div className="relative mb-4">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border p-2 rounded pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2 top-2 text-gray-600"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? '🙈' : '👁️'}
              </button>
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
            >
              Reset Password
            </button>

            {message && <p className="text-green-600 mt-4">{message}</p>}
          </>
        )}
      </div>
    </div>
  );
}
