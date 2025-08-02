'use client';

import { useState, useEffect } from 'react';

export default function VerseDisplay({ chapter, selectedVerse, onVerseSelect }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = localStorage.getItem('gita-bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  useEffect(() => {
    // Check if current verse is bookmarked
    const currentVerseKey = `${chapter?.chapterId}.${selectedVerse}`;
    setIsBookmarked(bookmarks.some(bookmark => bookmark.verseKey === currentVerseKey));
  }, [selectedVerse, chapter, bookmarks]);

  if (!chapter) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-600">Please select a chapter to view verses.</p>
      </div>
    );
  }

  const currentVerse = chapter.verses.find(v => v.number === `${chapter.chapterId}.${selectedVerse}`);
  const totalVerses = chapter.verses.length;

  const handlePrevious = () => {
    if (selectedVerse > 1) {
      onVerseSelect(selectedVerse - 1);
    }
  };

  const handleNext = () => {
    if (selectedVerse < totalVerses) {
      onVerseSelect(selectedVerse + 1);
    }
  };

  const toggleBookmark = () => {
    const currentVerseKey = `${chapter.chapterId}.${selectedVerse}`;
    const verseInfo = {
      verseKey: currentVerseKey,
      chapterId: chapter.chapterId,
      chapterName: chapter.name,
      verseNumber: selectedVerse,
      verseText: currentVerse?.translation?.substring(0, 100) + '...',
      timestamp: new Date().toISOString()
    };

    let newBookmarks;
    if (isBookmarked) {
      // Remove bookmark
      newBookmarks = bookmarks.filter(bookmark => bookmark.verseKey !== currentVerseKey);
    } else {
      // Add bookmark
      newBookmarks = [...bookmarks, verseInfo];
    }

    setBookmarks(newBookmarks);
    localStorage.setItem('gita-bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
        <button
          onClick={handlePrevious}
          disabled={selectedVerse === 1}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            selectedVerse === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-orange-600 hover:bg-orange-50 hover:shadow-md border border-orange-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold text-sm">Previous</span>
        </button>

        <div className="text-center">
          <div className="text-lg font-bold text-orange-700">
            Verse {selectedVerse} of {totalVerses}
          </div>
          <div className="text-sm text-orange-600">
            Chapter {chapter.chapterId} • {chapter.name}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={selectedVerse === totalVerses}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            selectedVerse === totalVerses
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-orange-600 hover:bg-orange-50 hover:shadow-md border border-orange-200'
          }`}
        >
          <span className="font-semibold text-sm">Next</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Current Verse */}
      {currentVerse && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-gray-800">
                Verse {currentVerse.number}
              </h2>
              {currentVerse.important && (
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Important Verse
                </span>
              )}
            </div>
            
            {/* Bookmark Button */}
            <button
              onClick={toggleBookmark}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                isBookmarked
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
              }`}
            >
              <svg 
                className={`w-5 h-5 ${isBookmarked ? 'fill-current' : 'fill-none'}`} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
                />
              </svg>
              {/* <span className="font-semibold text-sm">
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </span> */}
            </button>
          </div>

          {/* Sanskrit Text */}
          <div className="mb-6 p-4 bg-orange-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Sanskrit</h3>
            <p className="text-xl font-devanagari text-gray-800 leading-relaxed">
              {currentVerse.sanskrit}
            </p>
          </div>

          {/* Transliteration */}
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Transliteration</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {currentVerse.transliteration}
            </p>
          </div>

          {/* Translation */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Translation</h3>
            <p className="text-lg text-gray-800 leading-relaxed">
              {currentVerse.translation}
            </p>
          </div>

          {/* Word Meanings */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Word Meanings</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {currentVerse.wordMeaning}
            </p>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      {/* <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
        <button
          onClick={handlePrevious}
          disabled={selectedVerse === 1}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            selectedVerse === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-orange-600 hover:bg-orange-50 hover:shadow-md border border-orange-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold text-sm">Previous Verse</span>
        </button>

        <div className="text-center">
          <div className="text-sm text-orange-600 font-medium">
            Navigate through verses
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={selectedVerse === totalVerses}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            selectedVerse === totalVerses
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-orange-600 hover:bg-orange-50 hover:shadow-md border border-orange-200'
          }`}
        >
          <span className="font-semibold text-sm">Next Verse</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div> */}
    </div>
  );
} 