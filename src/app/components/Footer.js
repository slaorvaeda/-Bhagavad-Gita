'use client';

import Link from 'next/link';

export default function Footer() {
  const footerLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/chapters', label: 'Chapters', icon: '📖' },
    { href: '/search', label: 'Search', icon: '🔍' },
    { href: '/important-verses', label: 'Important Verses', icon: '⭐' },
    { href: '/famous-verses', label: 'Famous Verses', icon: '💫' },
    { href: '/bookmarks', label: 'Bookmarks', icon: '💾' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div className="text-orange-400">
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
                <h3 className="text-lg sm:text-xl font-bold font-devanagari">श्रीमद्भगवद्गीता</h3>
                <p className="text-xs sm:text-sm text-gray-400">Srimad Bhagavad Gita</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Discover the timeless wisdom of Lord Krishna's teachings.
              A sacred scripture that guides humanity through the path of dharma, karma, and moksha.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center space-x-2 text-xs sm:text-sm touch-target"
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Sacred Message */}
          <div className="text-center md:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Sacred Message</h4>
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
              <p className="text-base sm:text-lg font-devanagari text-orange-400 mb-2 sm:mb-3">
                ॐ तत् सत्
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                Om Tat Sat - This is a sacred text. Please read with respect and reverence.
              </p>
            </div>
            <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
              <p>May the divine wisdom guide your path</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            © 2024 Bhagavad Gita Digital. All rights reserved. |
            <span className="text-orange-400 ml-1">ॐ नमः शिवाय</span>
          </p>
        </div>
      </div>
    </footer>
  );
} 