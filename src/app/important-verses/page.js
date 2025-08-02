'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ImportantVersesPage() {
  const [importantVerses, setImportantVerses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [filterChapter, setFilterChapter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChapters = () => {
      const loadedChapters = [];
      
      for (let i = 1; i <= 18; i++) {
        try {
          const chapterPart = require(`../data/chapters/chapter${i}_part1.js`);
          loadedChapters.push(chapterPart[`chapter${i}_part1`]);
        } catch (error) {
          try {
            const singleChapter = require(`../data/chapters/chapter${i}.js`);
            loadedChapters.push(singleChapter[`chapter${i}`]);
          } catch (error) {
            console.log(`Chapter ${i} not found`);
          }
        }
      }
      
      setChapters(loadedChapters);
      
      // Extract important verses from all chapters
      const allImportantVerses = [];
      loadedChapters.forEach(chapter => {
        if (chapter.verses) {
          chapter.verses.forEach(verse => {
            if (verse.important) {
              allImportantVerses.push({
                chapter: chapter,
                verse: verse
              });
            }
          });
        }
      });
      
      setImportantVerses(allImportantVerses);
      setLoading(false);
    };

    loadChapters();
  }, []);

  const filteredVerses = filterChapter === 'all' 
    ? importantVerses 
    : importantVerses.filter(item => item.chapter.chapterId === parseInt(filterChapter));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Important Verses...</h2>
          <p className="text-gray-600">Please wait while we load the sacred verses</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto px-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Important Verses
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover the most significant teachings from the Bhagavad Gita. 
              These verses contain the essence of spiritual wisdom and guidance for life.
            </p>
            <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-lg inline-block">
              <p className="text-2xl font-bold text-orange-600 mb-2">{importantVerses.length}</p>
              <p className="text-gray-600">Important Verses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <label className="text-lg font-semibold text-gray-700 mb-2 block">Filter by Chapter:</label>
                <select
                  value={filterChapter}
                  onChange={(e) => setFilterChapter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">All Chapters ({importantVerses.length} verses)</option>
                  {chapters.map(chapter => {
                    const chapterVerseCount = importantVerses.filter(item => item.chapter.chapterId === chapter.chapterId).length;
                    return (
                      <option key={chapter.chapterId} value={chapter.chapterId}>
                        Chapter {chapter.chapterId}: {chapter.name} ({chapterVerseCount} verses)
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-600 mb-1">Showing</p>
                <p className="text-2xl font-bold text-orange-600">{filteredVerses.length} verses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Verses */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {filteredVerses.length > 0 ? (
              <div className="space-y-8">
                {filteredVerses.map((item, index) => (
                  <div
                    key={`${item.chapter.chapterId}-${item.verse.number}`}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-orange-200 hover:border-orange-300 transition-all duration-300"
                  >
                    {/* Verse Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">
                            {item.chapter.name} - Verse {item.verse.number}
                          </h3>
                          <p className="text-orange-100">{item.chapter.meaning}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex justify-center mb-2">
                            <svg className="w-8 h-8 text-orange-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </div>
                          <p className="text-sm text-orange-100">Important Verse</p>
                        </div>
                      </div>
                    </div>

                    {/* Verse Content */}
                    <div className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Sanskrit */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-700 flex items-center">
                            <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Sanskrit Text
                          </h4>
                          <div className="bg-orange-50 rounded-lg p-4">
                            <p className="text-lg font-devanagari text-gray-800 leading-relaxed">
                              {item.verse.sanskrit}
                            </p>
                          </div>
                          <div className="bg-yellow-50 rounded-lg p-4">
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {item.verse.transliteration}
                            </p>
                          </div>
                        </div>

                        {/* Translation */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-700 flex items-center">
                            <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                            Translation
                          </h4>
                          <div className="bg-green-50 rounded-lg p-4">
                            <p className="text-lg text-gray-800 leading-relaxed">
                              {item.verse.translation}
                            </p>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-4">
                            <h5 className="font-semibold text-gray-700 mb-2">Word Meanings:</h5>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {item.verse.wordMeaning}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">
                            Chapter {item.chapter.chapterId} • Verse {item.verse.number}
                          </span>
                        </div>
                        <Link 
                          href={`/chapters/${item.chapter.chapterId}?verse=${item.verse.number.split('.')[1]}`}
                          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
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
            ) : (
              <div className="text-center py-16">
                <div className="flex justify-center mb-4">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No Important Verses Found</h2>
                <p className="text-gray-600 mb-6">Try selecting a different chapter or check back later.</p>
                <Link 
                  href="/chapters"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>Browse All Chapters</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 