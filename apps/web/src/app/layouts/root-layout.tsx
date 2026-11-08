import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';

export const RootLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
