'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { href: '/chapters', label: 'Chapters', icon: '📖' },
    { href: '/search', label: 'Search', icon: '🔍' },
    { href: '/important-verses', label: 'Important Verses', icon: '⭐' },
    { href: '/famous-verses', label: 'Famous Verses', icon: '💫' },
    { href: '/bookmarks', label: 'Bookmarks', icon: '💾' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 touch-target">
            <div className="text-orange-600">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 sm:w-10 sm:h-10">
                {/* Peacock Feather */}
                <path d="M12 2L11 4L10 6L9 8L8 10L7 12L6 14L5 16L4 18L3 20L2 22L1 24L2 22L3 20L4 18L5 16L6 14L7 12L8 10L9 8L10 6L11 4L12 2Z"/>
                <path d="M12 2L13 4L14 6L15 8L16 10L17 12L18 14L19 16L20 18L21 20L22 22L23 24L22 22L21 20L20 18L19 16L18 14L17 12L16 10L15 8L14 6L13 4L12 2Z"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
                <circle cx="12" cy="8" r="1" fill="currentColor"/>
                <circle cx="12" cy="16" r="1" fill="currentColor"/>
                <circle cx="8" cy="12" r="1" fill="currentColor"/>
                <circle cx="16" cy="12" r="1" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 font-devanagari">श्रीमद्भगवद्गीता</h1>
              <p className="text-xs sm:text-sm text-gray-600">Srimad Bhagavad Gita</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 touch-target ${
                  pathname === item.href 
                    ? 'bg-orange-100 text-orange-600 font-semibold' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <span className="text-base sm:text-lg">{item.icon}</span>
                <span className="text-sm sm:text-base">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-orange-600 transition-colors p-2 touch-target"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 sm:mt-4 pb-3 sm:pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-1 sm:space-y-2 pt-3 sm:pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 sm:py-4 rounded-lg transition-all duration-300 touch-target ${
                    pathname === item.href 
                      ? 'bg-orange-100 text-orange-600 font-semibold' 
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  <span className="text-lg sm:text-xl">{item.icon}</span>
                  <span className="font-medium text-base sm:text-lg">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 