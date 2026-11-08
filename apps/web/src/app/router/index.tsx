import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '@/app/layouts/root-layout';
import { HomePage } from './home-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: (
          <div className="flex h-96 flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-slate-800">404 - Page Not Found</h1>
            <p className="mt-2 text-slate-500">The requested page does not exist.</p>
          </div>
        ),
      },
    ],
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
