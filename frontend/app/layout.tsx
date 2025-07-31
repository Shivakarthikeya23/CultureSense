import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CulturalDNA - Discover Your Cultural Personality',
  description: 'Unlock your cultural DNA through AI-powered personality analysis and personalized recommendations.',
  keywords: 'cultural personality, AI, recommendations, music, books, travel, fashion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
} 