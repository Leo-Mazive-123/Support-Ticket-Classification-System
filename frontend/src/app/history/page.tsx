'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface HistoryItem {
  ticket_text: string;
  actual_department: string;
  confidence_score: number;
  submitted_at: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      router.push('/login');
    } else {
      setUserId(storedUserId);
    }
  }, [router]);

  useEffect(() => {
    if (!userId) return;

    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://127.0.0.1:8000/history/${userId}`);
        const data = await res.json();
        setHistory(data.history || []);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    router.push('/login');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-8"
      style={{ backgroundImage: "url('/robot.png')" }}
    >
      <div className="max-w-3xl mx-auto bg-white bg-opacity-90 p-8 rounded shadow-md">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">Submission History</h1>
        </header>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Your User ID:</label>
          <input
            type="text"
            value={userId ?? ''}
            disabled
            className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {loading ? (
          <p className="text-gray-600">Loading your ticket history...</p>
        ) : history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2">Ticket</th>
                  <th className="border px-3 py-2">Department</th>
                  <th className="border px-3 py-2">Confidence</th>
                  <th className="border px-3 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{item.ticket_text}</td>
                    <td className="border px-3 py-2">{item.actual_department}</td>
                    <td className="border px-3 py-2">
                      {(item.confidence_score * 100).toFixed(1)}%
                    </td>
                    <td className="border px-3 py-2">
                      {new Date(item.submitted_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No submission history found.</p>
        )}
      </div>
    </div>
  );
}
