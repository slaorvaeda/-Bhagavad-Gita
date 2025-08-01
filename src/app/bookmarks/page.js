'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('gita-bookmarks') || '[]');
    setBookmarks(savedBookmarks);
    setLoading(false);
  }, []);

  const removeBookmark = (verseId) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.verseId !== verseId);
    localStorage.setItem('gita-bookmarks', JSON.stringify(updatedBookmarks));
    setBookmarks(updatedBookmarks);
  };

  const clearAllBookmarks = () => {
    localStorage.removeItem('gita-bookmarks');
    setBookmarks([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <Link href="/" className="text-yellow-300 hover:text-yellow-100 transition-colors mb-4 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              My Bookmarked Verses
            </h1>
            <p className="text-lg opacity-90">
              Your saved verses from the Bhagavad Gita
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {bookmarks.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📖</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No Bookmarked Verses</h2>
              <p className="text-gray-600 mb-8">
                You haven't bookmarked any verses yet. Start reading the Bhagavad Gita and save your favorite verses!
              </p>
              <Link 
                href="/" 
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Start Reading
              </Link>
            </div>
          ) : (
            <>
              {/* Actions */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  {bookmarks.length} Bookmarked Verse{bookmarks.length !== 1 ? 's' : ''}
                </h2>
                <button
                  onClick={clearAllBookmarks}
                  className="text-red-600 hover:text-red-800 transition-colors text-sm"
                >
                  Clear All
                </button>
              </div>

              {/* Bookmarks List */}
              <div className="space-y-6">
                {bookmarks.map((bookmark, index) => (
                  <div key={bookmark.verseId} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-mono text-gray-500">
                          {bookmark.verseNumber}
                        </span>
                        <span className="text-sm text-gray-600">
                          Chapter {bookmark.chapterId}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/chapter/${bookmark.chapterId}#verse-${bookmark.verseNumber}`}
                          className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                        >
                          View Verse
                        </Link>
                        <button
                          onClick={() => removeBookmark(bookmark.verseId)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Remove bookmark"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-400 mb-2">
                      Bookmarked on {new Date(bookmark.timestamp).toLocaleDateString()}
                    </div>
                    
                    <Link
                      href={`/chapter/${bookmark.chapterId}#verse-${bookmark.verseNumber}`}
                      className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    >
                      <div className="text-sm text-gray-600">
                        Click to view the complete verse with Sanskrit text, translation, and word meanings.
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Export/Import */}
              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Manage Bookmarks</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      const dataStr = JSON.stringify(bookmarks, null, 2);
                      const dataBlob = new Blob([dataStr], {type: 'application/json'});
                      const url = URL.createObjectURL(dataBlob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = 'gita-bookmarks.json';
                      link.click();
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Export Bookmarks
                  </button>
                  <button
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = '.json';
                      input.onchange = (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            try {
                              const importedBookmarks = JSON.parse(e.target.result);
                              const currentBookmarks = JSON.parse(localStorage.getItem('gita-bookmarks') || '[]');
                              const mergedBookmarks = [...currentBookmarks, ...importedBookmarks];
                              localStorage.setItem('gita-bookmarks', JSON.stringify(mergedBookmarks));
                              setBookmarks(mergedBookmarks);
                            } catch (error) {
                              alert('Invalid file format');
                            }
                          };
                          reader.readAsText(file);
                        }
                      };
                      input.click();
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Import Bookmarks
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm opacity-75">
            ॐ तत् सत् | Om Tat Sat
          </p>
          <p className="text-xs opacity-50 mt-2">
            Your bookmarks are stored locally in your browser.
          </p>
        </div>
      </footer>
    </div>
  );
} 