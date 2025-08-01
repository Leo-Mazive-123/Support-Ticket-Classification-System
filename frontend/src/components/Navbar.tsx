// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  // Helper to refresh user info from localStorage
  const refreshUser = () => {
    setUserId(localStorage.getItem('userId') || '');
    setUserName(localStorage.getItem('userName') || '');
  };

  useEffect(() => {
    // On mount, get user info
    refreshUser();

    // Listen for localStorage changes (works only for other tabs)
    const onStorage = () => {
      refreshUser();
    };
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    refreshUser(); // update navbar immediately
    router.push('/login');
  };

  // User is logged in if userId exists
  const isLoggedIn = !!userId;

  return (
    <nav className="bg-blue-700 text-white px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left side links */}
        <ul className="flex gap-10">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/submit">Submit Ticket</Link></li>
          <li><Link href="/history">History</Link></li>
        </ul>

        {/* Right side */}
        {isLoggedIn && (
          <div className="flex items-center gap-6">
            <div className="text-sm">
              <span className="font-semibold">Welcome , </span>
              <span className="italic">{userName}</span>
              <span className="ml-3 px-2 py-0.5 rounded bg-green-600 text-green-100 font-mono text-xs">
                ID: {userId}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-blue-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

