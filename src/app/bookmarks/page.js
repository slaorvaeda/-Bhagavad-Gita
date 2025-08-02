'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = localStorage.getItem('gita-bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
    setLoading(false);
  }, []);

  const removeBookmark = (verseKey) => {
    const newBookmarks = bookmarks.filter(bookmark => bookmark.verseKey !== verseKey);
    setBookmarks(newBookmarks);
    localStorage.setItem('gita-bookmarks', JSON.stringify(newBookmarks));
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem('gita-bookmarks');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-orange-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Bookmarks...</h2>
          <p className="text-gray-600">Please wait while we load your saved verses</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Page Header */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto border border-orange-100">
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-semibold mb-4">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Your Sacred Collection
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                My Bookmarks
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your collection of favorite verses from the Bhagavad Gita
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">{bookmarks.length}</div>
                  <div className="text-sm text-orange-700 font-medium">Saved Verses</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="text-2xl font-bold text-green-600">
                    {new Set(bookmarks.map(b => b.chapterId)).size}
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

      {/* Bookmarks Content */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          {bookmarks.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100 max-w-2xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">No Bookmarks Yet</h2>
              <p className="text-gray-600 text-lg mb-8">
                Start exploring the Bhagavad Gita and bookmark your favorite verses
              </p>
              <Link 
                href="/chapters"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Explore Chapters</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Actions */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Your Saved Verses ({bookmarks.length})
                </h2>
                <button
                  onClick={clearAllBookmarks}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
                >
                  Clear All
                </button>
              </div>

              {/* Bookmarks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarks.map((bookmark, index) => (
                  <div key={bookmark.verseKey} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">{bookmark.chapterId}</span>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-600">
                              Chapter {bookmark.chapterId}
                            </div>
                            <div className="text-xs text-gray-500">
                              Verse {bookmark.verseNumber}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeBookmark(bookmark.verseKey)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      {/* Chapter Name */}
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        {bookmark.chapterName}
                      </h3>

                      {/* Verse Preview */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {bookmark.verseText}
                      </p>

                      {/* Timestamp */}
                      <div className="text-xs text-gray-500 mb-4">
                        Saved on {new Date(bookmark.timestamp).toLocaleDateString()}
                      </div>

                      {/* Action Button */}
                      <Link 
                        href={`/chapters/${bookmark.chapterId}?verse=${bookmark.verseNumber}`}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 text-center block font-semibold"
                      >
                        Read Verse
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 