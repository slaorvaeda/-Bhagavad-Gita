'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ImportantVerseCard from '../components/ImportantVerseCard';

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
            <svg className="w-16 h-16 text-orange-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Important Verses...</h2>
          <p className="text-gray-600">Please wait while we load the sacred verses</p>
        </div>
      </div>
    );
  }

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
                  Sacred Wisdom Collection
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                Important Verses
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Discover the most significant teachings from the Bhagavad Gita. 
                These verses contain the essence of spiritual wisdom and guidance for life.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">{importantVerses.length}</div>
                  <div className="text-sm text-orange-700 font-medium">Important Verses</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="text-2xl font-bold text-green-600">
                    {new Set(importantVerses.map(v => v.chapter.chapterId)).size}
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

      {/* Filter Section */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <label className="text-lg font-semibold text-gray-700 mb-2 block">Filter by Chapter:</label>
                <select
                  value={filterChapter}
                  onChange={(e) => setFilterChapter(e.target.value)}
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
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
                  <ImportantVerseCard 
                    key={`${item.chapter.chapterId}-${item.verse.number}`}
                    item={item} 
                    index={index} 
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100 max-w-2xl mx-auto">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">No Important Verses Found</h2>
                <p className="text-gray-600 text-lg mb-8">
                  Try selecting a different chapter or check back later.
                </p>
                <Link 
                  href="/chapters"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
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