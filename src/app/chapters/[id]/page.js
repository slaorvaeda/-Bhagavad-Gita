'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import VerseDisplay from '../../components/VerseDisplay';


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
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-orange-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Chapter...</h2>
          <p className="text-gray-600">Please wait while we load the sacred verses</p>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Chapter Not Found</h2>
          <p className="text-gray-600 mb-6">The requested chapter could not be found.</p>
          <Link 
            href="/chapters"
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2 mx-auto w-fit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Back to Chapters</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Chapter Header */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div
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
          </div>
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
                          <svg className="w-3 h-3 mx-auto mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
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
                  
                  <Link 
                    href="/chapters"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center block"
                  >
                    All Chapters
                  </Link>
                  
                  {chapterId < 18 && (
                    <Link 
                      href={`/chapters/${chapterId + 1}`}
                      className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center block"
                    >
                      Next Chapter →
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {selectedVerse ? (
                <VerseDisplay 
                  chapter={chapter} 
                  selectedVerse={selectedVerse} 
                  onVerseSelect={handleVerseSelect}
                />
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Select a Verse</h2>
                  <p className="text-gray-600">Choose a verse from the sidebar to begin reading</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 