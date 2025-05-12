import '../../globals.css';
import type { ReactNode } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="abyss">
      <body className="flex h-screen flex-col overflow-hidden">
        <ErrorBoundary>
          <Header />
          <main className="flex-1 overflow-hidden">{children}</main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
