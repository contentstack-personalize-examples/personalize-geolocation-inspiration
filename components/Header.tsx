import React from 'react';

import Link from 'next/link';

import { Header as HeaderType } from '@/lib/types';

interface HeaderProps {
  header?: HeaderType;
}

export function Header({ header }: HeaderProps) {
  if (!header) return null;

  return (
    <header className="bg-white border-b border-gray-200 text-gray-800 py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Brand Name */}
        <div className="text-2xl font-light tracking-widest">
          <Link href="/" className="hover:text-gray-600 font-serif no-underline hover:underline">
            {header.brand_name}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {header.navigation?.nav_link?.map((link, index) => (
            <Link 
              key={index} 
              href={link.href} 
              className="hover:text-gray-600 no-underline hover:underline"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Search and Cart */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-2 rounded border border-gray-300 text-gray-800 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4">
          {header.navigation?.nav_link?.map((link, index) => (
            <Link 
              key={index} 
              href={link.href} 
              className="hover:text-gray-600 no-underline hover:underline"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
