'use client';

import Link from 'next/link';

export default function FamousVerseCard({ verse, index }) {
  return (
    <div className="bg-transporent rounded-2xl shadow-xl overflow-hidden border-2 border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-2xl">
      {/* Verse Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-transporent bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">{index + 1}</span>
              </div>
              <h3 className="text-2xl font-bold">
                Verse {verse.id}
              </h3>
            </div>
            <p className="text-orange-100 text-lg">Chapter {verse.chapter} • Famous Teaching</p>
          </div>
          <div className="text-right ml-4">
            <div className="flex justify-center mb-2">
              <svg className="w-8 h-8 text-orange-100" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <p className="text-sm text-orange-100 font-semibold">Famous Verse</p>
          </div>
        </div>
      </div>

      {/* Verse Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sanskrit Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700 flex items-center">
              <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Sanskrit Text
            </h4>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
              <p className="text-lg font-devanagari text-gray-800 leading-relaxed">
                {verse.sanskrit}
              </p>
            </div>
          </div>

          {/* Translation Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700 flex items-center">
              <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Translation
            </h4>
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <p className="text-lg text-gray-800 leading-relaxed">
                {verse.translation}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h5 className="font-semibold text-gray-700 mb-2 text-sm">Core Meaning:</h5>
              <p className="text-sm text-gray-700 leading-relaxed">
                {verse.meaning}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 font-medium">
              Chapter {verse.chapter} • Verse {verse.id}
            </span>
            <div className="flex items-center space-x-2 text-orange-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="text-sm font-semibold">Famous</span>
            </div>
          </div>
          <Link 
            href={`/chapters/${verse.chapter}?verse=${verse.id.split('.')[1]}`}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2 hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>View in Chapter</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 