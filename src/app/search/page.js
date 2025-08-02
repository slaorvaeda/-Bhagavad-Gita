'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const loadChapters = () => {
      const loadedChapters = [];
      
      for (let i = 1; i <= 18; i++) {
        try {
          const chapterParts = [];
          let part = 1;
          
          while (true) {
            try {
              const chapterPart = require(`../data/chapters/chapter${i}_part${part}.js`);
              chapterParts.push(chapterPart[`chapter${i}_part${part}`]);
              part++;
            } catch (error) {
              break;
            }
          }
          
          if (chapterParts.length === 0) {
            try {
              const singleChapter = require(`../data/chapters/chapter${i}.js`);
              loadedChapters.push(singleChapter[`chapter${i}`]);
            } catch (error) {
              console.log(`Chapter ${i} not found`);
            }
          } else {
            const combinedChapter = {
              ...chapterParts[0],
              verses: []
            };
            
            chapterParts.forEach(part => {
              if (part.verses) {
                combinedChapter.verses.push(...part.verses);
              }
            });
            
            loadedChapters.push(combinedChapter);
          }
        } catch (error) {
          console.log(`Error loading chapter ${i}:`, error);
        }
      }
      
      setChapters(loadedChapters);
    };

    loadChapters();
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    const results = [];
    const searchTerm = query.toLowerCase();
    
    chapters.forEach(chapter => {
      if (chapter.verses) {
        chapter.verses.forEach(verse => {
          let shouldInclude = false;
          
          switch (searchType) {
            case 'translation':
              shouldInclude = verse.translation?.toLowerCase().includes(searchTerm);
              break;
            case 'sanskrit':
              shouldInclude = verse.sanskrit?.toLowerCase().includes(searchTerm) || 
                             verse.transliteration?.toLowerCase().includes(searchTerm);
              break;
            case 'important':
              shouldInclude = verse.important && (
                verse.translation?.toLowerCase().includes(searchTerm) ||
                verse.sanskrit?.toLowerCase().includes(searchTerm) ||
                verse.transliteration?.toLowerCase().includes(searchTerm)
              );
              break;
            default: // 'all'
              shouldInclude = verse.translation?.toLowerCase().includes(searchTerm) ||
                             verse.sanskrit?.toLowerCase().includes(searchTerm) ||
                             verse.transliteration?.toLowerCase().includes(searchTerm) ||
                             verse.wordMeaning?.toLowerCase().includes(searchTerm);
          }
          
          if (shouldInclude) {
            results.push({
              chapter: chapter,
              verse: verse
            });
          }
        });
      }
    });
    
    setSearchResults(results);
    setIsSearching(false);
  };

  const popularSearches = [
    'karma', 'dharma', 'yoga', 'moksha', 'atman', 'brahman', 
    'bhakti', 'jnana', 'karma yoga', 'bhakti yoga', 'meditation'
  ];

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div
            className="mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
              Search Sacred Wisdom
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
              Find specific verses, teachings, or words from the Bhagavad Gita. Search through Sanskrit text, translations, and word meanings.
            </p>
          </div>
        </div>
      </section>

      {/* Search Form */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100"
          >
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery); }}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for wisdom, teachings, or specific words..."
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-transparent transition-all duration-300 touch-target"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 touch-target"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search</span>
                </button>
              </div>

              {/* Search Type Selectors */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
                {[
                  { value: 'all', label: 'All Content', icon: 'BookOpen' },
                  { value: 'translation', label: 'Translation Only', icon: 'Globe' },
{ value: 'sanskrit', label: 'Sanskrit Text', icon: 'Document' },
                  { value: 'important', label: 'Important Verses Only', icon: 'Star' }
                ].map((type) => (
                  <label key={type.value} className="flex items-center space-x-2 cursor-pointer touch-target">
                    <input
                      type="radio"
                      name="searchType"
                      value={type.value}
                      checked={searchType === type.value}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="text-orange-500"
                    />
                    <span className="text-base sm:text-lg">{type.icon}</span>
                    <span className="text-sm sm:text-base text-gray-700">{type.label}</span>
                  </label>
                ))}
              </div>

              {/* Popular Searches */}
              <div className="mb-6">
                <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-3">Popular Searches:</h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => { setSearchQuery(term); handleSearch(term); }}
                      className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-xs sm:text-sm hover:bg-orange-200 transition-colors touch-target"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isSearching && (
        <section className="py-8 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Searching through sacred verses...</p>
          </div>
        </section>
      )}

      {/* Search Results */}
      {searchQuery && !isSearching && searchResults.length > 0 && (
        <section className="py-8 sm:py-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div
              className="mb-6 sm:mb-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Search Results
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo;
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {searchResults.map((result, index) => (
                <div
                  key={`${result.chapter.chapterId}-${result.verse.number}`}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-1">
                          Chapter {result.chapter.chapterId}, Verse {result.verse.number}
                        </h3>
                        <p className="text-sm sm:text-base opacity-90">{result.chapter.meaning}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex justify-center mb-1">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-xs sm:text-sm opacity-90">Sacred Verse</p>
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
                            {result.verse.sanskrit}
                          </p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 border border-yellow-100">
                          <h5 className="font-semibold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Transliteration:</h5>
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                            {result.verse.transliteration}
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
                            {result.verse.translation}
                          </p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100">
                          <h5 className="font-semibold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Word Meanings:</h5>
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                            {result.verse.wordMeaning}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <span className="text-xs sm:text-sm text-gray-600">
                          Chapter {result.chapter.chapterId} • Verse {result.verse.number}
                        </span>
                        {result.verse.important && (
                          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-semibold flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            Important
                          </span>
                        )}
                      </div>
                      <Link 
                        href={`/chapters/${result.chapter.chapterId}?verse=${result.verse.number.split('.')[1]}`}
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2 touch-target"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>View in Chapter</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {searchQuery && !isSearching && searchResults.length === 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">No Results Found</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                No verses found matching &ldquo;{searchQuery}&rdquo;. Try different keywords or search terms.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 touch-target"
                >
                  Clear Search
                </button>
                <Link href="/chapters">
                  <button className="border-2 border-orange-500 text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 touch-target">
                    Browse Chapters
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
} 