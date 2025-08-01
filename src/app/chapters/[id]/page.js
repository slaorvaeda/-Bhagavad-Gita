'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ChapterPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const chapterId = parseInt(params.id);
  const initialVerse = parseInt(searchParams.get('verse')) || 1;
  
  const [chapter, setChapter] = useState(null);
  const [selectedVerse, setSelectedVerse] = useState(initialVerse);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChapter = () => {
      try {
        // Try to load all parts of the chapter
        const chapterParts = [];
        let part = 1;
        
        while (true) {
          try {
            const chapterPart = require(`../../data/chapters/chapter${chapterId}_part${part}.js`);
            chapterParts.push(chapterPart[`chapter${chapterId}_part${part}`]);
            part++;
          } catch (error) {
            break; // No more parts
          }
        }
        
        // If no parts found, try the single file
        if (chapterParts.length === 0) {
          try {
            const singleChapter = require(`../../data/chapters/chapter${chapterId}.js`);
            setChapter(singleChapter[`chapter${chapterId}`]);
          } catch (error) {
            console.log(`Chapter ${chapterId} not found`);
            setChapter(null);
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
          
          setChapter(combinedChapter);
        }
      } catch (error) {
        console.log(`Error loading chapter ${chapterId}:`, error);
        setChapter(null);
      }
      
      setLoading(false);
    };

    loadChapter();
  }, [chapterId]);

  const handleVerseSelect = (verseNumber) => {
    setSelectedVerse(verseNumber);
  };

  const currentVerse = chapter?.verses?.find(v => v.number === `${chapterId}.${selectedVerse}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">📖</div>
          <p className="text-xl text-gray-600">Loading sacred chapter...</p>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Chapter Not Found</h1>
          <p className="text-gray-600 mb-6">The requested chapter could not be found.</p>
          <Link 
            href="/chapters"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            📖 Back to Chapters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4">
              <div className="text-3xl">🕉️</div>
              <div>
                <h1 className="text-2xl font-bold font-devanagari">श्रीमद्भगवद्गीता</h1>
                <p className="text-sm opacity-90">Srimad Bhagavad Gita</p>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/chapters" className="text-yellow-300 font-semibold">📖 Chapters</Link>
              <Link href="/search" className="hover:text-yellow-300 transition-colors">🔍 Search</Link>
              <Link href="/important-verses" className="hover:text-yellow-300 transition-colors">⭐ Important Verses</Link>
              <Link href="/about" className="hover:text-yellow-300 transition-colors">ℹ️ About</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Chapter Header */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Chapter {chapter.chapterId}: {chapter.name}
              </h1>
              <p className="text-2xl text-gray-600 mb-4">{chapter.meaning}</p>
              <p className="text-xl font-devanagari text-orange-600 mb-6">{chapter.sanskrit}</p>
              <p className="text-lg text-gray-700 leading-relaxed">{chapter.summary}</p>
              <div className="mt-6 flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{chapter.verses?.length || 0}</div>
                  <div className="text-sm text-gray-600">Total Verses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {chapter.verses?.filter(v => v.important).length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Important Verses</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Verse Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Verses</h3>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
                  {chapter.verses?.map((verse) => {
                    const verseNumber = parseInt(verse.number.split('.')[1]);
                    return (
                      <button
                        key={verse.number}
                        onClick={() => handleVerseSelect(verseNumber)}
                        className={`p-3 rounded-lg text-sm font-medium transition-all ${
                          selectedVerse === verseNumber
                            ? 'bg-orange-500 text-white shadow-md'
                            : verse.important
                            ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {verseNumber}
                        {verse.important && (
                          <span className="block text-xs">⭐</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                
                {/* Navigation Buttons */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  {chapterId > 1 && (
                    <Link 
                      href={`/chapters/${chapterId - 1}`}
                      className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center block"
                    >
                      ← Previous Chapter
                    </Link>
                  )}
                  {chapterId < 18 && (
                    <Link 
                      href={`/chapters/${chapterId + 1}`}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center block"
                    >
                      Next Chapter →
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content - Current Verse */}
            <div className="lg:col-span-3">
              {currentVerse ? (
                <motion.div
                  key={currentVerse.number}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  {/* Verse Header */}
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-3xl font-bold">
                        Verse {currentVerse.number}
                      </h2>
                      {currentVerse.important && (
                        <div className="text-right">
                          <div className="text-3xl mb-1">⭐</div>
                          <p className="text-sm text-orange-100">Important Verse</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Verse Content */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Sanskrit */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700 flex items-center">
                          <span className="text-orange-500 mr-2">📜</span>
                          Sanskrit Text
                        </h3>
                        <div className="bg-orange-50 rounded-lg p-4">
                          <p className="text-xl font-devanagari text-gray-800 leading-relaxed">
                            {currentVerse.sanskrit}
                          </p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Transliteration:</h4>
                          <p className="text-lg text-gray-700 leading-relaxed">
                            {currentVerse.transliteration}
                          </p>
                        </div>
                      </div>

                      {/* Translation */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700 flex items-center">
                          <span className="text-orange-500 mr-2">🌍</span>
                          Translation
                        </h3>
                        <div className="bg-green-50 rounded-lg p-4">
                          <p className="text-xl text-gray-800 leading-relaxed">
                            {currentVerse.translation}
                          </p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Word Meanings:</h4>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {currentVerse.wordMeaning}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                  <p className="text-gray-600">Please select a verse to view its content.</p>
                </div>
              )}
            </div>
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
                📖 All Chapters
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