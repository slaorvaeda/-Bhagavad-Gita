'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ImportantVersesPage() {
  const [chapters, setChapters] = useState([]);
  const [importantVerses, setImportantVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterChapter, setFilterChapter] = useState('all');

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
      
      // Extract important verses
      const important = [];
      loadedChapters.forEach(chapter => {
        if (chapter.verses) {
          chapter.verses.forEach(verse => {
            if (verse.important) {
              important.push({
                chapter: chapter,
                verse: verse
              });
            }
          });
        }
      });
      
      setImportantVerses(important);
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
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">⭐</div>
          <p className="text-xl text-gray-600">Loading important verses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">

    
      {/* Page Header */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              ⭐ Important Verses
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover the most significant teachings from the Bhagavad Gita. 
              These verses contain the essence of spiritual wisdom and guidance for life.
            </p>
            <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-lg inline-block">
              <p className="text-2xl font-bold text-orange-600 mb-2">{importantVerses.length}</p>
              <p className="text-gray-600">Important Verses</p>
            </div>
          </motion.div>
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
                  <motion.div
                    key={`${item.chapter.chapterId}-${item.verse.number}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
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
                          <div className="text-4xl mb-2">⭐</div>
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
                            <span className="text-orange-500 mr-2">📜</span>
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
                            <span className="text-orange-500 mr-2">🌍</span>
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
                          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                        >
                          📖 View in Chapter
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">⭐</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No Important Verses Found</h2>
                <p className="text-gray-600 mb-6">Try selecting a different chapter or check back later.</p>
                <Link 
                  href="/chapters"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  📖 Browse All Chapters
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <p className="text-lg opacity-75 font-devanagari">
                ॐ तत् सत् | Om Tat Sat
              </p>
              <p className="text-sm opacity-50 mt-2">
                This is a sacred text. Please read with respect and reverence.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="text-orange-300 hover:text-orange-100 transition-colors">
                🏠 Home
              </Link>
              <Link href="/chapters" className="text-orange-300 hover:text-orange-100 transition-colors">
                📖 Chapters
              </Link>
              <Link href="/search" className="text-orange-300 hover:text-orange-100 transition-colors">
                🔍 Search
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 