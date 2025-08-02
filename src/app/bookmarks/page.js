'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedBookmarks = JSON.parse(localStorage.getItem('gita-bookmarks') || '[]');
    setBookmarks(savedBookmarks);
  }, []);

  const removeBookmark = (verseId) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.verseId !== verseId);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('gita-bookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Bookmarks
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Your saved verses and chapters from the Bhagavad Gita
          </p>
        </div>

        {/* Bookmarks List */}
        <div className="max-w-4xl mx-auto">
          {bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Bookmarks Yet</h2>
              <p className="text-gray-600 mb-6">You haven&apos;t saved any verses or chapters yet.</p>
              <Link href="/chapters" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors">
                Explore Chapters
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {bookmarks.map((bookmark, index) => (
                <div
                  key={bookmark.verseId}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-1">
                          Chapter {bookmark.chapterId}, Verse {bookmark.verseNumber}
                        </h3>
                        <p className="text-sm sm:text-base opacity-90">{bookmark.chapterTitle}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex justify-center mb-1">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </div>
                        <p className="text-xs sm:text-sm opacity-90">Bookmarked</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                      {/* Sanskrit Text */}
                      <div className="space-y-3 sm:space-y-4">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-700 flex items-center">
                          <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Sanskrit Text
                        </h4>
                        <div className="bg-orange-50 rounded-lg p-3 sm:p-4 border border-orange-100">
                          <p className="text-sm sm:text-base font-devanagari text-gray-800 leading-relaxed">
                            {bookmark.sanskrit}
                          </p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 border border-yellow-100">
                          <h5 className="font-semibold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Transliteration:</h5>
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                            {bookmark.transliteration}
                          </p>
                        </div>
                      </div>

                      {/* Translation */}
                      <div className="space-y-3 sm:space-y-4">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-700 flex items-center">
                          <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                          </svg>
                          Translation
                        </h4>
                        <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-100">
                          <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                            {bookmark.translation}
                          </p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100">
                          <h5 className="font-semibold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Word Meanings:</h5>
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                            {bookmark.wordMeaning}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <span className="text-xs sm:text-sm text-gray-600">
                          Chapter {bookmark.chapterId} • Verse {bookmark.verseNumber}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          Bookmarked on {isClient ? new Date(bookmark.timestamp).toLocaleDateString() : 'Loading...'}
                        </span>
                        {bookmark.important && (
                          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-semibold flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            Important
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Link 
                          href={`/chapters/${bookmark.chapterId}?verse=${bookmark.verseNumber.split('.')[1]}`}
                          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2 touch-target"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <span>View in Chapter</span>
                        </Link>
                        <button
                          onClick={() => removeBookmark(bookmark.verseId)}
                          className="bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 flex items-center space-x-2 touch-target"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 