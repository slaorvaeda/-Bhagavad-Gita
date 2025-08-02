'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import VerseDisplay from '../../components/VerseDisplay';

export default function ChapterPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const chapterId = parseInt(params.id);
  const initialVerse = parseInt(searchParams.get('verse')) || 1;
  
  const [chapter, setChapter] = useState(null);
  const [selectedVerse, setSelectedVerse] = useState(initialVerse);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    setIsDropdownOpen(false);
  };

  const currentVerse = chapter?.verses?.find(v => v.number === `${chapterId}.${selectedVerse}`);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center min-h-screen">
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
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center min-h-screen">
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
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 min-h-screen">
      {/* Chapter Header */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto border border-orange-100">
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-semibold mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Chapter {chapterId} of 18
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                {chapter.name}
              </h1>
              <p className="text-2xl text-gray-600 mb-6">{chapter.meaning}</p>
              <p className="text-xl font-devanagari text-orange-600 mb-8">{chapter.sanskrit}</p>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">{chapter.summary}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8">
        <div className="relative w-full max-w-4xl">
          <Image
            src="/divider.svg"
            alt="Sacred Divider"
            width={800}
            height={60}
            className="w-full h-auto opacity-80 bg-transparent"
          />
        </div>
      </div>

      {/* Main Content with Navigation */}
      <section className="py-8 relative">
        <div className="container mx-auto px-6">
          {/* Chapter Navigation */}
          <div className="flex justify-between items-center mb-12">
            {/* Previous Chapter Button - Left Side */}
            {chapterId > 1 && (
              <Link href={`/chapters/${chapterId - 1}`}>
                <button className="w-16 h-16 rounded-full shadow-lg border-2 border-orange-200 bg-white text-orange-600 hover:bg-orange-50 hover:border-orange-300 hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </Link>
            )}
            
            {/* Chapter Info */}
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800">
                Chapter {chapterId} of 18
              </div>
              <div className="text-sm text-gray-600">
                {chapter.name}
              </div>
            </div>

            {/* Next Chapter Button - Right Side */}
            {chapterId < 18 && (
              <Link href={`/chapters/${chapterId + 1}`}>
                <button className="w-16 h-16 rounded-full shadow-lg border-2 border-orange-200 bg-white text-orange-600 hover:bg-orange-50 hover:border-orange-300 hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            )}

            {/* Placeholder for spacing when buttons don't exist */}
            {chapterId === 1 && <div className="w-16"></div>}
            {chapterId === 18 && <div className="w-16"></div>}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Verse Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Select Verse</h3>
                  <div className="text-sm text-gray-500">
                    {chapter.verses?.length || 0} verses
                  </div>
                </div>

                {/* Dropdown Verse Selector */}
                <div className="relative mb-6">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl px-4 py-3 text-left flex items-center justify-between hover:border-orange-300 transition-all duration-300"
                  >
                    <span className="font-semibold text-orange-700">
                      Verse {selectedVerse}
                    </span>
                    <svg 
                      className={`w-5 h-5 text-orange-600 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white border-2 border-orange-200 rounded-xl shadow-2xl max-h-64 overflow-y-auto">
                      <div className="grid grid-cols-4 gap-1 p-2">
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
                              <div className="text-center">
                                <div>{verseNumber}</div>
                                {verse.important && (
                                  <svg className="w-3 h-3 mx-auto mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                  </svg>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>


                
                {/* Back to Chapters Button */}
                <Link 
                  href="/chapters"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-center block hover:shadow-lg hover:scale-105"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>All Chapters</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {selectedVerse ? (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <VerseDisplay 
                    chapter={chapter} 
                    selectedVerse={selectedVerse} 
                    onVerseSelect={handleVerseSelect}
                  />
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Select a Verse</h2>
                  <p className="text-gray-600 text-lg">Choose a verse from the dropdown to begin reading the sacred wisdom</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8">
        <div className="relative w-full max-w-4xl">
          <Image
            src="/divider.svg"
            alt="Sacred Divider"
            width={800}
            height={60}
            className="w-full h-auto opacity-80 bg-transparent"
          />
        </div>
      </div>
    </div>
  );
} 