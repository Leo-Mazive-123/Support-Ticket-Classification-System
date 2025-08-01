// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function SubmitTicketPage() {
//   const router = useRouter();
//   const [userId, setUserId] = useState<string | null>(null);
//   const [ticketText, setTicketText] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<{ department: string; confidence: number } | null>(null);
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   useEffect(() => {
//     const checkLogin = () => {
//       const storedUserId = localStorage.getItem('userId');
//       if (!storedUserId) {
//         router.push('/login');
//       } else {
//         setUserId(storedUserId);
//       }
//       setCheckingAuth(false);
//     };

//     checkLogin();
//   }, [router]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!userId) {
//       alert('You must be logged in to submit a ticket.');
//       router.push('/login');
//       return;
//     }

//     if (ticketText.trim() === '') {
//       alert('Please enter a description of your issue.');
//       return;
//     }

//     setLoading(true);
//     setResult(null);

//     try {
//       const response = await fetch('http://127.0.0.1:8000/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           user_id: Number(userId),
//           ticket_text: ticketText.trim(),
//         }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("Server error:", errorText);
//         throw new Error(errorText || 'Failed to submit ticket');
//       }

//       const data = await response.json();
//       setResult(data);
//       setTicketText('');
//     } catch (error: any) {
//       console.error('Prediction error:', error);
//       alert(`Error submitting ticket: ${error.message || error}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (checkingAuth) {
//     return <p className="text-center mt-10">Checking login...</p>;
//   }

//   return (
//     <div className="max-w-xl mx-auto p-8">
//       <h1 className="text-2xl font-bold mb-6">Submit a Support Ticket</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           value={userId ?? ''}
//           readOnly
//           className="w-full border p-2 rounded bg-gray-100"
//         />

//         <textarea
//           placeholder="Describe your issue"
//           value={ticketText}
//           onChange={(e) => setTicketText(e.target.value)}
//           rows={5}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
//           disabled={loading}
//         >
//           {loading ? 'Submitting...' : 'Submit Ticket'}
//         </button>
//       </form>

//       {result && (
//         <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded">
//           <p>
//             <strong>Predicted Department:</strong> {result.department}
//           </p>
//           <p>
//             <strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitTicketPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [ticketText, setTicketText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ department: string; confidence: number } | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkLogin = () => {
      const storedUserId = localStorage.getItem('userId');
      if (!storedUserId) {
        router.push('/login');
      } else {
        setUserId(storedUserId);
      }
      setCheckingAuth(false);
    };

    checkLogin();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      alert('You must be logged in to submit a ticket.');
      router.push('/login');
      return;
    }

    if (ticketText.trim() === '') {
      alert('Please enter a description of your issue.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: Number(userId),
          ticket_text: ticketText.trim(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        throw new Error(errorText || 'Failed to submit ticket');
      }

      const data = await response.json();
      setResult(data);
      setTicketText('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Prediction error:', error.message);
        alert(`Error submitting ticket: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        alert('An unknown error occurred while submitting the ticket.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return <p className="text-center mt-10">Checking login...</p>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/robot.png')" }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-sm max-w-xl w-full p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-blue-800">Submit a Support Ticket</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={userId ?? ''}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />

          <textarea
            placeholder="Describe your issue"
            value={ticketText}
            onChange={(e) => setTicketText(e.target.value)}
            rows={5}
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Ticket'}
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded">
            <p>
              <strong>Predicted Department:</strong> {result.department}
            </p>
            <p>
              <strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
