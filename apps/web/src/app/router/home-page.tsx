import React from 'react';
import { Button } from '@/components/ui/button';
import { Layers, Server, ShieldCheck, Database } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-700/10">
          Retailer-Owned Custom Commerce Platform
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          NovaStore – PC & Gaming Setup Customization
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
          A high-performance custom commerce foundation for PC hardware, prebuilts, gaming
          peripherals, mechanical keyboard customization, desk setups, and networking with new &amp;
          used inventory.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="primary">PC Builder</Button>
          <Button variant="outline">Setup Customizer</Button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <Layers className="h-8 w-8 text-brand-600 mb-4" />
          <h2 className="text-lg font-semibold text-slate-900">PC &amp; Setup Builder</h2>
          <p className="mt-2 text-sm text-slate-500">
            Interactive PC configuration, mechanical keyboard customization, and full workspace
            builders.
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
          <h2 className="text-lg font-semibold text-slate-900">
            Retailer Inventory (New &amp; Used)
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Direct inventory management with condition grades, inspections, warranties, and integer
            VND pricing.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <ShieldCheck className="h-8 w-8 text-amber-600 mb-4" />
          <h2 className="text-lg font-semibold text-slate-900">AI Assistant Ready</h2>
          <p className="mt-2 text-sm text-slate-500">
            Backend-controlled AI tool calling architecture for recommendations and inventory
            queries.
          </p>
        </div>
      </div>
    </div>
  );
};
