import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, ShoppingCart, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <ShoppingBag className="h-6 w-6 text-brand-600" />
          <span>NovaStore</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/products" className="hover:text-brand-600 transition-colors">
            Catalog
          </Link>
          <Link to="/categories" className="hover:text-brand-600 transition-colors">
            Categories
          </Link>
          <Link to="/deals" className="hover:text-brand-600 transition-colors">
            Deals
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="Search products"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            to="/cart"
            className="p-2 text-slate-600 hover:text-slate-900 transition-colors relative"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <Link
            to="/auth/login"
            className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="Account Login"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};
