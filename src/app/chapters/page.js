'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ChaptersPage() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChapters = () => {
      const loadedChapters = [];
      
      for (let i = 1; i <= 18; i++) {
        try {
          // Try to load all parts of the chapter
          const chapterParts = [];
          let part = 1;
          
          while (true) {
            try {
              const chapterPart = require(`../data/chapters/chapter${i}_part${part}.js`);
              chapterParts.push(chapterPart[`chapter${i}_part${part}`]);
              part++;
            } catch (error) {
              break; // No more parts
            }
          }
          
          // If no parts found, try the single file
          if (chapterParts.length === 0) {
            try {
              const singleChapter = require(`../data/chapters/chapter${i}.js`);
              loadedChapters.push(singleChapter[`chapter${i}`]);
            } catch (error) {
              console.log(`Chapter ${i} not found`);
            }
          } else {
            // Combine all parts into one chapter
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
      setLoading(false);
    };

    loadChapters();
  }, []);

  const chapterThemes = [
    'from-orange-500 to-red-500',
    'from-blue-500 to-purple-500',
    'from-green-500 to-teal-500',
    'from-yellow-500 to-orange-500',
    'from-purple-500 to-pink-500',
    'from-indigo-500 to-blue-500',
    'from-teal-500 to-green-500',
    'from-pink-500 to-red-500',
    'from-red-500 to-orange-500',
    'from-blue-500 to-indigo-500',
    'from-green-500 to-blue-500',
    'from-yellow-500 to-green-500',
    'from-purple-500 to-indigo-500',
    'from-orange-500 to-yellow-500',
    'from-teal-500 to-blue-500',
    'from-pink-500 to-purple-500',
    'from-indigo-500 to-purple-500',
    'from-red-500 to-pink-500'
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Chapters...</h2>
          <p className="text-gray-600">Please wait while we load the sacred chapters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Page Header */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
              The Eighteen Chapters
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8">
              Explore the complete Bhagavad Gita through its eighteen chapters, each containing profound wisdom and spiritual teachings.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">18</div>
                <div className="text-xs sm:text-sm text-gray-600">Chapters</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">700</div>
                <div className="text-xs sm:text-sm text-gray-600">Verses</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">∞</div>
                <div className="text-xs sm:text-sm text-gray-600">Wisdom</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Sacred</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.chapterId}
                className="group"
              >
                <Link href={`/chapters/${chapter.chapterId}`}>
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    {/* Chapter Header */}
                    <div className={`bg-gradient-to-r ${chapterThemes[index]} p-4 sm:p-6 text-white`}>
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="text-2xl sm:text-3xl font-bold">Chapter {chapter.chapterId}</div>
                        <div className="flex justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">{chapter.name}</h3>
                      <p className="text-sm sm:text-base opacity-90">{chapter.meaning}</p>
                    </div>

                    {/* Chapter Content */}
                    <div className="p-4 sm:p-6">
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="text-center">
                          <div className="text-lg sm:text-xl font-bold text-orange-600">
                            {chapter.verses ? chapter.verses.length : 0}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">Verses</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg sm:text-xl font-bold text-orange-600">
                            {chapter.verses ? chapter.verses.filter(v => v.important).length : 0}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">Important</div>
                        </div>
                      </div>
                      
                      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 line-clamp-3">
                        {chapter.summary}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-500">
                          Chapter {chapter.chapterId}
                        </span>
                        <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold">
                          Read Now
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 sm:p-8 md:p-12 text-white text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Continue Your Study
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90">
              Explore other sections to deepen your understanding of the Bhagavad Gita
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/important-verses">
                <button
                  className="bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto touch-target"
                >
                  Important Verses
                </button>
              </Link>
              <Link href="/search">
                <button
                  className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300 w-full sm:w-auto touch-target"
                >
                  Search Verses
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 