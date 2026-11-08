import React from 'react';
import { Button } from '@/components/ui/button';
import { Layers, Server, ShieldCheck, Database } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-700/10">
          Monorepo Architecture
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Modular E-commerce Platform
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
          A high-performance monorepo foundation built with React, Vite, NestJS, Prisma, PostgreSQL,
          and Redis.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="primary">Explore Architecture</Button>
          <Button variant="outline">API Documentation</Button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <Layers className="h-8 w-8 text-brand-600 mb-4" />
          <h2 className="text-lg font-semibold text-slate-900">Feature-Based Web</h2>
          <p className="mt-2 text-sm text-slate-500">
            React 18, Vite, TanStack Query, Zustand, and Tailwind CSS.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <Server className="h-8 w-8 text-emerald-600 mb-4" />
          <h2 className="text-lg font-semibold text-slate-900">Modular Monolith API</h2>
          <p className="mt-2 text-sm text-slate-500">
            NestJS architecture with bounded contexts and domain separation.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <Database className="h-8 w-8 text-indigo-600 mb-4" />
          <h2 className="text-lg font-semibold text-slate-900">Data & Queue Engine</h2>
          <p className="mt-2 text-sm text-slate-500">
            PostgreSQL 16, Prisma ORM, and Redis with BullMQ support.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <ShieldCheck className="h-8 w-8 text-amber-600 mb-4" />
          <h2 className="text-lg font-semibold text-slate-900">Quality Gates</h2>
          <p className="mt-2 text-sm text-slate-500">
            Strict TypeScript, ESLint 9, Prettier, Husky, Vitest, and Jest.
          </p>
        </div>
      </div>
    </div>
  );
};
