'use client';

import { useState, useEffect } from 'react';

export default function BookmarkButton({ verseId, chapterId, verseNumber }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Check if verse is already bookmarked
    const bookmarks = JSON.parse(localStorage.getItem('gita-bookmarks') || '[]');
    setIsBookmarked(bookmarks.some(bookmark => bookmark.verseId === verseId));
  }, [verseId]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('gita-bookmarks') || '[]');
    
    if (isBookmarked) {
      // Remove bookmark
      const updatedBookmarks = bookmarks.filter(bookmark => bookmark.verseId !== verseId);
      localStorage.setItem('gita-bookmarks', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
      // Add bookmark
      const newBookmark = {
        verseId,
        chapterId,
        verseNumber,
        timestamp: new Date().toISOString()
      };
      const updatedBookmarks = [...bookmarks, newBookmark];
      localStorage.setItem('gita-bookmarks', JSON.stringify(updatedBookmarks));
      setIsBookmarked(true);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 ${
        isBookmarked 
          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600' 
          : 'bg-white text-gray-400 hover:text-orange-600 hover:bg-orange-50 border-2 border-orange-200 hover:border-orange-400'
      }`}
      title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
    >
      <svg 
        className="w-6 h-6" 
        fill={isBookmarked ? 'currentColor' : 'none'} 
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
    </button>
  );
} 