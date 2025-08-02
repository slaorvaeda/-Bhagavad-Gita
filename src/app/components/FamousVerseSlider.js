'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FamousVerseSlider({ verses }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % verses.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, verses.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + verses.length) % verses.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % verses.length);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Calculate which 5 dots to show
  const getVisibleDots = () => {
    const totalDots = 5;
    const dots = [];
    
    if (verses.length <= totalDots) {
      // If we have 5 or fewer verses, show all dots
      for (let i = 0; i < verses.length; i++) {
        dots.push(i);
      }
    } else {
      // If we have more than 5 verses, show smart dots
      const start = Math.max(0, Math.min(currentIndex - 2, verses.length - totalDots));
      for (let i = 0; i < totalDots; i++) {
        dots.push(start + i);
      }
    }
    
    return dots;
  };

  const visibleDots = getVisibleDots();

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Main Slider */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {verses.map((verse, index) => (
            <div key={verse.id} className="w-full flex-shrink-0">
              <div className="bg-white p-6 md:p-8 lg:p-10 relative h-[450px] md:h-[550px] overflow-y-auto">
                {/* View Chapter Button - Top Right Corner */}
                <div className="absolute top-4 right-4 z-10">
                  <Link 
                    href={`/chapters/${verse.chapter}?verse=${verse.id.split('.')[1]}`}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 transform text-sm"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {/* <span>View Chapter</span> */}
                  </Link>
                </div>

                {/* Verse Header */}
                <div className="text-center mb-6 md:mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-semibold mb-4 shadow-lg">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    Famous Verse {index + 1} of {verses.length}
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                    Verse {verse.id}
                  </h2>
                  <p className="text-base md:text-lg text-gray-600">Chapter {verse.chapter}</p>
                </div>

                {/* Verse Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
                  {/* Sanskrit */}
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-700 flex items-center">
                      <svg className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Sanskrit Text
                    </h3>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 md:p-6 border border-orange-200 shadow-sm hover:shadow-md transition-all duration-300">
                      <p className="text-lg md:text-xl font-devanagari text-gray-800 leading-relaxed">
                        {verse.sanskrit}
                      </p>
                    </div>
                  </div>

                  {/* Translation */}
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-700 flex items-center">
                      <svg className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      Translation
                    </h3>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 md:p-6 border border-green-200 shadow-sm hover:shadow-md transition-all duration-300">
                      <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                        {verse.translation}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 md:p-6 border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
                      <h4 className="font-semibold text-gray-700 mb-2 text-base md:text-lg">Core Meaning:</h4>
                      <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        {verse.meaning}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center mt-8 space-x-4">
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          aria-label="Previous verse"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots - Always show 5 dots */}
        <div className="flex space-x-2">
          {visibleDots.map((dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => goToSlide(dotIndex)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                dotIndex === currentIndex 
                  ? 'bg-orange-500 scale-125 shadow-md' 
                  : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
              }`}
              aria-label={`Go to verse ${dotIndex + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          aria-label="Next verse"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Auto-play Toggle */}
        <button
          onClick={toggleAutoPlay}
          className={`p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
            isAutoPlaying 
              ? 'bg-orange-500 text-white border-orange-500' 
              : 'bg-white text-gray-600 border-gray-200'
          }`}
          aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isAutoPlaying ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
          <div 
            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500 ease-in-out shadow-sm"
            style={{ width: `${((currentIndex + 1) / verses.length) * 100}%` }}
          />
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          {currentIndex + 1} of {verses.length} verses
        </div>
      </div>
    </div>
  );
} 