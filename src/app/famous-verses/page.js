'use client';

import Link from 'next/link';
import { famousVerses } from '../data/gitaData';
import FamousVerseSlider from '../components/FamousVerseSlider';

export default function FamousVersesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto border border-orange-100">
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-semibold mb-4">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Timeless Wisdom Collection
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                Famous Verses
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                The most important teachings from the Bhagavad Gita that have guided millions 
                of people throughout history and continue to offer profound insights for modern life.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">{famousVerses.length}</div>
                  <div className="text-sm text-orange-700 font-medium">Famous Verses</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="text-2xl font-bold text-green-600">
                    {new Set(famousVerses.map(v => v.chapter)).size}
                  </div>
                  <div className="text-sm text-green-700 font-medium">Chapters</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">∞</div>
                  <div className="text-sm text-blue-700 font-medium">Wisdom</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Timeless Wisdom</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6 text-center">
              These verses contain the essence of the Bhagavad Gita&apos;s teachings. They have guided millions 
              of people throughout history and continue to offer profound insights for modern life.
            </p>
            <p className="text-lg text-gray-600 text-center">
              Each verse is presented with its Sanskrit text, translation, and practical meaning for daily life.
            </p>
          </div>
        </div>
      </section>

      {/* Famous Verses Slider */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <FamousVerseSlider verses={famousVerses} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-12 shadow-xl border-2 border-orange-200 max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Continue Your Journey
            </h3>
            <p className="text-xl text-gray-700 mb-8">
              These verses are just the beginning. Explore all 18 chapters to discover the complete wisdom of the Bhagavad Gita.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/chapters"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 text-lg font-semibold hover:scale-105"
              >
                Explore All Chapters
              </Link>
              <Link
                href="/bookmarks"
                className="bg-gray-600 text-white px-8 py-4 rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-lg hover:scale-105 text-lg font-semibold"
              >
                My Bookmarks
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 