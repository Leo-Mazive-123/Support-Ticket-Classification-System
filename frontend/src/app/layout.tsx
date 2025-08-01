// src/app/layout.tsx
import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Support Ticket Classifier',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 font-sans">
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}




